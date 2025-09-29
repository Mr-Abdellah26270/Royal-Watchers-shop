document.addEventListener('DOMContentLoaded', () => {
    const themeToggler = document.getElementById('theme-toggler');
    const langSwitcher = document.getElementById('lang-switcher');
    const htmlEl = document.documentElement;

    // --- Theme Switcher ---
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggler.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
            themeToggler.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggler.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    });

    // --- Language Switcher ---
    let currentLang = localStorage.getItem('lang') || 'ar';

    const setLanguage = (lang) => {
        htmlEl.setAttribute('lang', lang);
        htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        if (lang === 'ar') {
            langSwitcher.querySelector('span').textContent = 'English';
        } else {
            langSwitcher.querySelector('span').textContent = 'العربية';
        }

        localStorage.setItem('lang', lang);
        currentLang = lang;
    };

    langSwitcher.addEventListener('click', () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    });

    // Set initial language on load
    setLanguage(currentLang);

    // --- Product Gallery ---
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                mainImage.src = thumbnail.src.replace('150x150', '600x600');
                document.querySelector('.thumbnail.active').classList.remove('active');
                thumbnail.classList.add('active');
            });
        });
    }

    // --- Scroll Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) { // 100px buffer
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});