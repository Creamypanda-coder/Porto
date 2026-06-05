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
    initLanguageSwitcher();
    initAvatarInteraction();
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
        const bar = document.getElementById('preloader-bar');
        if (bar) {
            bar.style.width = `${count}%`;
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

    if (!window.typingTextArray) {
        window.typingTextArray = [
            "IT Engineer",
            "Network Specialist",
            "QA Services Professional",
            "Systems Infrastructure Specialist"
        ];
    }
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    // Clear fallback text immediately to prepare for animation
    typedTextSpan.textContent = "";

    function type() {
        const currentTextArray = window.typingTextArray;
        if (textArrayIndex >= currentTextArray.length) textArrayIndex = 0;
        if (charIndex < currentTextArray[textArrayIndex].length) {
            if (cursorSpan && !cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent += currentTextArray[textArrayIndex].charAt(charIndex);
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
        const currentTextArray = window.typingTextArray;
        if (charIndex > 0) {
            if (cursorSpan && !cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent = currentTextArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            if (cursorSpan) {
                cursorSpan.classList.remove("typing");
            }
            textArrayIndex++;
            if (textArrayIndex >= currentTextArray.length) textArrayIndex = 0;
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

/* ==========================================================================
   11. LANGUAGE SWITCHER (ID/EN)
   ========================================================================== */
function initLanguageSwitcher() {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;

    // Translations Dictionary
    const translations = {
        // Navigation
        '.nav-menu li:nth-child(1) a': { en: 'Home', id: 'Beranda' },
        '.nav-menu li:nth-child(2) a': { en: 'About', id: 'Tentang' },
        '.nav-menu li:nth-child(3) a': { en: 'Skills', id: 'Keahlian' },
        '.nav-menu li:nth-child(4) a': { en: 'Projects', id: 'Proyek' },
        '.nav-menu li:nth-child(5) a': { en: 'Contact', id: 'Kontak' },

        // Hero Section
        '.hero-info .badge': { en: 'IT Engineering, Network, QA Services', id: 'Teknik IT, Jaringan, Layanan QA' },
        '.hero-description': { 
            en: 'I build reliable, scalable, and secure IT infrastructure solutions, combining strong network engineering, quality assurance services, and modern technology practices to ensure high-performance, stable, and efficient systems.', 
            id: 'Saya merancang dan mengelola infrastruktur IT yang tangguh, aman, dan mudah dikembangkan. Dengan menggabungkan keahlian di bidang jaringan, layanan Quality Assurance (QA), serta teknologi modern, saya memastikan sistem Anda berjalan dengan performa maksimal, stabil, dan efisien.' 
        },
        '.hero-ctas .btn-primary': { en: 'View My Work <i class="fa-solid fa-arrow-right"></i>', id: 'Lihat Karya Saya <i class="fa-solid fa-arrow-right"></i>' },
        '.hero-ctas .btn-secondary': { en: 'Contact Me', id: 'Hubungi Saya' },
        '.badge-experience .badge-text': { en: 'Years<br>Experience', id: 'Tahun<br>Pengalaman' },

        // About Section
        '.about-section .section-tagline': { en: 'About Me', id: 'Tentang Saya' },
        '.about-section .section-title': { en: 'About Me', id: 'Tentang Saya' },
        '.about-details .paragraph:nth-of-type(1)': { 
            en: 'I am an <strong>IT Engineer</strong>, <strong>Network Specialist</strong>, and <strong>QA Services Professional</strong> with a deep passion for building reliable, secure, and high-performance IT infrastructure. Armed with experience in network management, system maintenance, troubleshooting, and quality assurance services, I always strive to deliver efficient technology solutions that ensure stability, scalability, and operational excellence.', 
            id: 'Halo! Saya adalah seorang <strong>IT Engineer</strong>, <strong>Spesialis Jaringan</strong>, sekaligus <strong>Profesional di bidang QA (Quality Assurance)</strong> yang sangat antusias dalam membangun infrastruktur IT yang andal, aman, dan punya performa tinggi. Berbekal pengalaman saya di manajemen jaringan, perawatan sistem, hingga pemecahan masalah (*troubleshooting*), saya selalu fokus memberikan solusi teknologi terbaik agar operasional bisnis berjalan stabil dan siap menghadapi perkembangan ke depan.' 
        },
        '.about-details .paragraph:nth-of-type(2)': { 
            en: 'My primary focus lies in managing and optimizing IT infrastructure, network systems, and QA services to ensure secure, stable, and efficient operations. I specialize in network troubleshooting, system monitoring, infrastructure maintenance, and technical support while implementing modern IT solutions that improve performance, reliability, and operational continuity.', 
            id: 'Fokus utama pekerjaan saya ada pada pengelolaan dan optimalisasi infrastruktur IT, jaringan, dan pengujian sistem untuk memastikan semuanya beroperasi dengan aman dan efisien. Saya terbiasa menangani kendala jaringan (*troubleshooting*), memantau kesehatan server, dan memberikan dukungan teknis menyeluruh. Tujuan akhir saya selalu sama: menghadirkan solusi IT modern yang bisa diandalkan kapan pun dibutuhkan.' 
        },
        '#download-cv': { en: 'Download CV <i class="fa-solid fa-download"></i>', id: 'Unduh CV <i class="fa-solid fa-download"></i>' },
        
        '.info-row:nth-child(1) .info-label': { en: '<i class="fa-regular fa-user"></i> Name', id: '<i class="fa-regular fa-user"></i> Nama' },
        '.info-row:nth-child(3) .info-label': { en: '<i class="fa-solid fa-map-pin"></i> Location', id: '<i class="fa-solid fa-map-pin"></i> Lokasi' },
        '.info-row:nth-child(4) .info-label': { en: '<i class="fa-regular fa-calendar-check"></i> Availability', id: '<i class="fa-regular fa-calendar-check"></i> Ketersediaan' },
        '.availability-status': { en: '<span class="pulse-dot"></span> Available for work', id: '<span class="pulse-dot"></span> Tersedia' },

        // Skills Section
        '.skills-section .section-tagline': { en: 'My Skills', id: 'Keahlian Saya' },
        '.skills-section .section-title': { en: 'Technologies I Work With', id: 'Teknologi yang Saya Gunakan' },
        
        '.skills-grid .skill-card:nth-child(1) .skill-name': { en: 'Network Engineering', id: 'Rekayasa Jaringan' },
        '.skills-grid .skill-card:nth-child(1) .skill-category': { en: 'Routing, Switching & Protocols', id: 'Routing, Switching, & Konfigurasi Protokol' },
        '.skills-grid .skill-card:nth-child(2) .skill-name': { en: 'Systems & Servers', id: 'Sistem & Server' },
        '.skills-grid .skill-card:nth-child(2) .skill-category': { en: 'Linux, Windows & VM Management', id: 'Manajemen Server Linux, Windows & Virtual Machine' },
        '.skills-grid .skill-card:nth-child(3) .skill-name': { en: 'Quality Assurance (QA)', id: 'Quality Assurance (QA)' },
        '.skills-grid .skill-card:nth-child(3) .skill-category': { en: 'Manual, Automated & Stability Testing', id: 'Testing Manual, Otomatis, & Uji Stabilitas Sistem' },
        '.skills-grid .skill-card:nth-child(4) .skill-name': { en: 'IT Security & Support', id: 'Keamanan & Dukungan IT' },
        '.skills-grid .skill-card:nth-child(4) .skill-category': { en: 'Firewalls, Diagnostics & Monitoring', id: 'Setup Firewall, Diagnostik, & Monitoring Performa' },

        // Projects Section
        '.projects-section .section-tagline': { en: 'What Can I Do', id: 'Apa Yang Bisa Saya Lakukan' },
        '.projects-section .section-title': { en: 'Services & Capabilities', id: 'Layanan & Kemampuan' },
        '.projects-header .btn-secondary': { en: 'View All Projects', id: 'Lihat Semua Proyek' },
        
        '.projects-grid article:nth-child(1) .project-category': { en: 'Automation', id: 'Otomasi' },
        '.projects-grid article:nth-child(1) .project-title': { en: 'Gate Automation System', id: 'Sistem Pagar Otomatis' },
        '.projects-grid article:nth-child(1) .project-description': { 
            en: 'Implementation of an automatic gate system based on smart drive motors and infrared sensors for efficient residential and commercial access security.', 
            id: 'Sistem pintar untuk otomatisasi pagar menggunakan motor penggerak dan sensor inframerah. Solusi praktis dan aman untuk mempermudah akses masuk ke perumahan maupun area komersial.' 
        },
        
        '.projects-grid article:nth-child(2) .project-category': { en: 'Network Infrastructure', id: 'Infrastruktur Jaringan' },
        '.projects-grid article:nth-child(2) .project-title': { en: 'Server Rack & Switch Deployment', id: 'Penempatan Rak Server & Switch' },
        '.projects-grid article:nth-child(2) .project-description': { 
            en: 'Installation, assembly, and cable management of server racks along with network switch configuration for reliable office network infrastructure.', 
            id: 'Pekerjaan perakitan rak server, instalasi perangkat jaringan, hingga cable management yang rapi. Memastikan konfigurasi switch berjalan optimal untuk jaringan kantor yang stabil dan bebas hambatan.' 
        },
        
        '.projects-grid article:nth-child(3) .project-category': { en: 'Telecommunication', id: 'Telekomunikasi' },
        '.projects-grid article:nth-child(3) .project-title': { en: 'CCTV, Access Point & Fiber Optic Installation', id: 'Instalasi CCTV, Access Point & Fiber Optik' },
        '.projects-grid article:nth-child(3) .project-description': { 
            en: 'Installation of CCTV surveillance cameras, deployment of Wi-Fi Access Points for wide areas, and pulling and splicing of high-speed Fiber Optic cables.', 
            id: 'Pemasangan infrastruktur telekomunikasi menyeluruh, mulai dari kamera CCTV untuk keamanan, instalasi Wi-Fi Access Point agar sinyal merata, hingga penarikan dan penyambungan kabel Fiber Optic untuk koneksi internet super cepat.' 
        },
        
        '.projects-grid article:nth-child(1) .btn-primary': { en: 'Details <i class="fa-solid fa-arrow-up-right-from-square"></i>', id: 'Detail <i class="fa-solid fa-arrow-up-right-from-square"></i>' },
        '.projects-grid article:nth-child(2) .btn-primary': { en: 'Details <i class="fa-solid fa-arrow-up-right-from-square"></i>', id: 'Detail <i class="fa-solid fa-arrow-up-right-from-square"></i>' },
        '.projects-grid article:nth-child(3) .btn-primary': { en: 'Details <i class="fa-solid fa-arrow-up-right-from-square"></i>', id: 'Detail <i class="fa-solid fa-arrow-up-right-from-square"></i>' },
        
        '.projects-grid article:nth-child(1) .project-repo-link': { en: '<i class="fa-brands fa-github"></i> Reference', id: '<i class="fa-brands fa-github"></i> Referensi' },
        '.projects-grid article:nth-child(2) .project-repo-link': { en: '<i class="fa-brands fa-github"></i> Reference', id: '<i class="fa-brands fa-github"></i> Referensi' },
        '.projects-grid article:nth-child(3) .project-repo-link': { en: '<i class="fa-brands fa-github"></i> Reference', id: '<i class="fa-brands fa-github"></i> Referensi' },
        
        '.projects-grid article:nth-child(4) .project-category': { en: 'UI/UX Design', id: 'Desain UI/UX' },
        '.projects-grid article:nth-child(4) .project-title': { en: 'UI/UX Design Services', id: 'Layanan Desain UI/UX' },
        '.projects-grid article:nth-child(4) .project-description': { 
            en: 'Designing modern, user-friendly, and responsive user interfaces (UI) and user experiences (UX) for mobile and web applications with high-fidelity prototypes.', 
            id: 'Merancang antarmuka pengguna (UI) dan pengalaman pengguna (UX) yang modern, ramah pengguna, dan responsif untuk aplikasi mobile dan web dengan prototipe high-fidelity.' 
        },
        '.projects-grid article:nth-child(4) .btn-primary': { en: 'Details <i class="fa-solid fa-arrow-up-right-from-square"></i>', id: 'Detail <i class="fa-solid fa-arrow-up-right-from-square"></i>' },
        '.projects-grid article:nth-child(4) .project-repo-link': { en: '<i class="fa-brands fa-github"></i> Reference', id: '<i class="fa-brands fa-github"></i> Referensi' },

        '.projects-grid article:nth-child(5) .project-category': { en: 'Web Development', id: 'Pengembangan Web' },
        '.projects-grid article:nth-child(5) .project-title': { en: 'Web Development', id: 'Pengembangan Website' },
        '.projects-grid article:nth-child(5) .project-description': { 
            en: 'Building responsive, fast, and interactive websites and web applications using modern web technologies tailored to business requirements.', 
            id: 'Membangun website dan aplikasi web yang responsif, cepat, dan interaktif menggunakan teknologi web modern yang disesuaikan dengan kebutuhan bisnis.' 
        },
        '.projects-grid article:nth-child(5) .btn-primary': { en: 'Details <i class="fa-solid fa-arrow-up-right-from-square"></i>', id: 'Detail <i class="fa-solid fa-arrow-up-right-from-square"></i>' },
        '.projects-grid article:nth-child(5) .project-repo-link': { en: '<i class="fa-brands fa-github"></i> Reference', id: '<i class="fa-brands fa-github"></i> Referensi' },

        '.projects-grid article:nth-child(6) .project-category': { en: 'Android Development', id: 'Pengembangan Android' },
        '.projects-grid article:nth-child(6) .project-title': { en: 'Android App Development', id: 'Pengembangan Aplikasi Android' },
        '.projects-grid article:nth-child(6) .project-description': { 
            en: 'Developing native and cross-platform Android mobile applications with clean UI, smooth animations, and robust backend integrations.', 
            id: 'Mengembangkan aplikasi mobile Android native dan cross-platform dengan UI bersih, animasi mulus, dan integrasi backend yang tangguh.' 
        },
        '.projects-grid article:nth-child(6) .btn-primary': { en: 'Details <i class="fa-solid fa-arrow-up-right-from-square"></i>', id: 'Detail <i class="fa-solid fa-arrow-up-right-from-square"></i>' },
        '.projects-grid article:nth-child(6) .project-repo-link': { en: '<i class="fa-brands fa-github"></i> Reference', id: '<i class="fa-brands fa-github"></i> Referensi' },

        '.projects-grid article:nth-child(7) .project-category': { en: 'Desktop Development', id: 'Pengembangan Desktop' },
        '.projects-grid article:nth-child(7) .project-title': { en: 'Desktop App Development', id: 'Pengembangan Aplikasi Desktop' },
        '.projects-grid article:nth-child(7) .project-description': { 
            en: 'Creating secure, reliable, and high-performance cross-platform desktop applications for Windows, macOS, and Linux.', 
            id: 'Membuat aplikasi desktop lintas platform yang aman, andal, dan berkinerja tinggi untuk Windows, macOS, dan Linux.' 
        },
        '.projects-grid article:nth-child(7) .btn-primary': { en: 'Details <i class="fa-solid fa-arrow-up-right-from-square"></i>', id: 'Detail <i class="fa-solid fa-arrow-up-right-from-square"></i>' },
        '.projects-grid article:nth-child(7) .project-repo-link': { en: '<i class="fa-brands fa-github"></i> Reference', id: '<i class="fa-brands fa-github"></i> Referensi' },

        // Contact Section
        '.contact-section .section-tagline': { en: 'Contact Me', id: 'Hubungi Saya' },
        '.contact-section .section-title': { en: 'Get In Touch', id: 'Mari Terhubung' },
        '.contact-intro': { en: 'Have a project in mind or want to work together? Feel free to send me a message and I\'ll get back to you as soon as possible.', id: 'Ada ide proyek menarik, butuh konsultasi, atau sekadar ingin berkolaborasi? Jangan ragu untuk mengirim pesan! Saya akan merespons secepat mungkin.' },
        
        '.contact-item:nth-child(1) .contact-label': { en: 'Email', id: 'Email' },
        '.contact-item:nth-child(2) .contact-label': { en: 'Phone', id: 'Telepon' },
        '.contact-item:nth-child(3) .contact-label': { en: 'Location', id: 'Lokasi' },
        
        '.contact-form label[for="user-name"]': { en: 'Your Name', id: 'Nama Anda' },
        '.contact-form label[for="user-email"]': { en: 'Your Email', id: 'Email Anda' },
        '.contact-form label[for="form-subject"]': { en: 'Subject', id: 'Subjek' },
        '.contact-form label[for="form-message"]': { en: 'Your Message', id: 'Pesan Anda' },
        
        '#contact-submit-btn': { en: 'Send Message <i class="fa-regular fa-paper-plane"></i>', id: 'Kirim Pesan <i class="fa-regular fa-paper-plane"></i>' },
    };

    const placeholders = {
        '#user-name': { en: 'e.g., Jane Doe', id: 'mis., Budi Santoso' },
        '#user-email': { en: 'e.g., jane@example.com', id: 'mis., budi@example.com' },
        '#form-subject': { en: 'How can I help you?', id: 'Apa yang bisa saya bantu?' },
        '#form-message': { en: 'Type your message here...', id: 'Ketik pesan Anda di sini...' },
    };

    const typingTexts = {
        en: [
            "IT Engineer",
            "Network Specialist",
            "QA Services Professional",
            "Systems Infrastructure Specialist"
        ],
        id: [
            "IT Engineer",
            "Ahli Jaringan Komputer",
            "QA & System Tester",
            "Spesialis Infrastruktur IT"
        ]
    };

    let currentLang = localStorage.getItem('language') || 'en';
    
    function applyLanguage(lang) {
        langToggle.textContent = lang === 'en' ? 'EN' : 'ID';
        document.documentElement.lang = lang; // Update HTML lang attribute
        
        for (const [selector, textMap] of Object.entries(translations)) {
            const el = document.querySelector(selector);
            if (el) {
                if (el.dataset.originalText || el.classList.contains('section-title') || el.classList.contains('section-tagline')) {
                    el.dataset.originalText = textMap[lang];
                    if (el.classList.contains('active')) {
                         el.innerHTML = textMap[lang];
                    }
                } else {
                    el.innerHTML = textMap[lang];
                }
            }
        }
        
        for (const [selector, textMap] of Object.entries(placeholders)) {
            const el = document.querySelector(selector);
            if (el) {
                el.placeholder = textMap[lang];
            }
        }

        window.typingTextArray = typingTexts[lang];
    }

    window.typingTextArray = typingTexts[currentLang];
    applyLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'id' : 'en';
        localStorage.setItem('language', currentLang);
        applyLanguage(currentLang);
    });
}

/* ==========================================================================
   12. AVATAR CLICK INTERACTION
   ========================================================================== */
function initAvatarInteraction() {
    const card = document.getElementById('avatar-card');
    if (!card) return;

    let clickTimeout;

    card.addEventListener('click', () => {
        // Reset classes to restart animation if clicked repeatedly
        card.classList.remove('avatar-click-anim', 'show-popup');
        
        // Force reflow
        void card.offsetWidth; 
        
        // Add animation and show popup
        card.classList.add('avatar-click-anim', 'show-popup');
        
        clearTimeout(clickTimeout);
        
        // Hide popup after 2.5 seconds
        clickTimeout = setTimeout(() => {
            card.classList.remove('show-popup');
        }, 2500);
    });
}

