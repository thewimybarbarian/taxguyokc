document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Reveal Animation with IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Close mobile menu on clicking a link
    const mobileLinks = document.querySelectorAll('.nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Floating Popup Logic
    const floatingPopup = document.getElementById('floatingPopup');
    const popupClose = document.getElementById('popupClose');

    // Show popup after 3 seconds, or after scrolling down 500px Let's mostly use a timer for that "lead magnet" feel
    if (floatingPopup) {
        // Show after 4 seconds
        setTimeout(() => {
            if (!sessionStorage.getItem('popupClosed')) {
                floatingPopup.classList.add('show');
            }
        }, 4000);

        // Also show if they scroll down past 800px (maybe they scrolled fast)
        window.addEventListener('scroll', () => {
            if (window.scrollY > 800 && !sessionStorage.getItem('popupClosed') && !floatingPopup.classList.contains('show')) {
                floatingPopup.classList.add('show');
            }
        });

        // Close logic
        popupClose.addEventListener('click', () => {
            floatingPopup.classList.remove('show');
            // Prevent showing again in this session
            sessionStorage.setItem('popupClosed', 'true');
        });
    }
});
