// Ensure the DOM is fully loaded before attaching events
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile menu toggle logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon to X
            const icon = mobileBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu on clicking any navigation link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 3. Intersection Observer for Scroll Animations
    // This allows elements matching specific classes to fade in smoothly as they scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // element becomes visible when 15% is in viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply a delay if data-delay is present
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run the animation only once
            }
        });
    }, observerOptions);

    // Observe all animate-on-scroll elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
