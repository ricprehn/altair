# Script para actualizar el menú de navegación en todas las páginas
# Añade el enlace de Calendario

$pagesPath = ".\pages"
$files = Get-ChildItem -Path $pagesPath -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Verificar si ya tiene el enlace de Calendario
    if ($content -notmatch 'calendario\.html') {
        Write-Host "Actualizando: $($file.Name)"
        
        # Buscar y reemplazar el nav-links
        $oldPattern = '<a href="servicios\.html">Servicios</a>\s*<a href="blog\.html">Blog</a>'
        $newContent = '<a href="servicios.html">Servicios</a>
                <a href="calendario.html">Calendario</a>
                <a href="blog.html">Blog</a>'
        
        $content = $content -replace $oldPattern, $newContent
        
        # Guardar el archivo
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Actualizado: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "Ya actualizado: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`nProceso completado" -ForegroundColor Green
