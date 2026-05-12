// Image Modal - Lightbox / Pop-up
let imageModal = null;
let currentZoom = 1;

function initImageModal() {
    // Créer le modal HTML
    imageModal = document.createElement('div');
    imageModal.id = 'imageModal';
    imageModal.className = 'image-modal';
    imageModal.innerHTML = `
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
    document.body.appendChild(imageModal);

    // Variables pour le zoom
    const minZoom = 1;
    const maxZoom = 5;
    const zoomStep = 0.2;

    // Fonction pour ouvrir le modal
    window.openImageZoom = function(src, alt) {
        const modalImg = document.getElementById('modalImage');
        modalImg.src = src;
        modalImg.alt = alt || '';
        imageModal.classList.add('active');
        currentZoom = 1;
        modalImg.style.transform = 'scale(1)';
        document.body.style.overflow = 'hidden';
    };

    // Fonction pour fermer le modal
    function closeImageModal() {
        imageModal.classList.remove('active');
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
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });

    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });

    // Support du zoom à la molette
    imageModal.addEventListener('wheel', function(e) {
        if (imageModal.classList.contains('active')) {
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
