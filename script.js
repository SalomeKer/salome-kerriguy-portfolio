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

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    const itemsPerSlide = 2.5; // We want to show 2 full items and half of the third one

    function showSlide(index) {
        const totalItems = slides.length;
        if (index >= totalItems / itemsPerSlide) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = Math.ceil(totalItems / itemsPerSlide) - 1;
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * 80; // Adjust offset for showing 2.5 items
        document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', function() {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', function() {
        showSlide(currentIndex + 1);
    });

    showSlide(currentIndex); // Show the first slide initially
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

