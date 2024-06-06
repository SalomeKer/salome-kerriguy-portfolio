document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const mobileLinks = document.querySelector('.mobile-links');
    let lastScrollTop = 0;

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
                // Fait défiler en douceur jusqu'à l'ancre avec une durée d'animation plus longue pour un défilement plus lent
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start', // ou 'center' pour centrer l'élément dans la vue
                    inline: 'nearest', // ou 'start' ou 'end' pour aligner l'élément par rapport au bord
                    duration: 10000 // Durée de l'animation en millisecondes (3 secondes dans cet exemple)
                });
            }
        });
    });
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

