// Fonction pour charger la navigation bar à partir de navbar.html
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

            // Une fois la navigation chargée, attacher les événements
            attachNavbarEvents();
        })
        .catch(error => {
            console.error('Erreur lors du chargement de la navigation bar : ', error);
            // Gérer l'erreur : par exemple, afficher un message d'erreur alternatif
            document.getElementById('navbar-placeholder').innerHTML = '<div>Erreur lors du chargement de la navigation bar.</div>';
        });
}

// Fonction pour attacher les événements à la barre de navigation
function attachNavbarEvents() {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const mobileLinks = document.querySelector('.mobile-links');

    // Gérer l'activation et la désactivation du menu burger
    menuIcon.addEventListener('click', function() {
        menuIcon.classList.toggle('active');
        mobileLinks.classList.toggle('active');
    });

    // Fermer le menu mobile lorsqu'on clique en dehors du menu
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            mobileLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });

    // Fermer le menu mobile lorsqu'on clique sur un lien
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
}

// Appeler la fonction pour charger la navigation bar
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
});



function toggleTheme() {
    document.body.classList.toggle('alternate-theme');
}
document.addEventListener("DOMContentLoaded", function() {
    // Début du défilement à 0%
    let currentNumber = 0;
    // Intervalle de mise à jour toutes les secondes (1000ms)
    const interval = setInterval(function() {
        // Mettre à jour le numéro affiché par incréments de 10
        document.getElementById('counter').textContent = currentNumber + '%';
        // Augmenter le numéro actuel de 10 jusqu'à atteindre 100
        if (currentNumber === 100) {
            clearInterval(interval); // Arrêter l'intervalle une fois atteint 100%
            // Ajouter la classe 'hidden' pour déclencher la transition d'opacité
            document.getElementById('loader').classList.add('hidden');
        } else {
            currentNumber += 10; // Augmenter le numéro de 10
        }
    }, 200); // Mettre à jour toutes les secondes (1000ms)
});

document.addEventListener('DOMContentLoaded', function () {
    // Vérifier si la page actuelle est la page d'accueil
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        // Fonction pour charger la navigation bar à partir de navbar.html
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
                    // Appeler addScrollListener après le chargement de la navigation bar
                    addScrollListener();
                })
                .catch(error => {
                    console.error('Erreur lors du chargement de la navigation bar : ', error);
                    document.getElementById('navbar-placeholder').innerHTML = '<div>Erreur lors du chargement de la navigation bar.</div>';
                });
        }

        function addScrollListener() {
            const navbar = document.querySelector('.nav-menu');
            const sectionFirst = document.getElementById('first');

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

        // Appeler la fonction pour charger la navigation bar
        loadNavbar();
    }
});
