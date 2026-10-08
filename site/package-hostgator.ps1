$ErrorActionPreference = 'Stop'

$project = Split-Path -Parent $MyInvocation.MyCommand.Path
$workspace = Split-Path -Parent $project
$dist = Join-Path $project 'dist'
$package = Join-Path $workspace 'moratech-hostgator.zip'

Push-Location $project
try {
    node build.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao gerar o site.' }
    node check.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Falha na verificação do site.' }
}
finally {
    Pop-Location
}

if (Test-Path -LiteralPath $package) {
    Remove-Item -LiteralPath $package -Force
}

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::Open(
    $package,
    [System.IO.Compression.ZipArchiveMode]::Create
)
try {
    foreach ($file in Get-ChildItem -LiteralPath $dist -Recurse -File) {
        $entryName = $file.FullName.Substring($dist.Length + 1).Replace('\', '/')
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
            $archive,
            $file.FullName,
            $entryName,
            [System.IO.Compression.CompressionLevel]::Optimal
        ) | Out-Null
    }
}
finally {
    $archive.Dispose()
}

Write-Output "Pacote pronto: $package"
