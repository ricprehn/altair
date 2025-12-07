// Public Calendar JavaScript

const courseData = {
    'licencia': {
        name: 'Licencia de Navegación',
        icon: '🚤',
        price: 95,
        duration: '1 día (6h)',
        description: 'Gobierna embarcaciones hasta 6m',
        color: '#00a8e8'
    },
    'per-practicas': {
        name: 'PER Prácticas Motor',
        icon: '⛵',
        price: 360,
        duration: '2 días (16h)',
        description: 'Prácticas de navegación y seguridad',
        color: '#0077be'
    },
    'per-completo': {
        name: 'PER Completo',
        icon: '🚢',
        price: 850,
        duration: 'Flexible',
        description: 'Teoría + Prácticas Motor',
        color: '#1a2332'
    },
    'vela': {
        name: 'Ampliación Vela',
        icon: '⛵',
        price: 450,
        duration: '16 horas',
        description: 'Aprende a patronear veleros',
        color: '#4caf50'
    },
    'baleares': {
        name: 'Ampliación Baleares',
        icon: '🧭',
        price: 550,
        duration: '24h navegación',
        description: 'Travesía a Baleares',
        color: '#ff9800'
    },
    'pnb': {
        name: 'PNB',
        icon: '🌊',
        price: 450,
        duration: 'Flexible',
        description: 'Patrón de Navegación Básica',
        color: '#9c27b0'
    }
};

// Load schedule from localStorage or use default
let courseSchedule = {};

document.addEventListener('DOMContentLoaded', function () {
    loadSchedule();
    setupFilters();
    renderCalendar();
});

function loadSchedule() {
    const savedSchedule = localStorage.getItem('altair_schedule_v2025');

    if (savedSchedule) {
        courseSchedule = JSON.parse(savedSchedule);
    } else {
        // Default schedule
        courseSchedule = {
            'licencia': [
                // Mayo 2026
                { date: '2026-05-09', spots: 6 },
                { date: '2026-05-23', spots: 5 },
                // Junio 2026 
                { date: '2026-06-06', spots: 6 },
                { date: '2026-06-13', spots: 4 },
                { date: '2026-06-20', spots: 5 },
                { date: '2026-06-27', spots: 6 },
                // Julio 2026
                { date: '2026-07-01', spots: 6 },
                { date: '2026-07-04', spots: 6 },
                { date: '2026-07-05', spots: 4 },
                { date: '2026-07-08', spots: 5 },
                { date: '2026-07-11', spots: 4 },
                { date: '2026-07-12', spots: 3 },
                { date: '2026-07-15', spots: 6 },
                { date: '2026-07-18', spots: 3 },
                { date: '2026-07-22', spots: 5 },
                { date: '2026-07-25', spots: 5 },
                { date: '2026-07-26', spots: 4 },
                { date: '2026-07-29', spots: 4 }
            ],
            'per-practicas': [
                // Mayo
                { date: '2026-05-16', spots: 5 },
                // Junio
                { date: '2026-06-06', spots: 4 },
                { date: '2026-06-22', spots: 4 },
                { date: '2026-06-29', spots: 1 },
                // Julio
                { date: '2026-07-02', spots: 6 },
                { date: '2026-07-04', spots: 4 },
                { date: '2026-07-06', spots: 5 },
                { date: '2026-07-09', spots: 4 },
                { date: '2026-07-11', spots: 3 },
                { date: '2026-07-13', spots: 3 },
                { date: '2026-07-16', spots: 6 },
                { date: '2026-07-20', spots: 6 },
                { date: '2026-07-25', spots: 5 },
                { date: '2026-07-27', spots: 2 },
                { date: '2026-07-30', spots: 4 }
            ],
            'per-completo': [
                // Mayo
                { date: '2026-05-11', spots: 6 },
                { date: '2026-05-25', spots: 5 },
                // Junio
                { date: '2026-06-08', spots: 4 },
                { date: '2026-06-24', spots: 3 },
                // Julio
                { date: '2026-07-01', spots: 6 },
                { date: '2026-07-08', spots: 5 },
                { date: '2026-07-15', spots: 6 },
                { date: '2026-07-22', spots: 6 },
                { date: '2026-07-29', spots: 5 }
            ],
            'vela': [
                // Mayo
                { date: '2026-05-02', spots: 4 },
                { date: '2026-05-30', spots: 5 },
                // Junio
                { date: '2026-06-13', spots: 4 },
                { date: '2026-06-27', spots: 3 },
                // Julio
                { date: '2026-07-04', spots: 5 },
                { date: '2026-07-11', spots: 6 },
                { date: '2026-07-18', spots: 4 },
                { date: '2026-07-25', spots: 3 }
            ],
            'baleares': [
                // Mayo
                { date: '2026-05-01', spots: 3 },
                { date: '2026-05-22', spots: 4 },
                // Junio
                { date: '2026-06-19', spots: 5 },
                { date: '2026-06-28', spots: 3 },
                // Julio
                { date: '2026-07-03', spots: 4 },
                { date: '2026-07-10', spots: 5 },
                { date: '2026-07-17', spots: 3 },
                { date: '2026-07-24', spots: 6 }
            ],
            'pnb': [
                // Mayo
                { date: '2026-05-16', spots: 5 },
                // Junio
                { date: '2026-06-13', spots: 4 },
                // Julio
                { date: '2026-07-01', spots: 3 },
                { date: '2026-07-08', spots: 5 },
                { date: '2026-07-15', spots: 2 },
                { date: '2026-07-22', spots: 6 },
                { date: '2026-07-29', spots: 4 }
            ]
        };
        // Save to localStorage for future use
        localStorage.setItem('altair_schedule_v2025', JSON.stringify(courseSchedule));
    }
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Render calendar with filter
            const filter = this.dataset.filter;
            renderCalendar(filter);
        });
    });
}

function renderCalendar(filter = 'all') {
    const container = document.getElementById('coursesContainer');

    // Collect all courses with dates
    const allCourses = [];

    for (const [courseType, dates] of Object.entries(courseSchedule)) {
        if (filter !== 'all' && courseType !== filter) continue;

        dates.forEach(dateInfo => {
            allCourses.push({
                type: courseType,
                ...dateInfo,
                ...courseData[courseType]
            });
        });
    }

    // Sort by date
    allCourses.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Filter out past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingCourses = allCourses.filter(course => new Date(course.date) >= today);

    if (upcomingCourses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <h3>No hay cursos programados</h3>
                <p>Pronto añadiremos nuevas fechas. Vuelve a consultar el calendario.</p>
            </div>
        `;
        return;
    }

    // Group by month
    const coursesByMonth = {};
    upcomingCourses.forEach(course => {
        const date = new Date(course.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!coursesByMonth[monthKey]) {
            coursesByMonth[monthKey] = [];
        }
        coursesByMonth[monthKey].push(course);
    });

    // Render by month
    let html = '';

    for (const [monthKey, courses] of Object.entries(coursesByMonth)) {
        const [year, month] = monthKey.split('-');
        const monthName = getMonthName(parseInt(month) - 1);

        html += `
            <div class="month-section">
                <div class="month-header">
                    <div class="month-icon">
                        <i class="fas fa-calendar"></i>
                    </div>
                    <div class="month-title">${monthName} ${year}</div>
                </div>
                <div class="courses-grid">
                    ${courses.map(course => renderCourseCard(course)).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function renderCourseCard(course) {
    const availabilityClass = getAvailabilityClass(course.spots);
    const availabilityText = getAvailabilityText(course.spots);
    const dots = renderAvailabilityDots(course.spots);
    const isAvailable = course.spots > 0;

    return `
        <div class="course-event" data-course="${course.type}">
            <div class="course-event-header" style="border-left-color: ${course.color};">
                <div class="course-date">
                    <i class="fas fa-calendar-day"></i>
                    ${formatDate(course.date)}
                </div>
                <div class="course-name">${course.icon} ${course.name}</div>
            </div>
            <div class="course-event-body">
                <div class="course-info">
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span>${course.duration}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-info-circle"></i>
                        <span>${course.description}</span>
                    </div>
                </div>
                
                <div class="availability ${availabilityClass}">
                    <div class="availability-dots">${dots}</div>
                    <span class="availability-text">${availabilityText}</span>
                </div>
                
                <div class="course-price">${course.price}€</div>
                
                <button class="btn-reserve" 
                        onclick="reserveCourse('${course.type}', '${course.date}')"
                        ${!isAvailable ? 'disabled' : ''}>
                    ${isAvailable ? '<i class="fas fa-check-circle"></i> Reservar Plaza' : '<i class="fas fa-times-circle"></i> Completo'}
                </button>
            </div>
        </div>
    `;
}

function getAvailabilityClass(spots) {
    if (spots >= 4) return 'high';
    if (spots >= 2) return 'medium';
    if (spots >= 1) return 'low';
    return 'full';
}

function getAvailabilityText(spots) {
    if (spots >= 4) return `${spots} plazas disponibles`;
    if (spots >= 2) return `${spots} plazas disponibles`;
    if (spots === 1) return '¡Última plaza!';
    return 'Completo';
}

function renderAvailabilityDots(spots) {
    const maxDots = 7;
    let html = '';

    for (let i = 0; i < maxDots; i++) {
        const filled = i < spots ? 'filled' : '';
        html += `<div class="dot ${filled}"></div>`;
    }

    return html;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function getMonthName(monthIndex) {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[monthIndex];
}

function reserveCourse(courseType, date) {
    // Redirect to booking page with pre-selected course and date
    window.location.href = `reservas.html?course=${courseType}&date=${date}`;
}
