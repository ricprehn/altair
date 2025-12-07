// Blog Posts Data - Escuela Náutica Altair
const blogPosts = [
    // Titulaciones y Formación (1-11)
    { id: 99, title: "Análisis de Polares: Conoce el Finnsailer 34 a fondo", excerpt: "Estudio técnico del rendimiento del s/y BELA. Gráficas interactivas basadas en datos ORC.", category: "Otros", url: "blog/analisis-polares-finnsailer-34.html", date: "2024-12-26" },
    { id: 1, title: "El Duelo de Titulaciones: Licencia vs. PNB vs. PER", excerpt: "¿Quieres empezar a navegar pero te lías con las siglas? Te ayudamos a elegir el título correcto desde el principio.", category: "Titulaciones", url: "blog/titulaciones-comparativa.html", date: "2024-12-01" },
    { id: 2, title: "PNB vs. Licencia de Navegación: ¿Cuál es la mejor opción?", excerpt: "Analizamos las consecuencias de elegir uno u otro para que no te arrepientas a mitad de temporada.", category: "Titulaciones", url: "blog/pnb-vs-licencia.html", date: "2024-12-02" },
    { id: 3, title: "5 Preguntas Frecuentes sobre el Examen Teórico del PER", excerpt: "Nuestros instructores responden a las dudas que más se repiten en clase para que vayas tranquilo al examen.", category: "Exámenes", url: "blog/preguntas-frecuentes-per.html", date: "2024-12-03" },
    { id: 4, title: "Ampliación del PER: De 15 a 24 metros y a Baleares", excerpt: "¿Es un simple trámite o la aventura más grande de tu vida? Descubre las ventajas de ampliar tu título.", category: "Titulaciones", url: "blog/ampliacion-per-baleares.html", date: "2024-12-04" },
    { id: 5, title: "El proceso de matrícula: del \"quiero navegar\" a tu primera travesía", excerpt: "Te explicamos los 4 sencillos pasos para matricularte, prepararte y salir a navegar con nosotros.", category: "Otros", url: "blog/proceso-matricula.html", date: "2024-12-05" },
    { id: 6, title: "Navegar a vela: ¿Obligatorio o pasión opcional?", excerpt: "¿Tengo que hacer prácticas de vela? La respuesta es NO, pero te contamos por qué deberías hacerlas.", category: "Otros", url: "blog/practicas-vela-obligatorias.html", date: "2024-12-06" },
    { id: 7, title: "¿Puedo navegar sin título? Límites y riesgos", excerpt: "Te explicamos dónde está la línea roja y por qué te animamos a obtener al menos la Licencia de Navegación.", category: "Titulaciones", url: "blog/navegar-sin-titulo.html", date: "2024-12-07" },
    { id: 8, title: "El \"Carnet de Moto de Agua\": Requisitos 2024/2025", excerpt: "Olvídate de multas y aprende cuál es la licencia mínima que necesitas para disfrutar de las motos de agua.", category: "Titulaciones", url: "blog/carnet-moto-agua.html", date: "2024-12-08" },
    { id: 9, title: "Preparación Express: Cómo aprobar el PER en un mes", excerpt: "Nuestra Guía de Ataque Rápido para un estudio eficiente y aprobar el teórico en tiempo récord.", category: "Exámenes", url: "blog/aprobar-per-un-mes.html", date: "2024-12-09" },
    { id: 10, title: "El Certificado Médico Náutico: Todo lo que necesitas saber", excerpt: "Requisitos, validez y dónde obtener el certificado obligatorio para tu título náutico en Barcelona.", category: "Otros", url: "blog/certificado-medico-nautico.html", date: "2024-12-10" },
    { id: 11, title: "La Edad de los Títulos: ¿Cuándo puedo empezar?", excerpt: "Guía de edad mínima para Licencia, PNB y PER. ¡La náutica se puede empezar muy joven!", category: "Titulaciones", url: "blog/edad-titulos-nauticos.html", date: "2024-12-11" },

    // Maniobras (13-15)
    { id: 13, title: "Maniobra de fondeo perfecta: Claves para no garrear", excerpt: "Técnica profesional para un fondeo seguro en la Costa Brava. La regla de oro de la cadena.", category: "Maniobras", url: "blog/maniobra-fondeo-perfecta.html", date: "2024-12-12" },
    { id: 14, title: "Atraque con viento de través: Trucos que funcionan", excerpt: "Usa el viento a tu favor, no en tu contra. Técnicas para atracar con viento lateral.", category: "Maniobras", url: "blog/atraque-viento-traves.html", date: "2024-12-13" },
    { id: 15, title: "Maniobra de desatraque: La clave para salir del puerto", excerpt: "Cómo usar el spring de desatraque para girar el barco y salir con elegancia sin estropear defensas.", category: "Maniobras", url: "blog/maniobra-desatraque.html", date: "2024-12-14" },

    // Seguridad (16-19, 25)
    { id: 16, title: "Hombre al agua: Maniobra de Anderson y Recuperación", excerpt: "Protocolo vital que puede salvar vidas. Los tres pasos cruciales ante una emergencia.", category: "Seguridad", url: "blog/hombre-al-agua.html", date: "2024-12-15" },
    { id: 17, title: "Primeros Auxilios a Bordo: Kit Esencial", excerpt: "En el mar, eres tu propio médico. Conoce el contenido del botiquín náutico obligatorio.", category: "Seguridad", url: "blog/primeros-auxilios-bordo.html", date: "2024-12-16" },
    { id: 19, title: "La importancia del chequeo pre-salida", excerpt: "5 minutos que pueden salvarte el día. Lista de verificación antes de soltar amarras.", category: "Seguridad", url: "blog/chequeo-pre-salida.html", date: "2024-12-18" },
    { id: 25, title: "Auxilio en el Mar: La llamada Mayday", excerpt: "Protocolo de emergencia en radio VHF. Cuándo y cómo usar Mayday, Pan-Pan y Securité.", category: "Seguridad", url: "blog/llamada-mayday.html", date: "2024-12-22" },

    // Otros (18, 20, 22)
    { id: 18, title: "El efecto de la hélice en las maniobras", excerpt: "La clave de los motores diésel. Aprende a usar el efecto del paso a tu favor en el atraque.", category: "Otros", url: "blog/efecto-helice.html", date: "2024-12-17" },
    { id: 20, title: "Entendiendo el GPS: Cómo trazar una ruta con waypoints", excerpt: "Navegación moderna con plotter. Aprende a crear rutas seguras y usar el GPS correctamente.", category: "Otros", url: "blog/gps-waypoints.html", date: "2024-12-19" },
    { id: 22, title: "Cabos y Nudos: El As de Guía y el Ballestrinque", excerpt: "Los nudos imprescindibles que todo patrón debe dominar. ¡Práctica en casa!", category: "Otros", url: "blog/cabos-nudos.html", date: "2024-12-21" },

    // Meteorología (21)
    { id: 21, title: "Meteorología en el Mediterráneo: Interpreta el parte", excerpt: "Conoce la Tramontana, Mistral y Levante. Cuándo quedarse en puerto y cuándo salir.", category: "Meteorología", url: "blog/meteorologia-mediterraneo.html", date: "2024-12-20" },

    // Sostenibilidad (36)
    { id: 36, title: "Fondeo sostenible: Respeta la Posidonia", excerpt: "Protege el pulmón del Mediterráneo. Normativa, multas y alternativas ecológicas.", category: "Sostenibilidad", url: "blog/fondeo-sostenible-posidonia.html", date: "2024-12-23" },

    // Reglamentación (37-38)
    { id: 37, title: "El Reglamento de Abordajes (RIPA): Las 5 reglas que debes saber", excerpt: "La biblia del mar. Las reglas esenciales para prevenir colisiones y navegar con seguridad.", category: "Reglamentación", url: "blog/ripa-reglas-oro.html", date: "2024-12-24" },
    { id: 38, title: "Documentación obligatoria a bordo en aguas catalanas", excerpt: "Qué papeles debe llevar tu barco para evitar sanciones de Capitanía Marítima.", category: "Reglamentación", url: "blog/documentacion-obligatoria.html", date: "2024-12-25" }
];

// State
let currentCategory = 'all';
let currentSort = 'newest';
let searchTerm = '';
let postsPerPage = 9;
let currentlyShowing = postsPerPage;

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    renderPosts();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            currentlyShowing = postsPerPage;
            renderPosts();
        });
    });

    document.getElementById('searchInput').addEventListener('input', function (e) {
        searchTerm = e.target.value.toLowerCase();
        currentlyShowing = postsPerPage;
        renderPosts();
    });

    document.getElementById('sortSelect').addEventListener('change', function (e) {
        currentSort = e.target.value;
        renderPosts();
    });

    document.getElementById('loadMoreBtn').addEventListener('click', function () {
        currentlyShowing += postsPerPage;
        renderPosts();
    });
}

// Filter and Sort Posts
function getFilteredPosts() {
    let filtered = [...blogPosts];

    if (currentCategory !== 'all') {
        filtered = filtered.filter(post => post.category === currentCategory);
    }

    if (searchTerm) {
        filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm)
        );
    }

    if (currentSort === 'newest') {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (currentSort === 'oldest') {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (currentSort === 'alpha') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
}

// Render Posts
function renderPosts() {
    const filtered = getFilteredPosts();
    const grid = document.getElementById('blogGrid');
    const noResults = document.getElementById('noResults');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const visibleCount = document.getElementById('visibleCount');
    const totalCount = document.getElementById('totalCount');

    grid.innerHTML = '';

    if (filtered.length === 0) {
        noResults.classList.add('show');
        loadMoreBtn.style.display = 'none';
        visibleCount.textContent = '0';
        totalCount.textContent = '0';
        return;
    } else {
        noResults.classList.remove('show');
    }

    const postsToShow = filtered.slice(0, currentlyShowing);
    postsToShow.forEach(post => {
        const card = createPostCard(post);
        grid.appendChild(card);
    });

    visibleCount.textContent = postsToShow.length;
    totalCount.textContent = filtered.length;

    if (currentlyShowing >= filtered.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Create Post Card
function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';

    article.innerHTML = `
        <div class="blog-content">
            <span class="blog-category">${post.category}</span>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="${post.url}" class="read-more">
                Leer más <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;

    return article;
}
