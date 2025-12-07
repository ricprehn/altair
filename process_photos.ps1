
$files = @(
    "8ZPgYBrAe9184gb4JvDNKsVE3yOtJPdWkyRa3uS0.jpg",
    "E9QyWVKEBxq7kIRJUnEKuSmTSdRBEhpkt4FMarX1.jpg",
    "KOB4jHZh9OlnowHQ0BwxLytQlYTxug7kUfbmtMzp.jpg",
    "KhoOEHtdP6FUi7mTLfk4iwThstZBqLJm1L7QzVSC.jpg",
    "MecXhnDmgtCIdHZPxKbqPfp4Y3t1y7sSyrIdrwOj.jpg",
    "O2m8kKIf513RGjfjYoPvcqElkUMBXnOrTvCukIP4.jpg",
    "QmTr3MtLQ4ocKMt8YjR82EkPNZHq9C5Ja1hl2tTE.jpg",
    "auI9cL4nZ7zaD7SGYO09yAc5cn2wpSOF1e8ked1x.jpg",
    "oMQaqCRED1HEmbNDky702Zw4Sx6J0SOBM1IdZUw5.jpg",
    "sWnY51VuiE0WtlqPSD5HuDP9IFre7Vq4IdyQrBu4.jpg"
)

$names = @(
    "finnsailer-34-navegando.webp",
    "finnsailer-34-cubierta-teca.webp",
    "finnsailer-34-interior-salon.webp",
    "finnsailer-34-cocina-equipada.webp",
    "finnsailer-34-camarote-proa.webp",
    "finnsailer-34-banera-cockpit.webp",
    "finnsailer-34-motor-volvo-penta.webp",
    "finnsailer-34-detalle-jarcia.webp",
    "finnsailer-34-electronica-raymarine.webp",
    "finnsailer-34-popa-plataforma.webp"
)

$baseDir = "images/finnsailer34"
$backupDir = "$baseDir/original_backup"

if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Force -Path $backupDir
}

for ($i = 0; $i -lt $files.Count; $i++) {
    $inputFile = "$baseDir/" + $files[$i]
    $outputFile = "$baseDir/" + $names[$i]
    
    if (Test-Path $inputFile) {
        Write-Host "Processing $($files[$i]) -> $($names[$i])..."
        # Run sharp-cli
        # Note: --quality 80 is sometimes -q 80 or similar. sharp-cli uses standard options if possible.
        # sharp-cli structure: sharp -i input -o output [operations]
        # operation: resize 1000
        # operation: toFormat webp --quality 80
        
        cmd /c "npx -y sharp-cli -i `"$inputFile`" -o `"$outputFile`" resize 1000 --withoutEnlargement true toFormat webp --quality 80"
        
        # Move original
        Move-Item -Path $inputFile -Destination $backupDir -Force
    }
    else {
        Write-Host "File $($files[$i]) not found."
    }
}
