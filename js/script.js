document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }

                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Here you would typically send the email to your newsletter service
                console.log('Newsletter subscription:', emailInput.value);
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Add animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.feature, .course-card, .contact-info, #contact-form');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.feature, .course-card, .contact-info, #contact-form').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Add active class to current navigation link
    const sections = document.querySelectorAll('section');

    function highlightNavigation() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Run once on load

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Google Reviews Logic
    const staticReviews = [
        {
            name: "María G.",
            text: "Excelente escuela náutica. Profesores muy profesionales y con mucha experiencia. Las prácticas en grupos reducidos hacen que aprendas mucho más. ¡Totalmente recomendable!",
            rating: 5,
            date: "Hace 2 meses"
        },
        {
            name: "Carlos R.",
            text: "La opción online me permitió estudiar a mi ritmo. Las prácticas fueron increíbles, aprendí muchísimo en poco tiempo. El trato personalizado marca la diferencia.",
            rating: 5,
            date: "Hace 1 mes"
        },
        {
            name: "Jorge M.",
            text: "Hice el PER con ampliación a Baleares y vela. Los instructores son excelentes y la flota está muy bien cuidada. Aprobé a la primera gracias a su método de enseñanza.",
            rating: 5,
            date: "Hace 3 meses"
        },
        {
            name: "Ana P.",
            text: "Ricard es un instructor fantástico. Tiene muchísima paciencia y explica todo con claridad. Las prácticas en el velero Certascan fueron una experiencia inolvidable.",
            rating: 5,
            date: "Hace 4 meses"
        },
        {
            name: "David S.",
            text: "Muy buena relación calidad-precio. Me saqué la Licencia de Navegación en una mañana y fue muy divertido. El ambiente en el barco es genial.",
            rating: 5,
            date: "Hace 5 meses"
        },
        {
            name: "Laura B.",
            text: "Recomiendo 100% esta escuela. Son flexibles con los horarios y se nota que les apasiona lo que hacen. Aprendí a navegar de verdad, no solo para aprobar.",
            rating: 5,
            date: "Hace 2 semanas"
        },
        {
            name: "Marc T.",
            text: "Una experiencia de 10. El velero es precioso y muy cómodo. Hicimos las prácticas de vela y aprendimos un montón sobre trimado y maniobras.",
            rating: 5,
            date: "Hace 6 meses"
        },
        {
            name: "Sofia L.",
            text: "Gracias a todo el equipo por el trato recibido. Me ayudaron mucho con la gestión del título y las prácticas fueron muy útiles. ¡Volveré para el Patrón de Yate!",
            rating: 5,
            date: "Hace 1 mes"
        },
        {
            name: "Pablo R.",
            text: "La mejor escuela náutica de Barcelona. Trato cercano, profesionalidad y buenos barcos. Si quieres aprender a navegar, este es el sitio.",
            rating: 5,
            date: "Hace 3 semanas"
        }
    ];

    // Function to display reviews (accepts array of reviews)
    function displayReviews(reviewsToDisplay) {
        const container = document.querySelector('.testimonials-container');
        if (!container) return;

        // Shuffle array
        const shuffled = reviewsToDisplay.sort(() => 0.5 - Math.random());
        // Get first 3
        const selected = shuffled.slice(0, 3);

        // Clear current content
        container.innerHTML = '';

        // Add selected reviews
        selected.forEach(review => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';

            // Create stars HTML
            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                if (i < review.rating) {
                    starsHtml += '<i class="fas fa-star"></i>';
                } else {
                    starsHtml += '<i class="far fa-star"></i>';
                }
            }

            card.innerHTML = `
                <div class="stars">${starsHtml}</div>
                <p>"${review.text}"</p>
                <div class="testimonial-author">
                    <strong>${review.name}</strong>
                    <span>${review.date}</span>
                </div>
            `;

            // Add animation class
            card.style.opacity = '0';
            container.appendChild(card);

            // Trigger animation
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease';
                card.style.opacity = '1';
            }, 100);
        });
    }

    // Initialize with static reviews first
    displayReviews(staticReviews);

    // Global function called by Google Maps API callback
    window.initGoogleReviews = function () {
        // Replace YOUR_PLACE_ID with your actual Place ID
        // You can find it here: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
        const PLACE_ID = 'YOUR_PLACE_ID';

        if (PLACE_ID === 'YOUR_PLACE_ID') {
            console.log('Google Reviews: Place ID not set. Using static reviews.');
            return;
        }

        const mapDiv = document.createElement('div');
        const service = new google.maps.places.PlacesService(mapDiv);

        service.getDetails({
            placeId: PLACE_ID,
            fields: ['reviews']
        }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
                console.log('Google Reviews: Fetched successfully.');

                // Transform API reviews to match our format
                const apiReviews = place.reviews.map(review => ({
                    name: review.author_name,
                    text: review.text.length > 150 ? review.text.substring(0, 150) + '...' : review.text,
                    rating: review.rating,
                    date: review.relative_time_description
                }));

                // Update display with real reviews
                displayReviews(apiReviews);
            } else {
                console.log('Google Reviews: Failed to fetch. Status:', status);
                // Fallback is already displayed (static reviews)
            }
        });
    };
});
