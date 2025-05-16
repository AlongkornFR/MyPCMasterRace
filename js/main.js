document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu burger
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('nav ul');

    burger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        burger.setAttribute('aria-expanded', navMenu.classList.contains('show'));
    });

    // Fermeture du menu au clic sur un lien
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            burger.setAttribute('aria-expanded', 'false');
        });
    });

    // Fermeture du menu avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
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
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll vers le bas
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll vers le haut
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}); 