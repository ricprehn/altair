# -*- coding: utf-8 -*-
import codecs

# Leer el archivo
with codecs.open('pages/clases-particulares.html', 'r', 'utf-8') as f:
    content = f.read()

# Reemplazos para la primera tarjeta (1 Hora - 60€)
content = content.replace(
    '<i class="fas fa-laptop"></i>',
    '<i class="fas fa-clock"></i>',
    1
)
content = content.replace(
    '<h3 class="modalidad-title">Clases Online</h3>',
    '<h3 class="modalidad-title">1 Hora</h3>'
)
content = content.replace(
    'Desde cualquier lugar. Clases por videollamada con pizarra digital y\r\n                        material interactivo.',
    'Prueba una clase particular. Ideal para resolver dudas puntuales o probar nuestra metodología.'
)
content = content.replace('<div class="modalidad-price">30€</div>', '<div class="modalidad-price">60€</div>')

# Reemplazos para la segunda tarjeta (Pack 5 Horas - 275€)
content = content.replace(
    '<i class="fas fa-chalkboard-teacher"></i>',
    '<i class="fas fa-fire"></i>'
)
content = content.replace(
    '<h3 class="modalidad-title">Clases Presenciales</h3>',
    '<h3 class="modalidad-title">Pack 5 Horas</h3>'
)
content = content.replace(
    'En Barcelona. Clases cara a cara con todo el material necesario incluido.',
    '¡Más popular! Preparación completa con descuento. Perfecto para aprobar tu examen.'
)
content = content.replace('<div class="modalidad-price">35€</div>', '<div class="modalidad-price">275€</div>')
content = content.replace(
    '<div class="modalidad-price-detail">por hora</div>',
    '<div class="modalidad-price-detail">55€/hora (ahorra 25€)</div>',
    1
)

# Reemplazos para la tercera tarjeta (Pack 10 Horas - 500€)
content = content.replace(
    '<i class="fas fa-gift"></i>',
    '<i class="fas fa-star"></i>'
)
content = content.replace(
    '<h3 class="modalidad-title">Pack 5 Clases</h3>',
    '<h3 class="modalidad-title">Pack 10 Horas</h3>'
)
content = content.replace(
    '¡Ahorra! Pack de 5 clases con descuento especial. Online o presenciales.',
    'Máximo ahorro. Preparación intensiva con el mejor precio por hora.'
)
content = content.replace('<div class="modalidad-price">140€</div>', '<div class="modalidad-price">500€</div>')
content = content.replace(
    '<div class="modalidad-price-detail">28€ por clase (ahorra 10€)</div>',
    '<div class="modalidad-price-detail">50€/hora (ahorra 100€)</div>'
)
content = content.replace(
    '¡Quiero el\r\n                        Pack!',
    'Reservar Pack'
)

# Añadir nota informativa después de las tarjetas
old_closing = '            </div>\r\n        </div>\r\n\r\n        <!-- Beneficios -->'
new_closing = '''            </div>

            <!-- Pricing Info -->
            <div style="background: #f0f8ff; padding: 2rem; border-radius: 12px; margin-top: 2rem; text-align: center;">
                <p style="margin: 0; color: #666; font-size: 1.1rem;">
                    <i class="fas fa-info-circle" style="color: var(--primary-color);"></i> 
                    <strong>Modalidades:</strong> Todas las clases disponibles en formato <strong>Online</strong> o <strong>Presencial</strong> en Barcelona
                </p>
                <p style="margin: 0.5rem 0 0 0; color: #999;">
                    Horarios flexibles de lunes a domingo • Franja horaria: 10:00 - 20:00h
                </p>
            </div>
        </div>

        <!-- Beneficios -->'''

content = content.replace(old_closing, new_closing)

# Guardar el archivo
with codecs.open('pages/clases-particulares.html', 'w', 'utf-8') as f:
    f.write(content)

print("✓ Precios actualizados correctamente")
print("\nNuevos precios:")
print("  • 1 hora: 60€")
print("  • 5 horas: 275€ (55€/hora - ahorra 25€)")
print("  • 10 horas: 500€ (50€/hora - ahorra 100€)")
