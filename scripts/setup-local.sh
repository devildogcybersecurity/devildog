#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
env_example_path="$repo_root/.env.example"
env_path="$repo_root/.env"
managed_comment="# Local development settings. Rerun the setup script to change these values."
auth_comment="# Optional OAuth provider settings. Leave blank until you have credentials."
local_setting_keys=(
  "APP_PORT"
  "POSTGRES_PORT"
  "POSTGRES_DB"
  "POSTGRES_USER"
  "POSTGRES_PASSWORD"
  "DATABASE_URL"
  "DOCKER_DATABASE_URL"
  "NEXTAUTH_URL"
  "NEXTAUTH_SECRET"
)
auth_keys=(
  "MICROSOFT_ENTRA_CLIENT_ID"
  "MICROSOFT_ENTRA_CLIENT_SECRET"
  "MICROSOFT_ENTRA_TENANT_ID"
  "GOOGLE_CLIENT_ID"
  "GOOGLE_CLIENT_SECRET"
  "APPLE_CLIENT_ID"
  "APPLE_CLIENT_SECRET"
)
managed_keys=("${local_setting_keys[@]}" "${auth_keys[@]}")

show_usage() {
  cat <<'EOF'
Usage:
  bash ./scripts/setup-local.sh
  bash ./scripts/setup-local.sh --defaults

Options:
  --defaults  Write .env using current values or repo defaults without prompts.
  --help      Show this help text.
EOF
}

trimmed_is_empty() {
  local value="${1:-}"
  [[ -z "${value//[[:space:]]/}" ]]
}

get_env_value() {
  local key="$1"
  local file="$2"

  while IFS= read -r line || [[ -n "$line" ]]; do
    case "$line" in
      "$key="*)
        printf '%s' "${line#*=}"
        return 0
        ;;
    esac
  done < "$file"

  return 1
}

trim_blank_lines() {
  local file="$1"
  awk '
    {
      lines[count++] = $0
    }
    END {
      start = 0
      while (start < count && lines[start] ~ /^[[:space:]]*$/) {
        start++
      }

      end = count - 1
      while (end >= start && lines[end] ~ /^[[:space:]]*$/) {
        end--
      }

      for (i = start; i <= end; i++) {
        print lines[i]
      }
    }
  ' "$file"
}

urlencode() {
  local value="$1"
  local encoded=""
  local index char hex

  for ((index = 0; index < ${#value}; index++)); do
    char="${value:index:1}"

    case "$char" in
      [a-zA-Z0-9.~_-])
        encoded+="$char"
        ;;
      *)
        printf -v hex '%%%02X' "'$char"
        encoded+="$hex"
        ;;
    esac
  done

  printf '%s' "$encoded"
}

build_database_url() {
  local user="$1"
  local password="$2"
  local host="$3"
  local port="$4"
  local database="$5"

  printf 'postgresql://%s:%s@%s:%s/%s?schema=public' \
    "$(urlencode "$user")" \
    "$(urlencode "$password")" \
    "$host" \
    "$port" \
    "$database"
}

generate_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -base64 32 | tr '+/' '-_' | tr -d '=\n'
    return 0
  fi

  printf 'local-dev-secret-%s' "$(date +%s)"
}

validate_port() {
  local value="$1"
  local label="$2"

  case "$value" in
    ''|*[!0-9]*)
      printf '%s must be a whole number between 1 and 65535.' "$label" >&2
      return 1
      ;;
  esac

  if (( value < 1 || value > 65535 )); then
    printf '%s must be between 1 and 65535.' "$label" >&2
    return 1
  fi

  return 0
}

validate_simple_value() {
  local value="$1"
  local label="$2"

  if trimmed_is_empty "$value"; then
    printf '%s cannot be empty.' "$label" >&2
    return 1
  fi

  case "$value" in
    *[[:space:]]*)
      printf '%s cannot contain spaces.' "$label" >&2
      return 1
      ;;
  esac

  return 0
}

validate_optional_value() {
  return 0
}

prompt_for_value() {
  local label="$1"
  local default_value="$2"
  local validator="$3"
  local value=""

  while true; do
    read -r -p "$label [$default_value]: " value || true

    if trimmed_is_empty "$value"; then
      value="$default_value"
    fi

    if "$validator" "$value" "$label"; then
      printf '%s' "$value"
      return 0
    fi

    printf '\n' >&2
  done
}

write_env_file() {
  local base_file="$1"
  local temp_file="$2"
  local remainder_file
  local line trimmed key skip_key

  remainder_file="$(mktemp)"

  while IFS= read -r line || [[ -n "$line" ]]; do
    trimmed="$line"
    trimmed="${trimmed#"${trimmed%%[![:space:]]*}"}"
    trimmed="${trimmed%"${trimmed##*[![:space:]]}"}"

    if [[ "$trimmed" == "$managed_comment" || "$trimmed" == "$auth_comment" ]]; then
      continue
    fi

    skip_key=0

    for key in "${managed_keys[@]}"; do
      case "$line" in
        "$key="*)
          skip_key=1
          break
          ;;
      esac
    done

    if [[ "$skip_key" -eq 0 ]]; then
      printf '%s\n' "$line" >> "$remainder_file"
    fi
  done < "$base_file"

  {
    printf '%s\n' "$managed_comment"
    for key in "${local_setting_keys[@]}"; do
      printf '%s=%s\n' "$key" "${!key}"
    done

    printf '\n'
    printf '%s\n' "$auth_comment"

    for key in "${auth_keys[@]}"; do
      printf '%s=%s\n' "$key" "${!key}"
    done

    if [[ -s "$remainder_file" ]]; then
      printf '\n'
      trim_blank_lines "$remainder_file"
      printf '\n'
    fi
  } > "$temp_file"

  rm -f "$remainder_file"
}

use_defaults=0

case "${1:-}" in
  --help)
    show_usage
    exit 0
    ;;
  --defaults)
    use_defaults=1
    ;;
  "")
    ;;
  *)
    printf 'Unknown option: %s\n\n' "${1:-}" >&2
    show_usage
    exit 1
    ;;
esac

if [[ ! -f "$env_example_path" ]]; then
  printf 'Missing %s\n' "$env_example_path" >&2
  exit 1
fi

base_file="$env_example_path"

if [[ -f "$env_path" ]]; then
  base_file="$env_path"
fi

APP_PORT="$(get_env_value "APP_PORT" "$base_file" || printf '3000')"
POSTGRES_PORT="$(get_env_value "POSTGRES_PORT" "$base_file" || printf '5432')"
POSTGRES_DB="$(get_env_value "POSTGRES_DB" "$base_file" || printf 'mvp_template')"
POSTGRES_USER="$(get_env_value "POSTGRES_USER" "$base_file" || printf 'postgres')"
POSTGRES_PASSWORD="$(get_env_value "POSTGRES_PASSWORD" "$base_file" || printf 'postgres')"
NEXTAUTH_SECRET="$(get_env_value "NEXTAUTH_SECRET" "$base_file" || true)"
MICROSOFT_ENTRA_CLIENT_ID="$(get_env_value "MICROSOFT_ENTRA_CLIENT_ID" "$base_file" || true)"
MICROSOFT_ENTRA_CLIENT_SECRET="$(get_env_value "MICROSOFT_ENTRA_CLIENT_SECRET" "$base_file" || true)"
MICROSOFT_ENTRA_TENANT_ID="$(get_env_value "MICROSOFT_ENTRA_TENANT_ID" "$base_file" || true)"
GOOGLE_CLIENT_ID="$(get_env_value "GOOGLE_CLIENT_ID" "$base_file" || true)"
GOOGLE_CLIENT_SECRET="$(get_env_value "GOOGLE_CLIENT_SECRET" "$base_file" || true)"
APPLE_CLIENT_ID="$(get_env_value "APPLE_CLIENT_ID" "$base_file" || true)"
APPLE_CLIENT_SECRET="$(get_env_value "APPLE_CLIENT_SECRET" "$base_file" || true)"

if [[ -z "$NEXTAUTH_SECRET" || "$NEXTAUTH_SECRET" == "replace-with-a-long-random-secret" ]]; then
  NEXTAUTH_SECRET="$(generate_secret)"
fi

if [[ "$use_defaults" -eq 0 ]]; then
  printf '\nLocal setup for this fork\n'
  printf 'Press Enter to keep the current value shown in brackets.\n\n'

  APP_PORT="$(prompt_for_value 'App port' "$APP_PORT" validate_port)"
  POSTGRES_PORT="$(prompt_for_value 'Postgres port' "$POSTGRES_PORT" validate_port)"
  POSTGRES_DB="$(prompt_for_value 'Postgres database' "$POSTGRES_DB" validate_simple_value)"
  POSTGRES_USER="$(prompt_for_value 'Postgres username' "$POSTGRES_USER" validate_simple_value)"
  POSTGRES_PASSWORD="$(prompt_for_value 'Postgres password' "$POSTGRES_PASSWORD" validate_simple_value)"
  NEXTAUTH_SECRET="$(prompt_for_value 'NextAuth secret' "$NEXTAUTH_SECRET" validate_simple_value)"
  MICROSOFT_ENTRA_CLIENT_ID="$(prompt_for_value 'Microsoft Entra client ID' "$MICROSOFT_ENTRA_CLIENT_ID" validate_optional_value)"
  MICROSOFT_ENTRA_CLIENT_SECRET="$(prompt_for_value 'Microsoft Entra client secret' "$MICROSOFT_ENTRA_CLIENT_SECRET" validate_optional_value)"
  MICROSOFT_ENTRA_TENANT_ID="$(prompt_for_value 'Microsoft Entra tenant ID' "$MICROSOFT_ENTRA_TENANT_ID" validate_optional_value)"
  GOOGLE_CLIENT_ID="$(prompt_for_value 'Google client ID' "$GOOGLE_CLIENT_ID" validate_optional_value)"
  GOOGLE_CLIENT_SECRET="$(prompt_for_value 'Google client secret' "$GOOGLE_CLIENT_SECRET" validate_optional_value)"
  APPLE_CLIENT_ID="$(prompt_for_value 'Apple client ID' "$APPLE_CLIENT_ID" validate_optional_value)"
  APPLE_CLIENT_SECRET="$(prompt_for_value 'Apple client secret' "$APPLE_CLIENT_SECRET" validate_optional_value)"
fi

DATABASE_URL="$(build_database_url "$POSTGRES_USER" "$POSTGRES_PASSWORD" "localhost" "$POSTGRES_PORT" "$POSTGRES_DB")"
DOCKER_DATABASE_URL="$(build_database_url "$POSTGRES_USER" "$POSTGRES_PASSWORD" "db" "5432" "$POSTGRES_DB")"
NEXTAUTH_URL="http://localhost:$APP_PORT"

temp_env_file="$(mktemp)"
write_env_file "$base_file" "$temp_env_file"
mv "$temp_env_file" "$env_path"

printf '\nUpdated %s\n' "$env_path"
printf 'App URL: http://localhost:%s\n' "$APP_PORT"
printf 'PostgreSQL host port: localhost:%s\n' "$POSTGRES_PORT"
printf 'Next step: docker compose up --build\n'
