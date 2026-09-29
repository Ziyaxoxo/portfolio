document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Dynamic Year in Footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Scroll Fade-in Animation
    const fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px 50px 0px', threshold: 0.05 });

        // Use rAF to let the browser finish layout before observing
        requestAnimationFrame(() => {
            fadeElements.forEach(el => fadeObserver.observe(el));
        });
    } else {
        // Fallback: just show everything
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // Safety net: if anything is still invisible after 1.5s, force it visible
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 1500);
});
