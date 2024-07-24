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

}

// Charger la navbar ? 
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
});



function toggleTheme() {
    document.body.classList.toggle('alternate-theme');
}

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

document.addEventListener('DOMContentLoaded', function () {
    // Vérifier si la page actuelle est la page d'accueil
    if (document.getElementById('home')) {
        // Charger la navbar


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

        // Appeler la fonction pour charger la navigation bar
        loadNavbar();
    }
});
