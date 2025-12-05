$pagesDir = "c:\Users\Lionking\Documents\antigravity\altair\pages"
$htmlFiles = Get-ChildItem -Path $pagesDir -Filter "*.html" -File

$newNavLinks = @"
            <div class="nav-links">
                <a href="../index.html">Inicio</a>
                <a href="nosotros.html">Nosotros</a>
                <a href="../index.html#courses">Cursos</a>
                <a href="servicios.html">Servicios</a>
                <a href="blog.html">Blog</a>
                <a href="preguntas.html">Preguntas</a>
                <a href="contacto.html" class="cta-button">Contacto</a>
            </div>
"@

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # 1. Actualizar Logo (hacerlo clicable)
    # Usamos regex para ser flexibles con espacios y saltos de línea
    $logoRegex = '<div class="logo">\s*<i class="fas fa-anchor"></i> Escuela Náutica Altair\s*</div>'
    $newLogo = '<div class="logo"><a href="../index.html" style="color: inherit; text-decoration: none;"><i class="fas fa-anchor"></i> Escuela Náutica Altair</a></div>'
    
    if ($content -match $logoRegex) {
        $content = $content -replace $logoRegex, $newLogo
        Write-Host "Logo actualizado en: $($file.Name)" -ForegroundColor Yellow
    }

    # 2. Actualizar Menú (Reemplazar todo el bloque nav-links)
    # Buscamos desde <div class="nav-links"> hasta el cierre </div>
    # Nota: Esto asume que no hay divs anidados dentro de nav-links, lo cual es correcto según la estructura vista.
    $navRegex = '(?s)<div class="nav-links">.*?</div>'
    
    if ($content -match $navRegex) {
        $content = $content -replace $navRegex, $newNavLinks
        Write-Host "Menú actualizado en: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "No se encontró el bloque nav-links en: $($file.Name)" -ForegroundColor Red
    }
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
}

# También actualizar index.html (tiene rutas diferentes)
$indexFile = "c:\Users\Lionking\Documents\antigravity\altair\index.html"
$indexContent = Get-Content $indexFile -Raw -Encoding UTF8

$indexNavLinks = @"
            <div class="nav-links">
                <a href="#home">Inicio</a>
                <a href="pages/nosotros.html">Nosotros</a>
                <a href="#courses">Cursos</a>
                <a href="pages/servicios.html">Servicios</a>
                <a href="pages/blog.html">Blog</a>
                <a href="pages/preguntas.html">Preguntas</a>
                <a href="pages/contacto.html" class="cta-button">Contacto</a>
            </div>
"@

# Logo en index ya fue actualizado manualmente, solo actualizamos menú
$navRegex = '(?s)<div class="nav-links">.*?</div>'
if ($indexContent -match $navRegex) {
    $indexContent = $indexContent -replace $navRegex, $indexNavLinks
    Set-Content -Path $indexFile -Value $indexContent -Encoding UTF8 -NoNewline
    Write-Host "Menú actualizado en: index.html" -ForegroundColor Cyan
}
