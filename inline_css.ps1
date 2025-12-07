$indexFile = "c:\Users\Lionking\Documents\antigravity\altair\index.html"
$cssFile1 = "c:\Users\Lionking\Documents\antigravity\altair\css\styles.min.css"
$cssFile2 = "c:\Users\Lionking\Documents\antigravity\altair\css\additional-styles.min.css"

$html = Get-Content $indexFile -Raw -Encoding UTF8
$css1 = Get-Content $cssFile1 -Raw -Encoding UTF8
$css2 = Get-Content $cssFile2 -Raw -Encoding UTF8

$styleBlock = "<style>" + [System.Environment]::NewLine + $css1 + [System.Environment]::NewLine + $css2 + [System.Environment]::NewLine + "</style>"

# Replace styles.min.css link with the inline style block
$html = $html -replace '<link rel="stylesheet" href="css/styles.min.css">', $styleBlock

# Remove the additional-styles link (since we included it in the block)
$html = $html -replace '<link rel="stylesheet" href="css/additional-styles.min.css">', ''

Set-Content -Path $indexFile -Value $html -Encoding UTF8
Write-Host "CSS Inlined Successfully"
