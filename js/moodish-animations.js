// Moodish - Luxury Animations & Interactions

document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe video wrapper for fade-in animation
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        observer.observe(videoWrapper);
    }

    // Side navigation visibility based on hero section scroll
    const sideNav = document.querySelector('.side-nav');
    const heroSection = document.querySelector('.hero');
    
    if (sideNav && heroSection) {
        // Initially hide the navigation
        sideNav.style.opacity = '0';
        sideNav.style.visibility = 'hidden';
        sideNav.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero is visible - hide navigation
                    sideNav.style.opacity = '0';
                    sideNav.style.visibility = 'hidden';
                } else {
                    // Hero is not visible - show navigation
                    sideNav.style.opacity = '1';
                    sideNav.style.visibility = 'visible';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px 0px 0px'
        });
        
        heroObserver.observe(heroSection);
    }

    // Smooth number counting animation for stats
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format numbers appropriately
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.includes('min')) {
                element.textContent = Math.floor(current) + ' min';
            } else if (element.textContent.includes('$')) {
                element.textContent = '$' + current.toFixed(2);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Animate numbers when they come into view
    const numberElements = document.querySelectorAll('.stat-number, .metric-value, .counter-number');
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;

                // Extract number from text
                let targetNumber;
                if (text.includes('8-10')) {
                    entry.target.textContent = '0-0';
                    setTimeout(() => {
                        entry.target.textContent = '8-10';
                    }, 1000);
                    return;
                } else if (text.includes('%')) {
                    targetNumber = parseInt(text.replace('%', ''));
                } else if (text.includes('$')) {
                    targetNumber = parseFloat(text.replace('$', ''));
                } else if (text.includes('min')) {
                    targetNumber = parseInt(text.replace(' min', ''));
                } else {
                    targetNumber = parseInt(text);
                }

                if (!isNaN(targetNumber)) {
                    animateNumber(entry.target, targetNumber);
                }
                
                // Handle counter-number elements specifically
                if (entry.target.classList.contains('counter-number')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    if (target) {
                        animateNumber(entry.target, target, 1500);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    numberElements.forEach(el => {
        numberObserver.observe(el);
    });

    // Subtle parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Enhanced hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.metric-card, .stats-card, .step');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Smooth scroll for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add subtle loading animation
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in-out';

    window.addEventListener('load', () => {
        setTimeout(() => {
            body.style.opacity = '1';
        }, 100);
    });

    // Typewriter effect for hero subtitle (subtle and elegant)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.innerHTML = '';
        
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                // Add the character before the cursor
                const textNode = document.createTextNode(text.charAt(i));
                heroSubtitle.insertBefore(textNode, cursor);
                i++;
                setTimeout(typeWriter, 50);
            }
            // Cursor stays blinking after typing is complete
        };
        
        // Add cursor to subtitle initially
        heroSubtitle.appendChild(cursor);
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 500);
    }

    // Mockup image animation - starts after typewriter begins
    const mockupImage = document.querySelector('.mockup-image');
    if (mockupImage) {
        setTimeout(() => {
            mockupImage.classList.add('animate-in');
        }, 1000); // Starts 0.5s after typewriter begins
    }

    // Side navigation active state tracking
    const navItems = document.querySelectorAll('.nav-item');
    const sectionsWithIds = document.querySelectorAll('section[id]');

    const updateActiveNavItem = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sectionsWithIds.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nav items
                navItems.forEach(item => item.classList.remove('active'));

                // Add active class to corresponding nav item
                const correspondingNavItem = document.querySelector(`[href="#${section.id}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
            }
        });
    };

    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);

    // Set initial active state
    setTimeout(updateActiveNavItem, 500);

});