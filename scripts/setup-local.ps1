param(
  [switch]$Defaults,
  [switch]$Help
)

$ErrorActionPreference = "Stop"

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptRoot
$envExamplePath = Join-Path $repoRoot ".env.example"
$envPath = Join-Path $repoRoot ".env"
$managedComment = "# Local development settings. Rerun the setup script to change these values."
$authComment = "# Optional OAuth provider settings. Leave blank until you have credentials."
$localSettingKeys = @(
  "APP_PORT",
  "POSTGRES_PORT",
  "POSTGRES_DB",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "DATABASE_URL",
  "DOCKER_DATABASE_URL",
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET"
)
$authKeys = @(
  "MICROSOFT_ENTRA_CLIENT_ID",
  "MICROSOFT_ENTRA_CLIENT_SECRET",
  "MICROSOFT_ENTRA_TENANT_ID",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "APPLE_CLIENT_ID",
  "APPLE_CLIENT_SECRET"
)
$managedKeys = $localSettingKeys + $authKeys

function Show-Usage {
  @"
Usage:
  pwsh -File ./scripts/setup-local.ps1
  pwsh -File ./scripts/setup-local.ps1 -Defaults

Options:
  -Defaults  Write .env using current values or repo defaults without prompts.
  -Help      Show this help text.
"@ | Write-Host
}

function Get-EnvMap {
  param([string]$Content)

  $values = @{}

  foreach ($line in ($Content -split "`r?`n")) {
    $trimmed = $line.Trim()

    if (-not $trimmed -or $trimmed.StartsWith("#")) {
      continue
    }

    $separatorIndex = $line.IndexOf("=")

    if ($separatorIndex -le 0) {
      continue
    }

    $key = $line.Substring(0, $separatorIndex).Trim()
    $value = $line.Substring($separatorIndex + 1)

    $values[$key] = $value
  }

  return $values
}

function Get-UnmanagedLines {
  param([string]$Content)

  $lines = [System.Collections.Generic.List[string]]::new()

  foreach ($line in ($Content -split "`r?`n")) {
    $trimmed = $line.Trim()

    if ($trimmed -eq $managedComment -or $trimmed -eq $authComment) {
      continue
    }

    if (-not $trimmed -or $trimmed.StartsWith("#")) {
      $lines.Add($line)
      continue
    }

    $separatorIndex = $line.IndexOf("=")

    if ($separatorIndex -le 0) {
      $lines.Add($line)
      continue
    }

    $key = $line.Substring(0, $separatorIndex).Trim()

    if ($managedKeys -notcontains $key) {
      $lines.Add($line)
    }
  }

  return $lines
}

function Trim-BlankLines {
  param([System.Collections.Generic.List[string]]$Lines)

  $start = 0
  $end = $Lines.Count - 1

  while ($start -le $end -and $Lines[$start].Trim() -eq "") {
    $start++
  }

  while ($end -ge $start -and $Lines[$end].Trim() -eq "") {
    $end--
  }

  $trimmed = [System.Collections.Generic.List[string]]::new()

  for ($index = $start; $index -le $end; $index++) {
    $trimmed.Add($Lines[$index])
  }

  return $trimmed
}

function New-Secret {
  $bytes = New-Object byte[] 32
  [System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)

  return ([Convert]::ToBase64String($bytes).TrimEnd("=")).Replace("+", "-").Replace("/", "_")
}

function Build-DatabaseUrl {
  param(
    [string]$User,
    [string]$Password,
    [string]$HostName,
    [string]$Port,
    [string]$Database
  )

  $encodedUser = [System.Uri]::EscapeDataString($User)
  $encodedPassword = [System.Uri]::EscapeDataString($Password)

  return "postgresql://${encodedUser}:${encodedPassword}@${HostName}:${Port}/${Database}?schema=public"
}

function Test-PortValue {
  param(
    [string]$Value,
    [string]$Label
  )

  if ($Value -notmatch '^\d+$') {
    return "$Label must be a whole number between 1 and 65535."
  }

  $port = [int]$Value

  if ($port -lt 1 -or $port -gt 65535) {
    return "$Label must be between 1 and 65535."
  }

  return $null
}

function Test-SimpleValue {
  param(
    [string]$Value,
    [string]$Label
  )

  if ([string]::IsNullOrWhiteSpace($Value)) {
    return "$Label cannot be empty."
  }

  if ($Value -match '\s') {
    return "$Label cannot contain spaces."
  }

  return $null
}

function Test-OptionalValue {
  param(
    [string]$Value,
    [string]$Label
  )

  return $null
}

function Read-Setting {
  param(
    [string]$Label,
    [string]$Default,
    [scriptblock]$Validator
  )

  while ($true) {
    $answer = Read-Host "$Label [$Default]"
    $value = if ([string]::IsNullOrWhiteSpace($answer)) { $Default } else { $answer.Trim() }
    $validationError = & $Validator $value $Label

    if (-not $validationError) {
      return $value
    }

    Write-Host $validationError
  }
}

function Format-EnvFile {
  param(
    [hashtable]$ManagedValues,
    [System.Collections.Generic.List[string]]$UnmanagedLines
  )

  $managedSection = [System.Collections.Generic.List[string]]::new()
  $managedSection.Add($managedComment)

  foreach ($key in $localSettingKeys) {
    $managedSection.Add("${key}=$($ManagedValues[$key])")
  }

  $managedSection.Add("")
  $managedSection.Add($authComment)

  foreach ($key in $authKeys) {
    $managedSection.Add("${key}=$($ManagedValues[$key])")
  }

  $trimmedUnmanagedLines = Trim-BlankLines $UnmanagedLines

  if ($trimmedUnmanagedLines.Count -eq 0) {
    return ($managedSection -join "`r`n") + "`r`n"
  }

  return ($managedSection -join "`r`n") + "`r`n`r`n" + ($trimmedUnmanagedLines -join "`r`n") + "`r`n"
}

if ($Help) {
  Show-Usage
  exit 0
}

if (-not (Test-Path $envExamplePath)) {
  throw "Missing $envExamplePath"
}

$baseContent = if (Test-Path $envPath) {
  Get-Content -Raw $envPath
} else {
  Get-Content -Raw $envExamplePath
}

$parsedValues = Get-EnvMap $baseContent
$defaultsMap = @{
  APP_PORT = if ($parsedValues.ContainsKey("APP_PORT")) { $parsedValues["APP_PORT"] } else { "3000" }
  POSTGRES_PORT = if ($parsedValues.ContainsKey("POSTGRES_PORT")) { $parsedValues["POSTGRES_PORT"] } else { "5432" }
  POSTGRES_DB = if ($parsedValues.ContainsKey("POSTGRES_DB")) { $parsedValues["POSTGRES_DB"] } else { "mvp_template" }
  POSTGRES_USER = if ($parsedValues.ContainsKey("POSTGRES_USER")) { $parsedValues["POSTGRES_USER"] } else { "postgres" }
  POSTGRES_PASSWORD = if ($parsedValues.ContainsKey("POSTGRES_PASSWORD")) { $parsedValues["POSTGRES_PASSWORD"] } else { "postgres" }
  NEXTAUTH_SECRET = if ($parsedValues.ContainsKey("NEXTAUTH_SECRET") -and $parsedValues["NEXTAUTH_SECRET"] -ne "replace-with-a-long-random-secret") {
    $parsedValues["NEXTAUTH_SECRET"]
  } else {
    New-Secret
  }
  MICROSOFT_ENTRA_CLIENT_ID = if ($parsedValues.ContainsKey("MICROSOFT_ENTRA_CLIENT_ID")) { $parsedValues["MICROSOFT_ENTRA_CLIENT_ID"] } else { "" }
  MICROSOFT_ENTRA_CLIENT_SECRET = if ($parsedValues.ContainsKey("MICROSOFT_ENTRA_CLIENT_SECRET")) { $parsedValues["MICROSOFT_ENTRA_CLIENT_SECRET"] } else { "" }
  MICROSOFT_ENTRA_TENANT_ID = if ($parsedValues.ContainsKey("MICROSOFT_ENTRA_TENANT_ID")) { $parsedValues["MICROSOFT_ENTRA_TENANT_ID"] } else { "" }
  GOOGLE_CLIENT_ID = if ($parsedValues.ContainsKey("GOOGLE_CLIENT_ID")) { $parsedValues["GOOGLE_CLIENT_ID"] } else { "" }
  GOOGLE_CLIENT_SECRET = if ($parsedValues.ContainsKey("GOOGLE_CLIENT_SECRET")) { $parsedValues["GOOGLE_CLIENT_SECRET"] } else { "" }
  APPLE_CLIENT_ID = if ($parsedValues.ContainsKey("APPLE_CLIENT_ID")) { $parsedValues["APPLE_CLIENT_ID"] } else { "" }
  APPLE_CLIENT_SECRET = if ($parsedValues.ContainsKey("APPLE_CLIENT_SECRET")) { $parsedValues["APPLE_CLIENT_SECRET"] } else { "" }
}

$selectedValues = $defaultsMap.Clone()

if (-not $Defaults) {
  Write-Host ""
  Write-Host "Local setup for this fork"
  Write-Host "Press Enter to keep the current value shown in brackets."
  Write-Host ""

  $selectedValues["APP_PORT"] = Read-Setting "App port" $defaultsMap["APP_PORT"] ${function:Test-PortValue}
  $selectedValues["POSTGRES_PORT"] = Read-Setting "Postgres port" $defaultsMap["POSTGRES_PORT"] ${function:Test-PortValue}
  $selectedValues["POSTGRES_DB"] = Read-Setting "Postgres database" $defaultsMap["POSTGRES_DB"] ${function:Test-SimpleValue}
  $selectedValues["POSTGRES_USER"] = Read-Setting "Postgres username" $defaultsMap["POSTGRES_USER"] ${function:Test-SimpleValue}
  $selectedValues["POSTGRES_PASSWORD"] = Read-Setting "Postgres password" $defaultsMap["POSTGRES_PASSWORD"] ${function:Test-SimpleValue}
  $selectedValues["NEXTAUTH_SECRET"] = Read-Setting "NextAuth secret" $defaultsMap["NEXTAUTH_SECRET"] ${function:Test-SimpleValue}
  $selectedValues["MICROSOFT_ENTRA_CLIENT_ID"] = Read-Setting "Microsoft Entra client ID" $defaultsMap["MICROSOFT_ENTRA_CLIENT_ID"] ${function:Test-OptionalValue}
  $selectedValues["MICROSOFT_ENTRA_CLIENT_SECRET"] = Read-Setting "Microsoft Entra client secret" $defaultsMap["MICROSOFT_ENTRA_CLIENT_SECRET"] ${function:Test-OptionalValue}
  $selectedValues["MICROSOFT_ENTRA_TENANT_ID"] = Read-Setting "Microsoft Entra tenant ID" $defaultsMap["MICROSOFT_ENTRA_TENANT_ID"] ${function:Test-OptionalValue}
  $selectedValues["GOOGLE_CLIENT_ID"] = Read-Setting "Google client ID" $defaultsMap["GOOGLE_CLIENT_ID"] ${function:Test-OptionalValue}
  $selectedValues["GOOGLE_CLIENT_SECRET"] = Read-Setting "Google client secret" $defaultsMap["GOOGLE_CLIENT_SECRET"] ${function:Test-OptionalValue}
  $selectedValues["APPLE_CLIENT_ID"] = Read-Setting "Apple client ID" $defaultsMap["APPLE_CLIENT_ID"] ${function:Test-OptionalValue}
  $selectedValues["APPLE_CLIENT_SECRET"] = Read-Setting "Apple client secret" $defaultsMap["APPLE_CLIENT_SECRET"] ${function:Test-OptionalValue}
}

$managedValues = [ordered]@{
  APP_PORT = $selectedValues["APP_PORT"]
  POSTGRES_PORT = $selectedValues["POSTGRES_PORT"]
  POSTGRES_DB = $selectedValues["POSTGRES_DB"]
  POSTGRES_USER = $selectedValues["POSTGRES_USER"]
  POSTGRES_PASSWORD = $selectedValues["POSTGRES_PASSWORD"]
  DATABASE_URL = Build-DatabaseUrl -User $selectedValues["POSTGRES_USER"] -Password $selectedValues["POSTGRES_PASSWORD"] -HostName "localhost" -Port $selectedValues["POSTGRES_PORT"] -Database $selectedValues["POSTGRES_DB"]
  DOCKER_DATABASE_URL = Build-DatabaseUrl -User $selectedValues["POSTGRES_USER"] -Password $selectedValues["POSTGRES_PASSWORD"] -HostName "db" -Port "5432" -Database $selectedValues["POSTGRES_DB"]
  NEXTAUTH_URL = "http://localhost:$($selectedValues["APP_PORT"])"
  NEXTAUTH_SECRET = $selectedValues["NEXTAUTH_SECRET"]
  MICROSOFT_ENTRA_CLIENT_ID = $selectedValues["MICROSOFT_ENTRA_CLIENT_ID"]
  MICROSOFT_ENTRA_CLIENT_SECRET = $selectedValues["MICROSOFT_ENTRA_CLIENT_SECRET"]
  MICROSOFT_ENTRA_TENANT_ID = $selectedValues["MICROSOFT_ENTRA_TENANT_ID"]
  GOOGLE_CLIENT_ID = $selectedValues["GOOGLE_CLIENT_ID"]
  GOOGLE_CLIENT_SECRET = $selectedValues["GOOGLE_CLIENT_SECRET"]
  APPLE_CLIENT_ID = $selectedValues["APPLE_CLIENT_ID"]
  APPLE_CLIENT_SECRET = $selectedValues["APPLE_CLIENT_SECRET"]
}

$envContents = Format-EnvFile -ManagedValues $managedValues -UnmanagedLines (Get-UnmanagedLines $baseContent)

Set-Content -Path $envPath -Value $envContents

Write-Host ""
Write-Host "Updated $envPath"
Write-Host "App URL: http://localhost:$($selectedValues["APP_PORT"])"
Write-Host "PostgreSQL host port: localhost:$($selectedValues["POSTGRES_PORT"])"
Write-Host "Next step: docker compose up --build"
