$replacements = @{
    "'USUARIO'" = "'usuario'"
    "'EVENTO_AGENDA'" = "'evento_agenda'"
    "'OCORRENCIA_AGENDA'" = "'ocorrencia_agenda'"
    "'NOTA_MENSAL'" = "'nota_mensal'"
    "'DISPOSITIVO_IOT'" = "'dispositivo_iot'"
    "'TELEMETRIA_SAUDE'" = "'telemetria_saude'"
    "'TELEMETRIA_IOT'" = "'telemetria_iot'"
    "'EVENTO_PANICO'" = "'evento_panico'"
    "'CONTATO_EMERGENCIA'" = "'contato_emergencia'"
}

Get-ChildItem -Path "src" -Filter "*.ts" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $original = $content
    foreach ($key in $replacements.Keys) {
        $content = $content -replace [regex]::Escape($key), $replacements[$key]
    }
    if ($content -ne $original) {
        Set-Content -Path $_.FullName -Value $content -NoNewline
        Write-Host "Atualizado: $($_.FullName)"
    }
}