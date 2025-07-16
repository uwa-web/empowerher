document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. NAVIGATION & HEADER --- //
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Highlight active navigation link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { // Adjust offset as needed
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section's ID
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. TESTIMONIALS CAROUSEL --- //
    const slidesContainer = document.querySelector('.slides');
    const allSlides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (slidesContainer && allSlides.length > 0) {
        let currentIndex = 0;

        function goToSlide(index) {
            if (index < 0) index = allSlides.length - 1;
            if (index >= allSlides.length) index = 0;
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    // --- 3. SCROLL-TRIGGERED ANIMATIONS --- //
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing the element once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Animation triggers when 10% of the element is in view
    });

    animatedElements.forEach(el => observer.observe(el));
    
    // --- 4. NEWSLETTER POPUP --- //
    const popup = document.querySelector('.newsletter-popup');
    const overlay = document.querySelector('.popup-overlay');
    const closeBtn = document.querySelector('.popup-close-btn');

    if (popup && overlay && closeBtn) {
        function showPopup() {
            popup.classList.add('show');
            overlay.classList.add('show');
        }

        function closePopup() {
            popup.classList.remove('show');
            overlay.classList.remove('show');
        }

        // Show popup after 10 seconds (10000 milliseconds)
        setTimeout(showPopup, 10000);

        closeBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', closePopup);
    }
    
    // --- 5. SCROLL-TO-TOP BUTTON --- //
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // --- 6. DIRECTORY FILTERING --- //
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const profileCards = document.querySelectorAll('.profile-card');

    if (searchInput && categoryFilter && profileCards.length > 0) {
        function filterDirectory() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;

            profileCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const company = card.querySelector('.company').textContent.toLowerCase();
                const category = card.dataset.category;

                const nameMatch = name.includes(searchTerm) || company.includes(searchTerm);
                const categoryMatch = selectedCategory === 'all' || category === selectedCategory;

                if (nameMatch && categoryMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        searchInput.addEventListener('keyup', filterDirectory);
        categoryFilter.addEventListener('change', filterDirectory);
    }

});