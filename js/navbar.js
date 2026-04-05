// Navbar injection script
document.addEventListener('DOMContentLoaded', function() {
    var loc = window.location.pathname;
    const root_path_length = "/ld-portfolio/".length;
    var dir = loc.substring(root_path_length);
    var depth = dir.split("/").length;
    var path_to_root = "../".repeat(depth);
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
                <li>nombre de '../' dans ${dir} : ${depth}</li>
                <li><a href="${path_to_root}index.html">Accueil</a></li>
                <li><a href="${path_to_root}about.html">À propos</a></li>
                <li><a href="${path_to_root}projects.html">Projets</a></li>
                <li><a href="${path_to_root}skills.html">Compétences</a></li>
                <li><a href="${path_to_root}contact.html">Contact</a></li>
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
