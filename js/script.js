// Smooth Navigation
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    highlightLink(this);
}

// Active Nav Link Highlighting
function highlightLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Basic Interactivity
const interactiveElements = document.querySelectorAll('.interactive');

interactiveElements.forEach(element => {
    element.addEventListener('click', () => {
        // Add your interactivity here.
        element.classList.toggle('active');
    });
});

// Image Modal - Lightbox / Pop-up
function initImageModal() {
    // Créer le modal HTML
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img id="modalImage" src="" alt="">
            <div class="modal-zoom-controls">
                <button id="zoomIn" class="zoom-btn">+</button>
                <button id="zoomOut" class="zoom-btn">−</button>
                <button id="resetZoom" class="zoom-btn">Reset</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Variables pour le zoom
    let currentZoom = 1;
    const minZoom = 1;
    const maxZoom = 5;
    const zoomStep = 0.2;

    // Ajouter les événements aux images (sauf celles avec la classe 'no-modal')
    const images = document.querySelectorAll('img:not(.no-modal)');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openImageModal(this.src, this.alt);
        });
    });

    // Fonction pour ouvrir le modal
    function openImageModal(src, alt) {
        const modalImg = document.getElementById('modalImage');
        modalImg.src = src;
        modalImg.alt = alt;
        modal.classList.add('active');
        currentZoom = 1;
        modalImg.style.transform = 'scale(1)';
        document.body.style.overflow = 'hidden';
    }

    // Fonction pour fermer le modal
    function closeImageModal() {
        modal.classList.remove('active');
        currentZoom = 1;
        document.body.style.overflow = 'auto';
    }

    // Fonction pour zoomer
    function zoomImage(direction) {
        const modalImg = document.getElementById('modalImage');
        if (direction === 'in') {
            currentZoom = Math.min(currentZoom + zoomStep, maxZoom);
        } else if (direction === 'out') {
            currentZoom = Math.max(currentZoom - zoomStep, minZoom);
        }
        modalImg.style.transform = `scale(${currentZoom})`;
    }

    // Événements des boutons
    document.getElementById('zoomIn').addEventListener('click', () => zoomImage('in'));
    document.getElementById('zoomOut').addEventListener('click', () => zoomImage('out'));
    document.getElementById('resetZoom').addEventListener('click', () => {
        currentZoom = 1;
        document.getElementById('modalImage').style.transform = 'scale(1)';
    });

    // Fermer en cliquant sur la croix
    document.querySelector('.modal-close').addEventListener('click', closeImageModal);

    // Fermer en cliquant en dehors de l'image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });

    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeImageModal();
        }
    });

    // Support du zoom à la molette
    modal.addEventListener('wheel', function(e) {
        if (modal.classList.contains('active')) {
            e.preventDefault();
            if (e.deltaY < 0) {
                zoomImage('in');
            } else {
                zoomImage('out');
            }
        }
    }, { passive: false });
}

// Initialiser le modal au chargement du DOM
document.addEventListener('DOMContentLoaded', initImageModal);
