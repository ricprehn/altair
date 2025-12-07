
$files = Get-ChildItem -Path "c:\Users\Lionking\Documents\antigravity\altair\pages" -Filter *.html

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content

    # 1. Defer Font Awesome
    if ($content -match '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">') {
        $content = $content -replace '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">', 
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" media="print" onload="this.media=''all''"><noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></noscript>'
    }

    # 2. Find Background Image
    $bgImage = $null
    if ($content -match "background:.*url\('(.+?)'\)") {
        $bgImage = $matches[1]
    }

    # 3. Handle Special Unsplash Image (Clases Particulares)
    if ($bgImage -like "*unsplash.com*") {
        $content = $content -replace [Regex]::Escape($bgImage), "../images/hero-bg.webp"
        $bgImage = "../images/hero-bg.webp"
    }
    # 4. Handle JPG to WebP replacement
    elseif ($bgImage -like "*.jpg") {
        $newImage = $bgImage -replace "\.jpg$", ".webp"
        $content = $content -replace [Regex]::Escape($bgImage), $newImage
        $bgImage = $newImage
    }

    # 5. Inject Preload Link
    if ($bgImage) {
        # Check if preload already exists
        if (-not ($content -match "link rel=""preload"" as=""image""")) {
            $preloadTag = "`n    <link rel=""preload"" as=""image"" href=""$bgImage"">"
            # Insert after CSS links
            $content = $content -replace '(<link rel="stylesheet" href="../css/additional-styles.css">)', "`$1$preloadTag"
        }
    }

    # 6. Accessibility Fixes
    # Add aria-label to hamburger if easier regex matches
    $content = $content -replace '<div class="hamburger">', '<div class="hamburger" aria-label="Abrir menú de navegación">'
    
    # Save if changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
    else {
        Write-Host "No changes for $($file.Name)"
    }
}
