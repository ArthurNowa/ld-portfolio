// Carousel variables
let currentSlide = 0;
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.carousel-item');
let autoSlideInterval;

// Carousel functions
function showSlide(n) {
    if (slides.length === 0) return;
    
    if (n >= slides.length) {
        currentSlide = 0;
    }
    if (n < 0) {
        currentSlide = slides.length - 1;
    }
    
    const translateX = -currentSlide * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    resetAutoSlide();
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 10000); // 10 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Hamburger menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

// Close menu when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Initialize carousel
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoSlide();
    }
});
