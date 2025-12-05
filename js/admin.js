// Admin Panel JavaScript with Firebase Integration

// Firebase Configuration (You'll need to replace with your actual config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "altair-nautica.firebaseapp.com",
    projectId: "altair-nautica",
    storageBucket: "altair-nautica.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase (commented out until you set up Firebase)
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// Mock data for demonstration (replace with Firebase later)
let bookings = [];
let courseSchedule = {};

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication (replace with proper auth in production)
    if (username === 'admin' && password === 'altair2025') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadDashboard();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function () {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginForm').reset();
});

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        const tabName = this.dataset.tab;
        document.getElementById(tabName).classList.add('active');

        // Load specific tab data
        if (tabName === 'calendar') {
            renderAdminCalendar();
        } else if (tabName === 'courses') {
            renderScheduledCourses();
        }
    });
});

// Load dashboard data
function loadDashboard() {
    // In production, this would fetch from Firebase
    // For now, we'll use localStorage to simulate persistence

    const savedBookings = localStorage.getItem('altair_bookings');
    if (savedBookings) {
        bookings = JSON.parse(savedBookings);
    }

    const savedSchedule = localStorage.getItem('altair_schedule');
    if (savedSchedule) {
        courseSchedule = JSON.parse(savedSchedule);
    } else {
        // Initialize with default schedule from booking.js
        courseSchedule = {
            'licencia': [
                { date: '2025-06-21', spots: 5 },
                { date: '2025-06-28', spots: 2 },
                { date: '2025-07-02', spots: 6 },
                { date: '2025-07-05', spots: 6 },
                { date: '2025-07-09', spots: 5 },
                { date: '2025-07-12', spots: 4 },
                { date: '2025-07-16', spots: 6 },
                { date: '2025-07-19', spots: 3 },
                { date: '2025-07-23', spots: 5 },
                { date: '2025-07-26', spots: 5 },
                { date: '2025-07-30', spots: 4 }
            ],
            'per-practicas': [
                { date: '2025-06-23', spots: 4 },
                { date: '2025-06-30', spots: 1 },
                { date: '2025-07-03', spots: 6 },
                { date: '2025-07-07', spots: 5 },
                { date: '2025-07-10', spots: 4 },
                { date: '2025-07-14', spots: 3 },
                { date: '2025-07-17', spots: 6 },
                { date: '2025-07-21', spots: 6 },
                { date: '2025-07-24', spots: 5 },
                { date: '2025-07-28', spots: 2 },
                { date: '2025-07-31', spots: 4 }
            ],
            'per-completo': [
                { date: '2025-06-25', spots: 3 },
                { date: '2025-07-01', spots: 6 },
                { date: '2025-07-02', spots: 5 },
                { date: '2025-07-08', spots: 5 },
                { date: '2025-07-09', spots: 4 },
                { date: '2025-07-15', spots: 6 },
                { date: '2025-07-16', spots: 2 },
                { date: '2025-07-22', spots: 6 },
                { date: '2025-07-23', spots: 6 },
                { date: '2025-07-29', spots: 5 },
                { date: '2025-07-30', spots: 3 }
            ],
            'vela': [
                { date: '2025-06-27', spots: 4 },
                { date: '2025-07-04', spots: 3 },
                { date: '2025-07-05', spots: 5 },
                { date: '2025-07-11', spots: 5 },
                { date: '2025-07-12', spots: 6 },
                { date: '2025-07-18', spots: 2 },
                { date: '2025-07-19', spots: 4 },
                { date: '2025-07-25', spots: 4 },
                { date: '2025-07-26', spots: 3 }
            ],
            'baleares': [
                { date: '2025-06-29', spots: 3 },
                { date: '2025-07-04', spots: 4 },
                { date: '2025-07-06', spots: 2 },
                { date: '2025-07-11', spots: 5 },
                { date: '2025-07-13', spots: 4 },
                { date: '2025-07-18', spots: 3 },
                { date: '2025-07-20', spots: 5 },
                { date: '2025-07-25', spots: 6 },
                { date: '2025-07-27', spots: 3 }
            ],
            'pnb': [
                { date: '2025-06-24', spots: 4 },
                { date: '2025-07-01', spots: 3 },
                { date: '2025-07-03', spots: 5 },
                { date: '2025-07-08', spots: 5 },
                { date: '2025-07-10', spots: 6 },
                { date: '2025-07-15', spots: 2 },
                { date: '2025-07-17', spots: 4 },
                { date: '2025-07-22', spots: 6 },
                { date: '2025-07-24', spots: 5 },
                { date: '2025-07-29', spots: 4 },
                { date: '2025-07-31', spots: 3 }
            ]
        };
        localStorage.setItem('altair_schedule', JSON.stringify(courseSchedule));
    }

    updateStats();
    renderBookingsTable();
}

// Update statistics
function updateStats() {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const revenue = bookings.reduce((sum, b) => sum + parseInt(b.price), 0);

    document.getElementById('totalBookings').textContent = total;
    document.getElementById('confirmedBookings').textContent = confirmed;
    document.getElementById('pendingBookings').textContent = pending;
    document.getElementById('totalRevenue').textContent = revenue + '€';
}

// Render bookings table
function renderBookingsTable() {
    const tbody = document.getElementById('bookingsTableBody');

    if (bookings.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: #999;">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    No hay reservas todavía
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = bookings.map((booking, index) => `
        <tr>
            <td>#${String(index + 1).padStart(3, '0')}</td>
            <td>${formatDate(booking.bookingDate)}</td>
            <td>
                <strong>${booking.fullName}</strong><br>
                <small style="color: #666;">${booking.email}</small><br>
                <small style="color: #666;">${booking.phone}</small>
            </td>
            <td>${booking.courseName}</td>
            <td>${formatDate(booking.date)}</td>
            <td><strong>${booking.price}€</strong></td>
            <td>
                <span class="status-badge status-${booking.status}">
                    ${booking.status === 'confirmed' ? 'Confirmada' :
            booking.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                </span>
            </td>
            <td>
                ${booking.status === 'pending' ? `
                    <button class="btn-action btn-confirm" onclick="confirmBooking(${index})">
                        <i class="fas fa-check"></i> Confirmar
                    </button>
                ` : ''}
                <button class="btn-action btn-cancel" onclick="cancelBooking(${index})">
                    <i class="fas fa-times"></i> Cancelar
                </button>
            </td>
        </tr>
    `).join('');
}

// Confirm booking
function confirmBooking(index) {
    bookings[index].status = 'confirmed';
    localStorage.setItem('altair_bookings', JSON.stringify(bookings));
    updateStats();
    renderBookingsTable();

    // In production, send confirmation email here
    alert(`Reserva confirmada. Email de confirmación enviado a ${bookings[index].email}`);
}

// Cancel booking
function cancelBooking(index) {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
        bookings[index].status = 'cancelled';

        // Return spot to availability
        const course = bookings[index].course;
        const date = bookings[index].date;
        const schedule = courseSchedule[course];
        if (schedule) {
            const dateEntry = schedule.find(s => s.date === date);
            if (dateEntry) {
                dateEntry.spots++;
            }
        }

        localStorage.setItem('altair_bookings', JSON.stringify(bookings));
        localStorage.setItem('altair_schedule', JSON.stringify(courseSchedule));
        updateStats();
        renderBookingsTable();

        alert('Reserva cancelada');
    }
}

// Add new course date
document.getElementById('addCourseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const courseType = document.getElementById('courseType').value;
    const courseDate = document.getElementById('courseDate').value;
    const courseSpots = parseInt(document.getElementById('courseSpots').value);

    if (!courseSchedule[courseType]) {
        courseSchedule[courseType] = [];
    }

    // Check if date already exists
    const existingDate = courseSchedule[courseType].find(s => s.date === courseDate);
    if (existingDate) {
        alert('Ya existe una fecha programada para este curso en esta fecha');
        return;
    }

    courseSchedule[courseType].push({
        date: courseDate,
        spots: courseSpots
    });

    // Sort by date
    courseSchedule[courseType].sort((a, b) => new Date(a.date) - new Date(b.date));

    localStorage.setItem('altair_schedule', JSON.stringify(courseSchedule));

    alert('Fecha añadida correctamente');
    this.reset();
    renderScheduledCourses();
});

// Render scheduled courses
function renderScheduledCourses() {
    const container = document.getElementById('scheduledCourses');

    const courseNames = {
        'licencia': 'Licencia de Navegación',
        'per-practicas': 'PER Prácticas Motor',
        'per-completo': 'PER Completo',
        'vela': 'Ampliación Vela',
        'baleares': 'Ampliación Baleares',
        'pnb': 'PNB'
    };

    let html = '';

    for (const [courseType, dates] of Object.entries(courseSchedule)) {
        html += `
            <div style="margin-bottom: 2rem;">
                <h4 style="color: var(--primary-color); margin-bottom: 1rem;">
                    ${courseNames[courseType]}
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
                    ${dates.map(d => `
                        <div style="background: #f5f7fa; padding: 1rem; border-radius: 8px; border-left: 3px solid var(--primary-color);">
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">${formatDate(d.date)}</div>
                            <div style="color: #666; font-size: 0.9rem;">
                                <i class="fas fa-users"></i> ${d.spots} plazas
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

// Render admin calendar
function renderAdminCalendar() {
    const container = document.getElementById('adminCalendar');

    // Simple calendar view showing all courses
    let html = '<div style="display: grid; gap: 1.5rem;">';

    const courseNames = {
        'licencia': 'Licencia de Navegación',
        'per-practicas': 'PER Prácticas Motor',
        'per-completo': 'PER Completo',
        'vela': 'Ampliación Vela',
        'baleares': 'Ampliación Baleares',
        'pnb': 'PNB'
    };

    for (const [courseType, dates] of Object.entries(courseSchedule)) {
        const julyDates = dates.filter(d => d.date.startsWith('2025-07'));

        if (julyDates.length > 0) {
            html += `
                <div style="background: #f5f7fa; padding: 1.5rem; border-radius: 8px;">
                    <h4 style="margin-bottom: 1rem; color: var(--primary-color);">${courseNames[courseType]}</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${julyDates.map(d => {
                const spotsColor = d.spots > 3 ? '#4caf50' : d.spots > 0 ? '#ff9800' : '#f44336';
                return `
                                <div style="background: white; padding: 0.75rem; border-radius: 6px; border-left: 3px solid ${spotsColor}; min-width: 120px;">
                                    <div style="font-weight: 600; font-size: 0.9rem;">${new Date(d.date).getDate()} Jul</div>
                                    <div style="color: #666; font-size: 0.8rem; margin-top: 0.25rem;">
                                        ${d.spots} plazas
                                    </div>
                                </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
        }
    }

    html += '</div>';
    container.innerHTML = html;
}

// Utility function to format dates
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Listen for new bookings from the public booking page
window.addEventListener('storage', function (e) {
    if (e.key === 'altair_bookings') {
        bookings = JSON.parse(e.newValue || '[]');
        updateStats();
        renderBookingsTable();
    }
});
