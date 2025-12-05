# Script para actualizar todas las páginas con mejoras de navegación
$pagesDir = "c:\Users\Lionking\Documents\antigravity\altair\pages"
$htmlFiles = Get-ChildItem -Path $pagesDir -Filter "*.html" -File

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # 1. Hacer el logo clicable (solo en páginas dentro de /pages)
    $content = $content -replace '<div class="logo">\s*<i class="fas fa-anchor"></i> Escuela Náutica Altair\s*</div>', 
        '<div class="logo"><a href="../index.html" style="color: inherit; text-decoration: none;"><i class="fas fa-anchor"></i> Escuela Náutica Altair</a></div>'
    
    # 2. Añadir enlace Blog en el menú (si no existe ya)
    if ($content -notmatch 'href="blog.html"') {
        $content = $content -replace '(<a href="servicios.html">Servicios</a>)\s*(<a href="contacto.html")', 
            '$1' + "`r`n                <a href=`"blog.html`">Blog</a>`r`n                " + '$2'
    }
    
    # Guardar cambios
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Actualizado: $($file.Name)" -ForegroundColor Green
}

Write-Host "`nTodas las páginas actualizadas!" -ForegroundColor Cyan
