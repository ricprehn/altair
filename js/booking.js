// Booking System JavaScript
let bookingData = {
    course: null,
    courseName: null,
    price: null,
    duration: null,
    date: null,
    fullName: null,
    email: null,
    phone: null,
    modality: 'Online',
    experience: null
};

let currentStep = 1;
let selectedCourse = null;
let selectedDate = null;
let currentMonth = 11; // December (0-indexed)
let currentYear = 2025;

// Load course schedule from localStorage (synced with calendar)
let courseSchedule = {};

function loadCourseSchedule() {
    const savedSchedule = localStorage.getItem('altair_schedule');

    if (savedSchedule) {
        courseSchedule = JSON.parse(savedSchedule);
        console.log('Course schedule loaded from localStorage:', courseSchedule);
    } else {
        // Default fallback schedule
        courseSchedule = {
            'licencia': [
                { date: '2025-12-14', spots: 6 },
                { date: '2025-12-21', spots: 5 },
                { date: '2025-12-28', spots: 6 },
                { date: '2026-01-11', spots: 6 },
                { date: '2026-01-18', spots: 5 },
                { date: '2026-01-25', spots: 6 }
            ],
            'per-practicas': [
                { date: '2025-12-13', spots: 4 },
                { date: '2025-12-20', spots: 5 },
                { date: '2025-12-27', spots: 3 },
                { date: '2026-01-10', spots: 6 },
                { date: '2026-01-17', spots: 5 },
                { date: '2026-01-24', spots: 4 }
            ],
            'per-completo': [
                { date: '2025-12-15', spots: 3 },
                { date: '2025-12-22', spots: 4 },
                { date: '2026-01-12', spots: 5 },
                { date: '2026-01-19', spots: 4 },
                { date: '2026-01-26', spots: 6 }
            ],
            'per-vela': [
                { date: '2025-12-15', spots: 3 },
                { date: '2025-12-22', spots: 4 },
                { date: '2026-01-12', spots: 5 },
                { date: '2026-01-19', spots: 4 },
                { date: '2026-01-26', spots: 6 }
            ],
            'per-baleares': [
                { date: '2025-12-15', spots: 3 },
                { date: '2025-12-22', spots: 4 },
                { date: '2026-01-12', spots: 5 },
                { date: '2026-01-19', spots: 4 },
                { date: '2026-01-26', spots: 6 }
            ],
            'per-total': [
                { date: '2025-12-15', spots: 3 },
                { date: '2025-12-22', spots: 4 },
                { date: '2026-01-12', spots: 5 },
                { date: '2026-01-19', spots: 4 },
                { date: '2026-01-26', spots: 6 }
            ],
            'vela': [
                { date: '2025-12-14', spots: 4 },
                { date: '2025-12-21', spots: 3 },
                { date: '2026-01-11', spots: 5 },
                { date: '2026-01-18', spots: 6 },
                { date: '2026-01-25', spots: 4 }
            ],
            'baleares': [
                { date: '2025-12-20', spots: 3 },
                { date: '2025-12-27', spots: 4 },
                { date: '2026-01-17', spots: 5 },
                { date: '2026-01-24', spots: 3 }
            ],
            'pnb': [
                { date: '2025-12-13', spots: 4 },
                { date: '2025-12-20', spots: 5 },
                { date: '2025-12-27', spots: 3 },
                { date: '2026-01-10', spots: 6 },
                { date: '2026-01-17', spots: 4 },
                { date: '2026-01-24', spots: 5 }
            ]
        };
        console.log('Using default course schedule');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initializeBookingSystem();
});

function initializeBookingSystem() {
    // Load course schedule from localStorage
    loadCourseSchedule();

    // Step 1: Course Selection
    const courseOptions = document.querySelectorAll('.course-option');
    courseOptions.forEach(option => {
        option.addEventListener('click', function () {
            courseOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            selectedCourse = this.dataset.course;
            bookingData.course = selectedCourse;
            bookingData.courseName = this.querySelector('.course-title').textContent;
            bookingData.price = this.dataset.price;
            bookingData.duration = this.dataset.duration;

            document.getElementById('nextToDate').disabled = false;
        });
    });

    // Check for course parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    if (courseParam) {
        const courseElement = document.querySelector(`.course-option[data-course="${courseParam}"]`);
        if (courseElement) {
            courseElement.click();
        }
    }

    // Navigation buttons
    document.getElementById('nextToDate').addEventListener('click', () => goToStep(2));
    document.getElementById('backToCourse').addEventListener('click', () => goToStep(1));
    document.getElementById('nextToForm').addEventListener('click', () => goToStep(3));
    document.getElementById('backToDate').addEventListener('click', () => goToStep(2));
    document.getElementById('nextToConfirm').addEventListener('click', validateAndGoToConfirm);
    document.getElementById('backToForm').addEventListener('click', () => goToStep(3));
    document.getElementById('confirmBooking').addEventListener('click', submitBooking);

    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));

    // Initialize calendar
    renderCalendar();
}

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));

    // Show target step
    document.getElementById(`step${step}`).classList.add('active');

    // Update progress bar
    updateProgressBar(step);

    // Special actions for certain steps
    if (step === 2) {
        renderCalendar();
    } else if (step === 4) {
        updateConfirmation();
    }

    currentStep = step;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressBar(step) {
    const indicators = document.querySelectorAll('.step-indicator');
    const progressFill = document.getElementById('progressFill');

    indicators.forEach((indicator, index) => {
        const stepNum = index + 1;
        indicator.classList.remove('active', 'completed');

        if (stepNum < step) {
            indicator.classList.add('completed');
        } else if (stepNum === step) {
            indicator.classList.add('active');
        }
    });

    // Update progress fill width
    const progress = ((step - 1) / 3) * 100;
    progressFill.style.width = `${progress}%`;
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    document.getElementById('calendarMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    grid.innerHTML = '';

    // Add day headers
    const dayHeaders = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        grid.appendChild(header);
    });

    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Adjust for Monday start (0 = Sunday, we want Monday = 0)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Add empty cells for days before month starts
    for (let i = 0; i < adjustedFirstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        grid.appendChild(emptyDay);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const today = new Date();
        const currentDate = new Date(dateStr);

        // Check if date is in the past
        if (currentDate < today) {
            dayElement.classList.add('disabled');
        } else if (selectedCourse && courseSchedule[selectedCourse]) {
            // Check if this date has a scheduled course
            const schedule = courseSchedule[selectedCourse].find(s => s.date === dateStr);

            if (schedule) {
                if (schedule.spots > 3) {
                    dayElement.classList.add('available');
                } else if (schedule.spots > 0) {
                    dayElement.classList.add('few-spots');
                } else {
                    dayElement.classList.add('disabled');
                }

                dayElement.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                        this.classList.add('selected');
                        selectedDate = dateStr;
                        bookingData.date = dateStr;
                        document.getElementById('nextToForm').disabled = false;
                    }
                });
            } else {
                dayElement.classList.add('disabled');
            }
        } else {
            dayElement.classList.add('disabled');
        }

        grid.appendChild(dayElement);
    }
}

function changeMonth(direction) {
    currentMonth += direction;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar();
}

function validateAndGoToConfirm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const modality = document.getElementById('modality').value;
    const experience = document.getElementById('experience').value.trim();

    if (!fullName || !email || !phone) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, introduce un email válido.');
        return;
    }

    // Save data
    bookingData.fullName = fullName;
    bookingData.email = email;
    bookingData.phone = phone;
    bookingData.modality = modality;
    bookingData.experience = experience;

    goToStep(4);
}

function updateConfirmation() {
    document.getElementById('confirmCourse').textContent = bookingData.courseName;
    document.getElementById('confirmDate').textContent = formatDate(bookingData.date);
    document.getElementById('confirmModality').textContent = bookingData.modality;
    document.getElementById('confirmDuration').textContent = bookingData.duration;
    document.getElementById('confirmName').textContent = bookingData.fullName;
    document.getElementById('confirmEmail').textContent = bookingData.email;
    document.getElementById('confirmPhone').textContent = bookingData.phone;
    document.getElementById('confirmPrice').textContent = bookingData.price;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function submitBooking() {
    // Mock Payment Process
    const confirmBtn = document.getElementById('confirmBooking');
    const originalText = confirmBtn.innerHTML;
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando Pago...';

    setTimeout(() => {
        // Create booking object
        const booking = {
            id: Date.now(),
            bookingDate: new Date().toISOString(),
            ...bookingData,
            status: 'pending'
        };

        // Save to localStorage (in production, this would go to Firebase)
        let bookings = JSON.parse(localStorage.getItem('altair_bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('altair_bookings', JSON.stringify(bookings));

        // Update available spots
        let schedule = JSON.parse(localStorage.getItem('altair_schedule') || JSON.stringify(courseSchedule));
        if (schedule[bookingData.course]) {
            const dateEntry = schedule[bookingData.course].find(s => s.date === bookingData.date);
            if (dateEntry && dateEntry.spots > 0) {
                dateEntry.spots--;
                localStorage.setItem('altair_schedule', JSON.stringify(schedule));
            }
        }

        console.log('Booking submitted:', booking);

        // Show success message
        document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));
        document.getElementById('stepSuccess').classList.add('active');
        document.getElementById('successEmail').textContent = bookingData.email;

        // Update progress bar to show completion
        document.querySelectorAll('.step-indicator').forEach(indicator => {
            indicator.classList.remove('active');
            indicator.classList.add('completed');
        });
        document.getElementById('progressFill').style.width = '100%';

        // Send confirmation email
        sendConfirmationEmail(bookingData);

    }, 2000); // Simulate 2s payment delay
}

function sendConfirmationEmail(data) {
    console.log('Sending confirmation email to:', data.email);

    // Example email content
    const emailContent = `
        Hola ${data.fullName},
        
        ¡Gracias por reservar con Escuela Náutica Altair!
        
        DETALLES DE TU RESERVA:
        - Curso: ${data.courseName}
        - Fecha: ${formatDate(data.date)}
        - Duración: ${data.duration}
        - Precio: ${data.price}€
        
        PRÓXIMOS PASOS:
        1. Recibirás un email de confirmación en las próximas 24h
        2. Te enviaremos los detalles de pago
        3. Una vez confirmado el pago, recibirás:
           - Punto de encuentro
           - Qué traer el día del curso
           - Información adicional
        
        Si tienes alguna duda, contáctanos:
        📧 info@escuelanauticaaltair.com
        📱 +34 XXX XXX XXX
        
        ¡Nos vemos en el mar!
        Ricard Prehn
        Escuela Náutica Altair
    `;

    console.log('Email content:', emailContent);

    // In production, integrate with EmailJS:
    /*
    emailjs.send('YOUR_SERVICE_ID', 'booking_confirmation', {
        to_email: data.email,
        to_name: data.fullName,
        course: data.courseName,
        date: formatDate(data.date),
        duration: data.duration,
        price: data.price,
        phone: data.phone
    }).then(
        function(response) {
            console.log('Confirmation email sent!', response);
        },
        function(error) {
            console.log('Email failed', error);
        }
    );
    */
}
