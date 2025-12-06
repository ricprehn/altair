# Script para actualizar precios de clases particulares

$file = ".\pages\clases-particulares.html"
$content = Get-Content -Path $file -Raw -Encoding UTF8

# Reemplazar la sección de modalidades completa
$oldSection = @'
            <div class="modalidades-grid">
                <!-- Online -->
                <div class="modalidad-card">
                    <div class="modalidad-icon">
                        <i class="fas fa-laptop"></i>
                    </div>
                    <h3 class="modalidad-title">Clases Online</h3>
                    <p class="modalidad-desc">Desde cualquier lugar. Clases por videollamada con pizarra digital y
                        material interactivo.</p>
                    <div class="modalidad-price">30€</div>
                    <div class="modalidad-price-detail">por hora</div>
                    <a href="contacto.html" class="cta-button">Reservar Clase</a>
                </div>

                <!-- Presencial -->
                <div class="modalidad-card">
                    <div class="modalidad-icon">
                        <i class="fas fa-chalkboard-teacher"></i>
                    </div>
                    <h3 class="modalidad-title">Clases Presenciales</h3>
                    <p class="modalidad-desc">En Barcelona. Clases cara a cara con todo el material necesario incluido.
                    </p>
                    <div class="modalidad-price">35€</div>
                    <div class="modalidad-price-detail">por hora</div>
                    <a href="contacto.html" class="cta-button">Reservar Clase</a>
                </div>

                <!-- Pack -->
                <div class="modalidad-card" style="border-color: var(--accent-color);">
                    <div class="modalidad-icon"
                        style="background: linear-gradient(135deg, var(--accent-color), #e65100);">
                        <i class="fas fa-gift"></i>
                    </div>
                    <h3 class="modalidad-title">Pack 5 Clases</h3>
                    <p class="modalidad-desc">¡Ahorra! Pack de 5 clases con descuento especial. Online o presenciales.
                    </p>
                    <div class="modalidad-price">140€</div>
                    <div class="modalidad-price-detail">28€ por clase (ahorra 10€)</div>
                    <a href="contacto.html" class="cta-button" style="background: var(--accent-color);">¡Quiero el
                        Pack!</a>
                </div>
            </div>
'@

$newSection = @'
            <div class="modalidades-grid">
                <!-- 1 Hora -->
                <div class="modalidad-card">
                    <div class="modalidad-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3 class="modalidad-title">1 Hora</h3>
                    <p class="modalidad-desc">Prueba una clase particular. Ideal para resolver dudas puntuales.</p>
                    <div class="modalidad-price">60€</div>
                    <div class="modalidad-price-detail">por hora</div>
                    <a href="contacto.html" class="cta-button">Reservar Clase</a>
                </div>

                <!-- Pack 5 Horas -->
                <div class="modalidad-card" style="border-color: var(--accent-color);">
                    <div class="modalidad-icon"
                        style="background: linear-gradient(135deg, var(--accent-color), #e65100);">
                        <i class="fas fa-fire"></i>
                    </div>
                    <h3 class="modalidad-title">Pack 5 Horas</h3>
                    <p class="modalidad-desc">¡Más popular! Preparación completa con descuento.</p>
                    <div class="modalidad-price">275€</div>
                    <div class="modalidad-price-detail">55€/hora (ahorra 25€)</div>
                    <a href="contacto.html" class="cta-button" style="background: var(--accent-color);">¡Mejor Precio!</a>
                </div>

                <!-- Pack 10 Horas -->
                <div class="modalidad-card">
                    <div class="modalidad-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <h3 class="modalidad-title">Pack 10 Horas</h3>
                    <p class="modalidad-desc">Máximo ahorro. Preparación intensiva.</p>
                    <div class="modalidad-price">500€</div>
                    <div class="modalidad-price-detail">50€/hora (ahorra 100€)</div>
                    <a href="contacto.html" class="cta-button">Reservar Pack</a>
                </div>
            </div>

            <!-- Pricing Info -->
            <div style="background: #f0f8ff; padding: 2rem; border-radius: 12px; margin-top: 2rem; text-align: center;">
                <p style="margin: 0; color: #666; font-size: 1.1rem;">
                    <i class="fas fa-info-circle" style="color: var(--primary-color);"></i> 
                    <strong>Modalidades:</strong> Online o Presencial en Barcelona
                </p>
                <p style="margin: 0.5rem 0 0 0; color: #999;">
                    Horarios flexibles • Lunes a domingo • 10:00 - 20:00h
                </p>
            </div>
'@

$content = $content -replace [regex]::Escape($oldSection), $newSection

Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline

Write-Host "✓ Precios actualizados correctamente" -ForegroundColor Green
Write-Host ""
Write-Host "Nuevos precios:" -ForegroundColor Cyan
Write-Host "  • 1 hora: 60€" -ForegroundColor White
Write-Host "  • 5 horas: 275€ (55€/hora - ahorra 25€)" -ForegroundColor White
Write-Host "  • 10 horas: 500€ (50€/hora - ahorra 100€)" -ForegroundColor White
