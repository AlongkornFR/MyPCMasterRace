document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu burger
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('nav ul');

    burger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        burger.classList.toggle('active');
        burger.setAttribute('aria-expanded', navMenu.classList.contains('show'));
    });

    // Fermeture du menu au clic sur un lien
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
        });
    });

    // Fermeture du menu avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
        }
    });

    // Gestion du scroll pour le header
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            header.style.padding = '1rem 5%';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            return;
        }

        // Réduction du header au scroll
        if (currentScroll > 50) {
            header.style.padding = '0.5rem 5%';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll vers le bas
            header.classList.add('scroll-down');
        } else {
            // Scroll vers le haut
            header.classList.remove('scroll-down');
        }
        lastScroll = currentScroll;
    });

    // Animation au scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // On n'anime qu'une seule fois
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}); 