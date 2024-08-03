// Pour charger la navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de chargement de la navigation bar : ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;

            attachNavbarEvents();
            addScrollListener();
        })
        .catch(error => {
            console.error('Erreur lors du chargement de la navigation bar : ', error);
            document.getElementById('navbar-placeholder').innerHTML = '<div>Erreur lors du chargement de la navigation bar.</div>';
        });
}

// Pour la version mobile de la navbar
function attachNavbarEvents() {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const mobileLinks = document.querySelector('.mobile-links');

    if (!menuIcon || !navMenu || !mobileLinks) {
        console.error('Un ou plusieurs éléments nécessaires ne sont pas trouvés');
        return;
    }

    // Menu burger
    menuIcon.addEventListener('click', function() {
        menuIcon.classList.toggle('active');
        mobileLinks.classList.toggle('active');
    });

    // Fermer le menu burger
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            mobileLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', function() {
            mobileLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        });
    });

    // Smooth scroll pour tous les liens internes
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event) {
            // Vérifie si le lien pointe vers une ancre dans la même page
            if (this.hash !== "" && this.pathname === window.location.pathname) {
                // Empêche le comportement par défaut de l'ancre
                event.preventDefault();
                // Stocke l'identifiant de l'ancre
                var hash = this.hash;
                // Fait défiler en douceur jusqu'à l'ancre avec une durée d'animation
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                    duration: 1000 // Durée de l'animation en millisecondes
                });
            }
        });
    });

    console.log('Événements de la navbar attachés');
}

// Fonction pour ajouter un écouteur de défilement à la navigation bar
function addScrollListener() {
    const navbar = document.querySelector('.nav-menu');
    const sectionFirst = document.getElementById('first');

    if (!navbar || !sectionFirst) {
        console.error('Navbar ou section "first" non trouvée.');
        return;
    }

    function toggleNavbarColor() {
        const sectionFirstTop = sectionFirst.getBoundingClientRect().top;
        const sectionFirstBottom = sectionFirst.getBoundingClientRect().bottom;

        // Vérifiez si la section 'first' est dans la vue
        if (sectionFirstTop < window.innerHeight && sectionFirstBottom > 0) {
            navbar.classList.add('white');
        } else {
            navbar.classList.remove('white');
        }
    }

    // Écoutez les événements de défilement pour appliquer le changement de style
    window.addEventListener('scroll', toggleNavbarColor);

    // Écoutez les événements de survol pour appliquer le changement de style
    sectionFirst.addEventListener('mouseenter', function () {
        navbar.classList.add('white');
    });
    sectionFirst.addEventListener('mouseleave', function () {
        const sectionFirstTop = sectionFirst.getBoundingClientRect().top;
        const sectionFirstBottom = sectionFirst.getBoundingClientRect().bottom;
        if (!(sectionFirstTop < window.innerHeight && sectionFirstBottom > 0)) {
            navbar.classList.remove('white');
        }
    });

    // Initial call to set the color based on the current scroll position
    toggleNavbarColor();
}

// Charger la navbar et ajouter les écouteurs de défilement
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
});

// Gérer le Loader
document.addEventListener("DOMContentLoaded", function() {
    // défilement 
    let currentNumber = 0;
    const interval = setInterval(function() {
        document.getElementById('counter').textContent = currentNumber + '%';
        if (currentNumber === 100) {
            clearInterval(interval); 
            document.getElementById('loader').classList.add('hidden');
        } else {
            currentNumber += 10; 
        }
    }, 200); 
});

// Pour le changement de thème
function toggleTheme() {
    document.body.classList.toggle('alternate-theme');
}
