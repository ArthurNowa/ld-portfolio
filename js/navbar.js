// Navbar injection script
document.addEventListener('DOMContentLoaded', function() {
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    var count = (loc.match('/') || []).length;
    const navbarHTML = `
    <nav class="navbar">
        <div class="container">
            <div class="logo">
                <h1><a href="index.html" style="color: white; text-decoration: none;">LD Portfolio</a></h1>
            </div>
            <div class="hamburger" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul class="nav-links" id="navMenu">
                <li>nombre de '/' dans ${loc} : ${count}</li>
                <li><a href="index.html">Accueil</a></li>
                <li><a href="about.html">À propos</a></li>
                <li><a href="projects.html">Projets</a></li>
                <li><a href="skills.html">Compétences</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>`;
    
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
});

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
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
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
    }, 100);
});
