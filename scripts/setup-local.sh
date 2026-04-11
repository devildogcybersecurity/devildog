#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
env_example_path="$repo_root/.env.example"
env_path="$repo_root/.env"
managed_comment="# Local development settings. Rerun the setup script to change these values."
managed_keys=("APP_PORT")

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

    if [[ "$trimmed" == "$managed_comment" ]]; then
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
    printf 'APP_PORT=%s\n' "$APP_PORT"

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

if [[ "$use_defaults" -eq 0 ]]; then
  printf '\nLocal setup for this static site\n'
  printf 'Press Enter to keep the current value shown in brackets.\n\n'

  APP_PORT="$(prompt_for_value 'App port' "$APP_PORT" validate_port)"
fi

temp_env_file="$(mktemp)"
write_env_file "$base_file" "$temp_env_file"
mv "$temp_env_file" "$env_path"

printf '\nUpdated %s\n' "$env_path"
printf 'App URL: http://localhost:%s\n' "$APP_PORT"
printf 'Next step: docker compose up --build\n'
