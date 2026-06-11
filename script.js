/* ==========================================================================
   PORTFOLIO TECHNICAL SYSTEM ENGINE
   Author: Antigravity (Google DeepMind AI)
   Project: Muhamad Tomi Tobuhita Technical Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initThemeSwitcher();
    initMobileNav();
    init3DTilt();
    initScrollSpy();
    initFooterActions();
    initDownloadCV();
    initContactForm();
    initTypingEffect();
    initScrollReveal();
    initLanguageSwitcher();
    initAvatarInteraction();
    runTerminalSimulation();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark/Light Mode)
   ========================================================================== */
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

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

    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        
        if (isLight) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
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

    hamburger.addEventListener('click', () => {
        const isOpen = menuContainer.classList.contains('open');
        hamburger.classList.toggle('open');
        menuContainer.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', !isOpen);
    });

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

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((centerY - y) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
}

/* ==========================================================================
   4. NAVIGATION SCROLL SPY ACTIVE STATE
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
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
   5. FOOTER ACTIONS & BACK-TO-TOP TRIGGER
   ========================================================================== */
function initFooterActions() {
    const topBtn = document.getElementById('scroll-to-top');
    if (!topBtn) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if (scrollPosition > 400) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   6. CV DOWNLOAD LINK (Native Print Dialogue)
   ========================================================================== */
function initDownloadCV() {
    // Keeps functionality intact if triggered from exterior commands
    window.downloadCV = () => {
        window.print();
    };
}

/* ==========================================================================
   7. FUTURISTIC ENGINE PRELOADER
   ========================================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const percentEl = document.querySelector('.loading-percent');
    if (!preloader) return;

    let count = 0;
    const duration = 1200; 
    const intervalTime = 25; 

    const percentInterval = setInterval(() => {
        count += Math.floor(Math.random() * 6) + 2; 
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
            }, 600);
        }, 100);
    });
}

/* ==========================================================================
   8. CONTACT FORM AJAX SUBMISSION
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    if (!form || !submitBtn) return;

    form.addEventListener('submit', () => {
        submitBtn.innerHTML = 'Establishing connection link... <i class="fa-solid fa-spinner fa-spin"></i>';
        setTimeout(() => {
            submitBtn.disabled = true;
        }, 10);
    });
}

function handleFormSubmitSuccess() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    
    alert('Pesan berhasil terkirim! Terima kasih telah menghubungi saya. (Jika ini pertama kalinya, silakan periksa email masuk/spam Anda untuk mengaktifkan pengiriman dari FormSubmit).');
    
    if (form) form.reset();
    
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Link Request <i class="fa-solid fa-paper-plane"></i>';
    }
    
    if (typeof submitted !== 'undefined') {
        submitted = false;
    }
}

/* ==========================================================================
   9. TYPING EFFECT FOR HERO SUBTITLE
   ========================================================================== */
function initTypingEffect() {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    if (!typedTextSpan) return;

    if (!window.typingTextArray) {
        window.typingTextArray = [
            "Technology Ecosystem Architect",
            "Network & Systems Specialist",
            "QA Automation Engineer",
            "Fullstack Systems Developer"
        ];
    }
    const typingDelay = 80;
    const erasingDelay = 40;
    const newTextDelay = 2500; 
    let textArrayIndex = 0;
    let charIndex = 0;

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
            setTimeout(type, typingDelay + 300);
        }
    }

    setTimeout(type, 1400);
}

/* ==========================================================================
   10. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('section');
    if (revealElements.length === 0) return;

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   11. LIVE TERMINAL LOGS SIMULATOR
   ========================================================================== */
function runTerminalSimulation() {
    const consoleLogs = document.getElementById('hero-console-logs');
    if (!consoleLogs) return;
    
    consoleLogs.innerHTML = '';
    
    const logs = [
        { type: 'cmd', text: 'ping -c 3 UDM_PRO_MAX' },
        { type: 'out', text: 'PING 192.168.0.1 (192.168.0.1): 56 data bytes' },
        { type: 'out', text: '64 bytes from 192.168.0.1: icmp_seq=0 ttl=64 time=1.02 ms' },
        { type: 'out', text: '64 bytes from 192.168.0.1: icmp_seq=1 ttl=64 time=0.98 ms' },
        { type: 'out', text: '64 bytes from 192.168.0.1: icmp_seq=2 ttl=64 time=1.14 ms' },
        { type: 'out', text: '--- 192.168.0.1 ping statistics ---' },
        { type: 'out', text: '3 packets transmitted, 3 packets received, 0.0% packet loss' },
        { type: 'cmd', text: 'ssh root@10.139.9.5 "docker ps --format \'table {{.Names}}\t{{.Status}}\'"' },
        { type: 'out', text: 'NAMES                     STATUS' },
        { type: 'out', text: 'toms-3d-generator-api     Up 14 days' },
        { type: 'out', text: 'gate-automation-service   Up 42 days' },
        { type: 'out', text: 'nginx-reverse-proxy       Up 14 days' },
        { type: 'cmd', text: 'pytest -v tests/integration/' },
        { type: 'out', text: 'test_vlan_isolation.py::test_subnet_security PASSED' },
        { type: 'out', text: 'test_gate_controller.py::test_emergency_halt PASSED' },
        { type: 'out', text: 'test_api_endpoints.py::test_glb_generator_response PASSED' },
        { type: 'out', text: '================ 3 passed in 1.48s ================' },
        { type: 'cmd', text: 'show route static' },
        { type: 'out', text: 'Destination      Gateway          Interface' },
        { type: 'out', text: '10.139.1.0/24    10.139.1.2       Cisco CE MPLS' },
        { type: 'out', text: '172.15.50.0/24   192.168.0.1      VLAN 50' },
        { type: 'cmd', text: 'clear' }
    ];
    
    let index = 0;
    
    function printNextLog() {
        if (index >= logs.length) {
            consoleLogs.innerHTML = '';
            index = 0;
        }
        
        const log = logs[index];
        const row = document.createElement('div');
        row.className = 'console-log-row';
        
        if (log.type === 'cmd') {
            row.innerHTML = `<span class="console-prompt">$</span> <span class="typing-cmd"></span>`;
            consoleLogs.appendChild(row);
            const cmdSpan = row.querySelector('.typing-cmd');
            let charIndex = 0;
            
            function typeCmd() {
                if (charIndex < log.text.length) {
                    cmdSpan.textContent += log.text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeCmd, 35);
                } else {
                    index++;
                    consoleLogs.scrollTop = consoleLogs.scrollHeight;
                    setTimeout(printNextLog, 600);
                }
            }
            typeCmd();
        } else {
            row.className = 'console-log-row console-output';
            row.textContent = log.text;
            consoleLogs.appendChild(row);
            index++;
            consoleLogs.scrollTop = consoleLogs.scrollHeight;
            setTimeout(printNextLog, 250);
        }
    }
    
    printNextLog();
}

/* ==========================================================================
   12. LANGUAGE SWITCHER (ID/EN)
   ========================================================================== */
function initLanguageSwitcher() {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;

    const translations = {
        // Navigation Links
        '.nav-menu li:nth-child(1) a': { en: 'Home', id: 'Beranda' },
        '.nav-menu li:nth-child(2) a': { en: 'Infrastructure', id: 'Infrastruktur' },
        '.nav-menu li:nth-child(3) a': { en: 'Development', id: 'Pengembangan' },
        '.nav-menu li:nth-child(4) a': { en: 'Quality Assurance', id: 'Jaminan Kualitas' },
        '.nav-menu li:nth-child(5) a': { en: 'Topology Map', id: 'Peta Topologi' },
        '.nav-menu li:nth-child(6) a': { en: 'Components', id: 'Komponen' },
        '.nav-menu li:nth-child(7) a': { en: 'Experience', id: 'Pengalaman' },
        '.nav-menu li:nth-child(8) a': { en: 'Contact', id: 'Kontak' },

        // Hero Section
        '.hero-description': { 
            en: 'This engineer designs, builds, secures, tests, deploys, and maintains complete technology systems. Overbridging networking architecture, virtualization infrastructure, multi-platform logic systems, and diagnostic QA verification pipelines.', 
            id: 'Insinyur ini merancang, membangun, mengamankan, menguji, menyebarkan, dan memelihara sistem teknologi yang lengkap. Menjembatani arsitektur jaringan, infrastruktur virtualisasi, sistem logika multi-platform, dan pipa verifikasi QA diagnostik.' 
        },
        '.hero-ctas .btn-primary': { en: 'Ecosystem Map <i class="fa-solid fa-network-wired"></i>', id: 'Peta Ekosistem <i class="fa-solid fa-network-wired"></i>' },
        '.hero-ctas .btn-secondary': { en: 'Initialize Link', id: 'Mulai Koneksi' },

        // Section Taglines & Titles
        '#infrastructure .section-tagline': { en: 'Layer 01 // System Stability', id: 'Lapisan 01 // Stabilitas Sistem' },
        '#infrastructure .section-title': { en: 'Infrastructure & Network', id: 'Infrastruktur & Jaringan' },
        '#development .section-tagline': { en: 'Layer 02 // Logic & Services', id: 'Lapisan 02 // Logika & Layanan' },
        '#development .section-title': { en: 'Software Development', id: 'Pengembangan Perangkat Lunak' },
        '#qa .section-tagline': { en: 'Layer 03 // Integrity & Verification', id: 'Lapisan 03 // Integritas & Verifikasi' },
        '#qa .section-title': { en: 'Quality Assurance', id: 'Jaminan Kualitas (QA)' },
        '#tech-map .section-tagline': { en: 'Ecosystem Map // Technical Catalog', id: 'Peta Ekosistem // Katalog Teknis' },
        '#tech-map .section-title': { en: 'Ecosystem Stack Topology', id: 'Topologi Tumpukan Ekosistem' },
        '#projects .section-tagline': { en: 'Services & Deliverables // Recent Components', id: 'Layanan & Hasil Kerja // Komponen Terbaru' },
        '#projects .section-title': { en: 'Ecosystem Components', id: 'Komponen Ekosistem' },
        '#experience .section-tagline': { en: 'Deploy History // Engineering Timeline', id: 'Riwayat Riil // Garis Waktu Rekayasa' },
        '#experience .section-title': { en: 'Professional Experience', id: 'Pengalaman Profesional' },
        '#contact .section-tagline': { en: 'Transmission Interface // Contact', id: 'Antarmuka Transmisi // Kontak' },
        '#contact .section-title': { en: 'Initialize Link', id: 'Inisialisasi Hubungan' },

        // Infrastructure specs
        '#infrastructure .spec-item:nth-child(1) .spec-label': { en: 'GATEWAY / ROUTER INTEGRATION', id: 'INTEGRASI GATEWAY / ROUTER' },
        '#infrastructure .spec-item:nth-child(1) .spec-value': { en: 'UDM Pro Max (UniFi Gateway) & MikroTik (RB1100x4) network environments.', id: 'Lingkungan jaringan UDM Pro Max (UniFi Gateway) & MikroTik (RB1100x4).' },
        '#infrastructure .spec-item:nth-child(2) .spec-label': { en: 'SWITCHING INFRASTRUCTURE', id: 'INFRASTRUKTUR SWITCHING' },
        '#infrastructure .spec-item:nth-child(2) .spec-value': { en: 'USW Pro Max 24 PoE principal uplink setup via 10 GbE SFP+ optical fiber trunks.', id: 'Setup switch utama USW Pro Max 24 PoE via link fiber optik trunk 10 GbE SFP+.' },
        '#infrastructure .spec-item:nth-child(3) .spec-label': { en: 'WAN / MPLS ROUTING CONFIGURATION', id: 'KONFIGURASI ROUTING WAN / MPLS' },
        '#infrastructure .spec-item:nth-child(3) .spec-value': { en: 'Cisco CE WAN integration via static routing table entries mapped in complex gateways.', id: 'Integrasi Cisco CE WAN melalui tabel rute statis yang dipetakan pada gateway.' },
        '#infrastructure .spec-item:nth-child(4) .spec-label': { en: 'TELECOMMUNICATIONS & CABLING', id: 'TELEKOMUNIKASI & KABELING' },
        '#infrastructure .spec-item:nth-child(4) .spec-value': { en: 'High-speed Fiber Optic (FTTH) splicing, IP CCTV surveillance matrix, and field wireless APs (U7 Pro XG, Altai).', id: 'Splicing Serat Optik kecepatan tinggi (FTTH), matriks pengawasan IP CCTV, dan AP nirkabel lapangan (U7 Pro XG, Altai).' },

        // Development specs
        '#development .spec-item:nth-child(1) .spec-label': { en: 'SYSTEM AUTOMATION & HARDWARE CONTROLLERS', id: 'OTOMASI SISTEM & PENGENDALI PERANGKAT KERAS' },
        '#development .spec-item:nth-child(1) .spec-value': { en: 'Integration of smart drive gate controllers, infrared safety telemetry, and automated access relays.', id: 'Integrasi kontroler pintu pagar pintar, telemetri sensor keselamatan inframerah, dan relai akses otomatis.' },
        '#development .spec-item:nth-child(2) .spec-label': { en: 'BACKEND APIS & SERVICES', id: 'BACKEND API & LAYANAN SERVER' },
        '#development .spec-item:nth-child(2) .spec-value': { en: 'Node.js environments, Python processing engines, and C#/.NET system utilities for platform databases.', id: 'Lingkungan Node.js, pemrosesan Python, dan utilitas sistem C#/.NET untuk database platform.' },
        '#development .spec-item:nth-child(3) .spec-label': { en: 'FRONTEND SYSTEMS', id: 'SISTEM ANTARMUKA DEPAN (FRONTEND)' },
        '#development .spec-item:nth-child(3) .spec-value': { en: 'Modern Next.js web applications, fast interactive client layouts utilizing HTML5, CSS3, and ES6 JavaScript.', id: 'Aplikasi web Next.js modern, tata letak interaktif cepat menggunakan HTML5, CSS3, dan JavaScript ES6.' },
        '#development .spec-item:nth-child(4) .spec-label': { en: 'CROSS-PLATFORM LOGIC', id: 'LOGIKA LINTAS PLATFORM' },
        '#development .spec-item:nth-child(4) .spec-value': { en: 'Native Android applications (Kotlin/Java) and cross-platform desktop shells (Electron/Tauri) for system diagnostics.', id: 'Aplikasi Android native (Kotlin/Java) dan aplikasi desktop lintas platform (Electron/Tauri) untuk diagnosa sistem.' },

        // QA specs
        '#qa .spec-item:nth-child(1) .spec-label': { en: 'MANUAL DIAGNOSTICS & FIELD CHECKS', id: 'DIAGNOSTIK MANUAL & CEK LAPANGAN' },
        '#qa .spec-item:nth-child(1) .spec-value': { en: 'Physical fiber splicing testing (OTDR calibration), Wi-Fi heatmapping for field AP deployments, and core network port audits.', id: 'Pengujian splicing fiber fisik (kalibrasi OTDR), pemetaan sinyal Wi-Fi untuk penempatan AP lapangan, dan audit port jaringan utama.' },
        '#qa .spec-item:nth-child(2) .spec-label': { en: 'AUTOMATED VERIFICATION', id: 'VERIFIKASI OTOMATIS' },
        '#qa .spec-item:nth-child(2) .spec-value': { en: 'Scripted system diagnostics checking endpoint latency, server connectivity metrics, and automatic API status verification.', id: 'Diagnostik sistem terprogram yang memeriksa latensi endpoint, metrik koneksi server, dan verifikasi status API otomatis.' },
        '#qa .spec-item:nth-child(3) .spec-label': { en: 'HARDWARE CONTROLLER QA', id: 'JAMINAN KUALITAS (QA) KONTROLER PERANGKAT KERAS' },
        '#qa .spec-item:nth-child(3) .spec-value': { en: 'Calibration testing of infrared safety sensors, emergency halt motor logic checks, and wireless remote link stability testing.', id: 'Uji kalibrasi sensor keselamatan inframerah, pemeriksaan logika motor penghenti darurat, dan uji stabilitas link nirkabel remote.' },

        // Stack map columns
        '.tech-map-column:nth-child(2) .tech-map-column-title': { en: '1. Edge & Routing', id: '1. Batas & Routing' },
        '.tech-map-column:nth-child(3) .tech-map-column-title': { en: '2. LAN & Splicing', id: '2. LAN & Splicing' },
        '.tech-map-column:nth-child(4) .tech-map-column-title': { en: '3. Servers & Services', id: '3. Server & Layanan' },
        '.tech-map-column:nth-child(5) .tech-map-column-title': { en: '4. Logic & APIs', id: '4. Logika & API' },
        '.tech-map-column:nth-child(6) .tech-map-column-title': { en: '5. App Delivery', id: '5. Pengiriman Aplikasi' },
        '.tech-map-column:nth-child(7) .tech-map-column-title': { en: '6. Integrity Assurance', id: '6. Jaminan Integritas' },

        // Projects Translates
        '.projects-grid article:nth-child(1) .project-tag': { en: 'Automation', id: 'Otomasi' },
        '.projects-grid article:nth-child(1) .project-title': { en: 'Gate Automation System', id: 'Sistem Pagar Otomatis' },
        '.projects-grid article:nth-child(1) .project-description': { 
            en: 'Implementation of an automatic gate system based on smart drive motors and infrared sensors for efficient residential and commercial access security.', 
            id: 'Implementasi sistem pagar otomatis berbasis motor penggerak pintar dan sensor inframerah untuk keamanan akses masuk hunian dan area komersial secara efisien.' 
        },
        '.projects-grid article:nth-child(2) .project-tag': { en: 'Network Infrastructure', id: 'Infrastruktur Jaringan' },
        '.projects-grid article:nth-child(2) .project-title': { en: 'Server Rack & Switch Deployment', id: 'Pemasangan Rak Server & Switch' },
        '.projects-grid article:nth-child(2) .project-description': { 
            en: 'Installation, assembly, and cable management of server racks along with network switch configuration for reliable office network infrastructure.', 
            id: 'Pemasangan, perakitan, dan penataan manajemen kabel (cable management) rak server beserta konfigurasi network switch untuk infrastruktur jaringan kantor yang andal.' 
        },
        '.projects-grid article:nth-child(3) .project-tag': { en: 'Telecommunication', id: 'Telekomunikasi' },
        '.projects-grid article:nth-child(3) .project-title': { en: 'CCTV, Access Point & Fiber Optic Installation', id: 'Instalasi CCTV, Access Point & Fiber Optik' },
        '.projects-grid article:nth-child(3) .project-description': { 
            en: 'Installation of CCTV surveillance cameras, deployment of Wi-Fi Access Points for wide areas, and pulling and splicing of high-speed Fiber Optic cables.', 
            id: 'Instalasi kamera pengawas CCTV, pemasangan Wi-Fi Access Point untuk area luas, dan penarikan serta splicing kabel serat optik (Fiber Optic) berkecepatan tinggi.' 
        },
        '.projects-grid article:nth-child(4) .project-tag': { en: 'UI/UX Design', id: 'Desain UI/UX' },
        '.projects-grid article:nth-child(4) .project-title': { en: 'UI/UX Design Services', id: 'Layanan Desain UI/UX' },
        '.projects-grid article:nth-child(4) .project-description': { 
            en: 'Designing modern, user-friendly, and responsive user interfaces (UI) and user experiences (UX) for mobile and web applications with high-fidelity prototypes.', 
            id: 'Merancang antarmuka pengguna (UI) dan pengalaman pengguna (UX) yang modern, ramah pengguna, dan responsif untuk aplikasi mobile dan web dengan prototipe high-fidelity.' 
        },
        '.projects-grid article:nth-child(5) .project-tag': { en: 'Web Development', id: 'Pengembangan Web' },
        '.projects-grid article:nth-child(5) .project-title': { en: 'Web Development', id: 'Pengembangan Website' },
        '.projects-grid article:nth-child(5) .project-description': { 
            en: 'Building responsive, fast, and interactive websites and web applications using modern web technologies tailored to business requirements.', 
            id: 'Membangun website dan aplikasi web yang responsif, cepat, dan interaktif menggunakan teknologi web modern yang disesuaikan dengan kebutuhan bisnis.' 
        },
        '.projects-grid article:nth-child(6) .project-tag': { en: 'Android Development', id: 'Pengembangan Android' },
        '.projects-grid article:nth-child(6) .project-title': { en: 'Android App Development', id: 'Pengembangan Aplikasi Android' },
        '.projects-grid article:nth-child(6) .project-description': { 
            en: 'Developing native and cross-platform Android mobile applications with clean UI, smooth animations, and robust backend integrations.', 
            id: 'Mengembangkan aplikasi mobile Android native dan cross-platform dengan UI bersih, animasi mulus, dan integrasi backend yang tangguh.' 
        },
        '.projects-grid article:nth-child(7) .project-tag': { en: 'Desktop Development', id: 'Pengembangan Desktop' },
        '.projects-grid article:nth-child(7) .project-title': { en: 'Desktop App Development', id: 'Pengembangan Aplikasi Desktop' },
        '.projects-grid article:nth-child(7) .project-description': { 
            en: 'Creating secure, reliable, and high-performance cross-platform desktop applications for Windows, macOS, and Linux.', 
            id: 'Membuat aplikasi desktop lintas platform yang aman, andal, dan berkinerja tinggi untuk Windows, macOS, dan Linux.' 
        },
        '.projects-grid article:nth-child(8) .project-tag': { en: 'Web Application', id: 'Aplikasi Web' },
        '.projects-grid article:nth-child(8) .project-title': { en: 'Toms 3D Generator', id: 'Toms 3D Generator' },
        '.projects-grid article:nth-child(8) .project-description': { 
            en: 'AI-powered web application that reconstructs 2D images into interactive 3D GLB models under 30 seconds with local-first client processing.', 
            id: 'Web AI generator yang dapat mengubah gambar 2D menjadi model 3D (format GLB) dalam waktu singkat secara privat dan interaktif.' 
        },

        // Experience Timeline
        '.experience-timeline .timeline-item:nth-child(1) .timeline-role': { en: 'Senior Technology Engineer & Network Specialist', id: 'Insinyur Teknologi Senior & Spesialis Jaringan' },
        '.experience-timeline .timeline-item:nth-child(1) .timeline-company': { en: 'Freelance Services / Independent Deployments', id: 'Layanan Mandiri / Proyek Lapangan' },
        '.experience-timeline .timeline-item:nth-child(1) .timeline-body p': { 
            en: 'Specializing in full-scope technology architecture, building robust hardware setups and network structures connected with backend and client layers.', 
            id: 'Spesialisasi dalam arsitektur teknologi lingkup penuh, membangun infrastruktur perangkat keras dan jaringan yang terhubung ke backend dan frontend.' 
        },
        '.experience-timeline .timeline-item:nth-child(2) .timeline-role': { en: 'Systems Deployment & QA Specialist', id: 'Penyebaran Jaringan & Spesialis QA' },
        '.experience-timeline .timeline-item:nth-child(2) .timeline-company': { en: 'Local Infrastructures & Technology Integrators', id: 'Infrastruktur Lokal & Integrator Teknologi' },
        '.experience-timeline .timeline-item:nth-child(2) .timeline-body p': { 
            en: 'Managed technical operations, network stability mapping, hardware cabling, and quality diagnostics across diverse sites.', 
            id: 'Mengelola operasional teknis, pemetaan stabilitas jaringan, pengkabelan perangkat keras, dan diagnosa kualitas di berbagai situs lokal.' 
        },

        // Contact Section & Form
        '.contact-intro': { 
            en: 'To initiate connection, submit details in the terminal interface, or reach out directly via established communication paths.', 
            id: 'Untuk memulai koneksi, kirim rincian di antarmuka terminal, atau hubungi langsung lewat jalur komunikasi yang telah terjalin.' 
        },
        '.contact-form label[for="user-name"]': { en: 'Your Name', id: 'Nama Anda' },
        '.contact-form label[for="user-email"]': { en: 'Your Email', id: 'Email Anda' },
        '.contact-form label[for="form-subject"]': { en: 'Subject', id: 'Subjek' },
        '.contact-form label[for="form-message"]': { en: 'Your Message', id: 'Pesan Anda' },
        '#contact-submit-btn': { en: 'Send Link Request <i class="fa-solid fa-paper-plane"></i>', id: 'Kirim Permintaan Hubungan <i class="fa-solid fa-paper-plane"></i>' },
    };

    const placeholders = {
        '#user-name': { en: 'e.g., Jane Doe', id: 'mis., Budi Santoso' },
        '#user-email': { en: 'e.g., jane@example.com', id: 'mis., budi@example.com' },
        '#form-subject': { en: 'How can I help you?', id: 'Apa yang bisa saya bantu?' },
        '#form-message': { en: 'Type your message here...', id: 'Ketik pesan Anda di sini...' },
    };

    const typingTexts = {
        en: [
            "Technology Ecosystem Architect",
            "Network & Systems Specialist",
            "QA Automation Engineer",
            "Fullstack Systems Developer"
        ],
        id: [
            "Arsitek Ekosistem Teknologi",
            "Spesialis Jaringan & Sistem",
            "Insinyur QA Otomatisasi",
            "Pengembang Sistem Fullstack"
        ]
    };

    let currentLang = localStorage.getItem('language') || 'en';
    
    function applyLanguage(lang) {
        langToggle.textContent = lang === 'en' ? 'EN' : 'ID';
        document.documentElement.lang = lang;
        
        for (const [selector, textMap] of Object.entries(translations)) {
            const el = document.querySelector(selector);
            if (el) {
                el.innerHTML = textMap[lang];
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
   13. AVATAR CLICK INTERACTION
   ========================================================================== */
function initAvatarInteraction() {
    const card = document.getElementById('avatar-card');
    if (!card) return;

    card.addEventListener('click', () => {
        // Subtle scan glow effect on click
        card.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.4)';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 1000);
    });
}
