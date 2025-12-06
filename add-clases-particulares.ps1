# Script para añadir Clases Particulares a la página de servicios

$serviciosFile = ".\pages\servicios.html"
$content = Get-Content -Path $serviciosFile -Raw -Encoding UTF8

# Buscar el punto de inserción (después de Cursos Especializados)
$insertPoint = '</div>

            <div class="service-detail">
                <i class="fas fa-yacht service-icon"></i>'

$newSection = '</div>

            <div class="service-detail">
                <i class="fas fa-user-graduate service-icon"></i>
                <h2>Clases Particulares</h2>
                <p>Formación personalizada 100% adaptada a ti. Aprueba tu examen con atención individualizada.</p>

                <h3>Modalidades</h3>
                <ul>
                    <li><strong>Online:</strong> Desde cualquier lugar - 30€/hora</li>
                    <li><strong>Presencial:</strong> En Barcelona - 35€/hora</li>
                    <li><strong>Pack 5 clases:</strong> Por 140€ (ahorra 10€)</li>
                </ul>

                <h3>Beneficios</h3>
                <ul>
                    <li>Atención 100% personalizada</li>
                    <li>Horarios flexibles</li>
                    <li>Metodología clara y sencilla</li>
                    <li>A tu ritmo de aprendizaje</li>
                </ul>
                <a href="clases-particulares.html" class="cta-button">Más Información</a>
            </div>

            <div class="service-detail">
                <i class="fas fa-yacht service-icon"></i>'

if ($content -match [regex]::Escape($insertPoint)) {
    $content = $content -replace [regex]::Escape($insertPoint), $newSection
    Set-Content -Path $serviciosFile -Value $content -Encoding UTF8 -NoNewline
    Write-Host "✓ Sección de Clases Particulares añadida correctamente" -ForegroundColor Green
} else {
    Write-Host "✗ No se encontró el punto de inserción" -ForegroundColor Red
}
