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
    initContactForm();
    initTypingEffect();
    initScrollReveal();
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

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            const fill = entry.target;
            if (entry.isIntersecting) {
                fill.style.width = fill.dataset.targetWidth;
                obs.unobserve(fill); // Stop observing after animating once
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
        let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        
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
        const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if (scrollPosition > 400) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    // Smooth scroll back up
    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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
    const percentEl = document.querySelector('.loading-percent');
    if (!preloader) return;

    // Premium loading percentage counter
    let count = 0;
    const duration = 1500; // Match minimum load time
    const intervalTime = 30; 

    const percentInterval = setInterval(() => {
        count += Math.floor(Math.random() * 4) + 1; // Increment randomly for a tech feeling
        if (count >= 100) {
            count = 100;
            clearInterval(percentInterval);
        }
        if (percentEl) {
            percentEl.textContent = `${count.toString().padStart(2, '0')}%`;
        }
    }, intervalTime);

    const minLoadTime = new Promise(resolve => setTimeout(resolve, duration));
    const pageLoaded = new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });

    // Fade out preloader when page finishes loading and loading reaches 100%
    Promise.all([minLoadTime, pageLoaded]).then(() => {
        clearInterval(percentInterval);
        if (percentEl) {
            percentEl.textContent = '100%';
        }
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.classList.remove('loading');
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000); // Wait for transition fade out to complete
        }, 150); // Slight delay for the 100% to sit
    });
}



/* ==========================================================================
   9. CONTACT FORM AJAX SUBMISSION (FormSubmit Integration)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    if (!form || !submitBtn) return;

    form.addEventListener('submit', () => {
        // Show loading state
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        
        // Delay disabling the button slightly to let the browser process the submission
        setTimeout(() => {
            submitBtn.disabled = true;
        }, 10);
    });
}

// Success handler called by the invisible iframe when submission completes
function handleFormSubmitSuccess() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    
    alert('Pesan berhasil terkirim! Terima kasih telah menghubungi saya. (Jika ini pertama kalinya, silakan periksa email masuk/spam Anda untuk mengaktifkan pengiriman dari FormSubmit).');
    
    if (form) form.reset();
    
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';
    }
    
    // Reset submission state
    if (typeof submitted !== 'undefined') {
        submitted = false;
    }
}

/* ==========================================================================
   10. TYPING EFFECT FOR HERO SUBTITLE
   ========================================================================== */
function initTypingEffect() {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    if (!typedTextSpan) return;

    const textArray = [
        "IT Engineer",
        "Network Specialist",
        "QA Services Professional",
        "Systems Infrastructure Specialist"
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    // Clear fallback text immediately to prepare for animation
    typedTextSpan.textContent = "";

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (cursorSpan && !cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            if (cursorSpan) {
                cursorSpan.classList.remove("typing");
            }
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (cursorSpan && !cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            if (cursorSpan) {
                cursorSpan.classList.remove("typing");
            }
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    // Start typing after preloader finishes
    setTimeout(type, 1600);
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length === 0) return;

    const observerOptions = {
        root: null, // viewport
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -40px 0px' // Trigger slightly before it fully scrolls in
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Cyberpunk Decrypt Text animation on section titles and taglines
                if (!entry.target.dataset.decrypted && (entry.target.classList.contains('section-title') || entry.target.classList.contains('section-tagline'))) {
                    decryptTextEffect(entry.target);
                    entry.target.dataset.decrypted = "true";
                }
                
                // Stop observing after animating once for a premium, non-flashing experience
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/* Cyberpunk Decrypt Text Animation Helper */
function decryptTextEffect(element) {
    const originalText = element.dataset.originalText || element.textContent.trim();
    if (!element.dataset.originalText) {
        element.dataset.originalText = originalText;
    }
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+{}|<>?";
    let iterations = 0;
    
    if (element.decryptInterval) {
        clearInterval(element.decryptInterval);
    }
    
    element.decryptInterval = setInterval(() => {
        element.textContent = originalText
            .split("")
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                if (char === " ") return " ";
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
            
        if (iterations >= originalText.length) {
            clearInterval(element.decryptInterval);
            element.textContent = originalText;
        }
        
        // Speed up animation slightly for shorter strings
        iterations += originalText.length > 25 ? 0.75 : 0.45;
    }, 20);
}

