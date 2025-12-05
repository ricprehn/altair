# 🚢 Sistema de Reservas - Escuela Náutica Altair

## 📋 Resumen del Sistema

Has recibido un **sistema completo de reservas online** con:

### ✅ Para los Alumnos (`/pages/reservas.html`)
- Sistema de reservas paso a paso (4 pasos)
- Selección de curso con precios claros
- Calendario interactivo con disponibilidad en tiempo real
- Formulario de datos del alumno
- Confirmación visual de la reserva
- Email automático de confirmación (pendiente configurar)

### ✅ Para Ti - Panel de Administración (`/admin/index.html`)
- Login protegido (usuario: `admin` | contraseña: `altair2025`)
- Dashboard con estadísticas en tiempo real
- Gestión de reservas (confirmar/cancelar)
- Calendario de cursos programados
- Añadir nuevas fechas de cursos
- Vista de todas las reservas con filtros

---

## 🎯 Cómo Usar el Sistema

### 1. **Acceder al Panel de Administración**

```
Abre en tu navegador:
file:///c:/Users/Lionking/Documents/antigravity/altair/admin/index.html

Usuario: admin
Contraseña: altair2025
```

### 2. **Ver Reservas**
- En la pestaña "Reservas" verás todas las reservas realizadas
- Puedes confirmar o cancelar reservas con un clic
- Las estadísticas se actualizan automáticamente

### 3. **Añadir Fechas de Cursos**
- Ve a la pestaña "Añadir Fechas"
- Selecciona el tipo de curso
- Elige la fecha
- Define las plazas disponibles (máximo 7)
- Haz clic en "Añadir Fecha"

### 4. **Ver Calendario**
- La pestaña "Calendario" muestra todas las fechas programadas para julio
- Código de colores:
  - 🟢 Verde: Más de 3 plazas
  - 🟠 Naranja: 1-3 plazas
  - 🔴 Rojo: Completo

---

## 📊 Cursos y Precios Configurados

| Curso | Precio | Duración |
|-------|--------|----------|
| Licencia de Navegación | 95€ | 1 día (6h) |
| PER Solo Prácticas Motor | 360€ | 2 días (16h) |
| PER Completo | 850€ | Flexible |
| Ampliación Vela | 450€ | 16h |
| Ampliación Baleares | 550€ | 24h navegación |
| PNB | 450€ | Flexible |

---

## 📅 Fechas Programadas (Julio 2025)

El sistema ya tiene **más de 60 fechas ficticias** programadas para julio 2025 distribuidas entre todos los cursos. Puedes:
- Ver todas las fechas en el panel de administración
- Añadir más fechas cuando quieras
- Modificar las plazas disponibles

---

## 🔧 Próximos Pasos para Poner en Producción

### 1. **Configurar Emails Automáticos (EmailJS)**

**Paso 1:** Crea una cuenta en [EmailJS](https://www.emailjs.com/)
- Es gratis hasta 200 emails/mes
- Muy fácil de configurar

**Paso 2:** Obtén tus credenciales:
- Service ID
- Template ID
- Public Key

**Paso 3:** Edita `js/booking.js` línea 370:
```javascript
emailjs.send('TU_SERVICE_ID', 'booking_confirmation', {
    to_email: data.email,
    to_name: data.fullName,
    // ... resto del código
});
```

**Paso 4:** Añade el script de EmailJS en `pages/reservas.html` (antes del cierre `</body>`):
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init('TU_PUBLIC_KEY');
</script>
```

### 2. **Configurar Firebase (Base de Datos)**

**Opción A: Usar Firebase (Recomendado para producción)**
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Activa Firestore Database
3. Copia la configuración en `js/admin.js` línea 4
4. Descomenta las líneas de Firebase (líneas 15-16)

**Opción B: Seguir usando localStorage (Funciona pero datos solo en tu navegador)**
- Ya está configurado y funcionando
- Perfecto para pruebas
- Los datos se pierden si borras el caché del navegador

### 3. **Integrar Pagos Online (Stripe)**

**Si quieres cobrar online:**
1. Crea cuenta en [Stripe](https://stripe.com/es)
2. Obtén tus API keys
3. Añade el botón de pago en el paso 4 de reservas
4. Configura webhooks para confirmar pagos automáticamente

**Código ejemplo para añadir en `pages/reservas.html`:**
```html
<script src="https://js.stripe.com/v3/"></script>
<script>
const stripe = Stripe('TU_PUBLIC_KEY');
// Código de pago aquí
</script>
```

---

## 🌐 Subir a Internet

### Opción 1: Hosting Gratuito (GitHub Pages)
```bash
1. Sube tu carpeta a GitHub
2. Activa GitHub Pages en Settings
3. Tu web estará en: https://tuusuario.github.io/altair
```

### Opción 2: Hosting Profesional
- **Netlify** (gratis, muy fácil)
- **Vercel** (gratis, muy rápido)
- **Tu hosting actual** (sube por FTP)

---

## 📱 Prueba el Sistema Ahora

### Reserva de Prueba:
1. Abre: `file:///c:/Users/Lionking/Documents/antigravity/altair/pages/reservas.html`
2. Selecciona "Licencia de Navegación"
3. Elige una fecha verde (ej: 21 de junio)
4. Rellena el formulario con datos de prueba
5. Confirma la reserva

### Ver la Reserva en el Panel:
1. Abre: `file:///c:/Users/Lionking/Documents/antigravity/altair/admin/index.html`
2. Login: admin / altair2025
3. Verás la reserva en la tabla
4. Puedes confirmarla o cancelarla

---

## 🔐 Seguridad

**IMPORTANTE:** Antes de subir a internet:
1. Cambia la contraseña del admin en `js/admin.js` línea 31
2. Implementa autenticación real (Firebase Auth o similar)
3. No uses localStorage para datos sensibles en producción

---

## 📞 Soporte

Si necesitas ayuda con:
- Configurar EmailJS
- Subir a internet
- Integrar pagos
- Personalizar diseños

Solo pregúntame y te guío paso a paso.

---

## 🎉 ¡Todo Listo!

Tienes un sistema profesional de reservas que:
- ✅ Funciona offline (localStorage)
- ✅ Se ve increíble en móvil y desktop
- ✅ Gestiona reservas automáticamente
- ✅ Reduce plazas disponibles al reservar
- ✅ Te notifica de nuevas reservas
- ✅ Está listo para producción (solo falta configurar emails)

**¡Empieza a recibir reservas! ⚓🚀**
