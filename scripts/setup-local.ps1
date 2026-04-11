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
$managedKeys = @("APP_PORT")

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

    if ($trimmed -eq $managedComment) {
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
    [string]$AppPort,
    [System.Collections.Generic.List[string]]$UnmanagedLines
  )

  $managedSection = [System.Collections.Generic.List[string]]::new()
  $managedSection.Add($managedComment)
  $managedSection.Add("APP_PORT=$AppPort")

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
$appPort = if ($parsedValues.ContainsKey("APP_PORT")) { $parsedValues["APP_PORT"] } else { "3000" }

if (-not $Defaults) {
  Write-Host ""
  Write-Host "Local setup for this static site"
  Write-Host "Press Enter to keep the current value shown in brackets."
  Write-Host ""

  $appPort = Read-Setting "App port" $appPort ${function:Test-PortValue}
}

$envContents = Format-EnvFile -AppPort $appPort -UnmanagedLines (Get-UnmanagedLines $baseContent)

Set-Content -Path $envPath -Value $envContents

Write-Host ""
Write-Host "Updated $envPath"
Write-Host "App URL: http://localhost:$appPort"
Write-Host "Next step: docker compose up --build"
