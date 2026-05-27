/* ==========================================================================
   PORTFOLIO ENGINE
   Author: Antigravity (Google DeepMind AI)
   Project: Muhamad Tomi Tobuhita Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initThemeSwitcher();
    initMobileNav();
    init3DTilt();
    initSkillsScrollReveal();
    initScrollSpy();
    initFooterActions();
    initDownloadCV();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark/Light Mode)
   ========================================================================== */
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference, otherwise default to dark-theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    // Toggle theme click listener
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        
        if (isLight) {
            // Switch to dark theme
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light theme
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

/* ==========================================================================
   2. MOBILE NAVIGATION HAMBURGER MENU
   ========================================================================== */
function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const menuContainer = document.querySelector('.nav-links-container');
    const links = document.querySelectorAll('.nav-link');

    if (!hamburger || !menuContainer) return;

    // Toggle Hamburger click
    hamburger.addEventListener('click', () => {
        const isOpen = menuContainer.classList.contains('open');
        hamburger.classList.toggle('open');
        menuContainer.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when clicking link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            menuContainer.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ==========================================================================
   3. INTERACTIVE 3D TILT EFFECT ON AVATAR CARD
   ========================================================================== */
function init3DTilt() {
    const card = document.getElementById('avatar-card');
    if (!card) return;

    // Listen to mouse movement inside the card
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Calculate coordinates relative to the card's width/height
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Convert to rotate degree ratios (Max rotation angle = 12 degrees)
        const rotateX = ((centerY - y) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;

        // Apply transformations dynamically
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    // Reset card transforms when the mouse leaves the area
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; // Remove transitions for live mouse tracking
    });
}

/* ==========================================================================
   4. SKILLS PROGRESS METER INTRO ANIMATION (Scroll Reveal)
   ========================================================================== */
function initSkillsScrollReveal() {
    const fills = document.querySelectorAll('.progress-bar-fill');
    
    // Save target percentage in a data attribute and set current width to 0
    fills.forEach(fill => {
        const targetPercent = fill.style.width;
        fill.style.width = '0%';
        fill.dataset.targetWidth = targetPercent;
    });

    const options = {
        root: null, // Viewport
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                fill.style.width = fill.dataset.targetWidth;
                observer.unobserve(fill); // Run only once
            }
        });
    }, options);

    fills.forEach(fill => observer.observe(fill));
}

/* ==========================================================================
   5. NAVIGATION SCROLL SPY ACTIVE STATE
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Nav padding offset
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    });
}

/* ==========================================================================
   6. FOOTER ACTIONS & BACK-TO-TOP TRIGGER
   ========================================================================== */
function initFooterActions() {
    const topBtn = document.getElementById('scroll-to-top');
    if (!topBtn) return;

    // Show button when scrolled past 400px
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            topBtn.style.opacity = '1';
            topBtn.style.pointerEvents = 'auto';
            topBtn.style.transform = 'translateY(0)';
        } else {
            topBtn.style.opacity = '0';
            topBtn.style.pointerEvents = 'none';
            topBtn.style.transform = 'translateY(10px)';
        }
    });

    // Smooth scroll back up
    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Set initial state
    topBtn.style.opacity = '0';
    topBtn.style.pointerEvents = 'none';
    topBtn.style.transition = 'all 0.3s ease';
}

/* ==========================================================================
   7. CV DOWNLOAD LINK (Native Print Dialogue)
   ========================================================================== */
function initDownloadCV() {
    const downloadBtn = document.getElementById('download-cv');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', () => {
        window.print();
    });
}

/* ==========================================================================
   8. FUTURISTIC CYBERPUNK PRELOADER & LOTTIE INTEGRATION
   ========================================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const lottieContainer = document.getElementById('lottie-loader');
    const fallbackSpinner = document.getElementById('fallback-spinner');

    if (!preloader) return;

    // Load Lottie Animation
    let lottieAnim = null;
    try {
        if (typeof lottie !== 'undefined') {
            lottieAnim = lottie.loadAnimation({
                container: lottieContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://assets5.lottiefiles.com/packages/lf20_t9gk18fn.json' // Futuristic tech circle loader
            });

            // Once Lottie successfully loads, hide the fallback CSS spinner smoothly
            lottieAnim.addEventListener('DOMLoaded', () => {
                if (fallbackSpinner) {
                    fallbackSpinner.style.transition = 'opacity 0.5s ease';
                    fallbackSpinner.style.opacity = '0';
                    setTimeout(() => {
                        fallbackSpinner.style.display = 'none';
                    }, 500);
                }
            });
        }
    } catch (error) {
        console.warn("Lottie loading failed. Using premium CSS loader fallback.", error);
    }

    // Guarantee the user sees the elegant animation for at least 1.5s, then wait for page load to finish
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
    const pageLoaded = new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });

    // Fade out preloader when both conditions are met
    Promise.all([minLoadTime, pageLoaded]).then(() => {
        // Fade out the preloader overlay
        preloader.classList.add('fade-out');
        document.body.classList.remove('loading');

        // Clean up animation after fade out to save memory
        setTimeout(() => {
            preloader.style.display = 'none';
            if (lottieAnim) {
                lottieAnim.destroy();
            }
        }, 1200); // Matches the 1.2s CSS transition time
    });
}
