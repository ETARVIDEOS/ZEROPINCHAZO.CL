document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scrolled State
    const header = document.getElementById('main-header');
    const toggleHeaderBackground = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', toggleHeaderBackground);
    toggleHeaderBackground(); // initial check

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Typing Effect
    const typingContainer = document.getElementById('typing-text');
    if (typingContainer) {
        const text = "Soluciones Integrales en Vulcanización Móvil y Auxilio de Baterías en Terreno.";
        let index = 0;
        
        const typeText = () => {
            if (index < text.length) {
                typingContainer.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 70); // typing speed
            }
        };
        setTimeout(typeText, 800); // initial delay
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Number Counter Animation
    const statNumbers = document.querySelectorAll('.stat-num');
    let counted = false;

    const countObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counted) {
            counted = true;
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-count');
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.glass-stats');
    if (statsContainer) countObserver.observe(statsContainer);

    // 6. Dynamic Gallery Loading (Masonry Layout + Load More)
    const galleryContainer = document.getElementById('gallery-container');
    const loadMoreBtn = document.getElementById('btn-load-more');
    if (galleryContainer) {
        // Ordered array: Industrial first, regular in middle, alcantarillas at the end.
        const allGalleryImages = [
            'Gemini_Generated_Image_1zmmt11zmmt11zmm.jpg',
            'Gemini_Generated_Image_4m6q9y4m6q9y4m6q.jpg',
            'Gemini_Generated_Image_7i764r7i764r7i76.jpg',
            'Gemini_Generated_Image_bp5klcbp5klcbp5k.jpg',
            'Gemini_Generated_Image_e9berne9berne9be.jpg',
            'Gemini_Generated_Image_psdvo2psdvo2psdv.jpg'
        ];
        
        let itemsLoaded = 0;
        const itemsPerLoad = 6;

        const loadImages = () => {
            const nextBatch = allGalleryImages.slice(itemsLoaded, itemsLoaded + itemsPerLoad);
            nextBatch.forEach((imgName, idx) => {
                const delay = (idx % 3) * 0.1;
                const div = document.createElement('div');
                div.className = 'gallery-item reveal-up';
                div.style.transitionDelay = `${delay}s`;
                
                div.innerHTML = `
                    <img src="./assets/proyectos/${imgName}" alt="Trabajo ZeroPinchazo ${itemsLoaded + idx + 1}" class="gallery-img" loading="lazy">
                    <div class="gallery-overlay">
                        <h4 class="text-white font-bold">Asistencia vehicular en terreno</h4>
                    </div>
                `;
                galleryContainer.appendChild(div);
                
                // Allow DOM to update before observing
                setTimeout(() => {
                    revealObserver.observe(div);
                    div.classList.add('is-revealed'); // Force reveal if already in view
                }, 100);
            });
            
            itemsLoaded += nextBatch.length;
            
            if (itemsLoaded >= allGalleryImages.length && loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        };

        // Initial load
        loadImages();

        // Load more on click
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadImages);
        }
    }

    // 7. Marquee Infinite Scroll Clone
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        const clone = marqueeTrack.cloneNode(true);
        marqueeTrack.parentElement.appendChild(clone);
    }

    // 8. FAQ Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            accordionItems.forEach(acc => acc.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
