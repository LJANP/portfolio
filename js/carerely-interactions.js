// Carerely Page Interactions
document.addEventListener('DOMContentLoaded', function () {
    // Make side navigation visible after scrolling past hero section
    const sideNav = document.querySelector('.side-nav');
    const heroSection = document.querySelector('.hero');
    
    if (sideNav && heroSection) {
        // Initially hide the navigation (remove visible class if present)
        sideNav.classList.remove('visible');
        
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero is visible - hide navigation
                    sideNav.classList.remove('visible');
                } else {
                    // Hero is not visible - show navigation
                    sideNav.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px 0px 0px'
        });
        
        heroObserver.observe(heroSection);
    }

    // Hero counter animation - starts immediately
    const heroCounter = document.querySelector('.hero-counter');
    if (heroCounter) {
        const target = parseInt(heroCounter.getAttribute('data-target'));
        animateCounter(heroCounter, target, 1200); // Slightly slower for dramatic effect
    }
    // Counter Animation
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        const originalText = element.textContent;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format the number based on the target and element class
            if (element.classList.contains('metric-number')) {
                if (target >= 10000) {
                    element.textContent = `~${Math.floor(current).toLocaleString()}`;
                } else {
                    element.textContent = `${Math.floor(current)}%`;
                }
            } else if (element.classList.contains('hero-counter')) {
                // For hero counter, format as ~10k
                if (current >= 1000) {
                    element.textContent = `~${Math.floor(current / 1000)}k`;
                } else {
                    element.textContent = `~${Math.floor(current)}`;
                }
            } else {
                // For counter-number elements, just show the number
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Intersection Observer for triggering animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricNumber = entry.target.querySelector('.metric-number');
                const text = metricNumber.textContent;

                // Extract the target number from the text
                let target;
                if (text.includes('~10,000')) {
                    target = 10000;
                } else if (text.includes('87%')) {
                    target = 87;
                } else if (text.includes('83%')) {
                    target = 83;
                }

                // Start the animation
                if (target) {
                    animateCounter(metricNumber, target);
                    observer.unobserve(entry.target); // Only animate once
                }
            }
        });
    }, observerOptions);

    // Observer for counter numbers in text
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterNumbers = entry.target.querySelectorAll('.counter-number');
                counterNumbers.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (target) {
                        animateCounter(counter, target, 1500); // Slightly faster for smaller numbers
                    }
                });
                counterObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        observer.observe(card);
    });

    // Observe sections with counter numbers
    const sectionsWithCounters = document.querySelectorAll('.overview-item');
    sectionsWithCounters.forEach(section => {
        if (section.querySelector('.counter-number')) {
            counterObserver.observe(section);
        }
    });

    // Scroll animations for other elements
    const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll, .leadership-card, .metric-card');
    animateElements.forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.side-nav .nav-item');

    const navObserver = new IntersectionObserver((entries) => {
        let currentSection = null;
        let maxRatio = 0;

        // Find the section with the highest intersection ratio
        entries.forEach(entry => {
            if (entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                currentSection = entry.target;
            }
        });

        if (currentSection && maxRatio > 0.1) {
            const sectionId = currentSection.getAttribute('id');

            // Remove active class from all nav items
            navItems.forEach(item => item.classList.remove('active'));

            // Add active class to corresponding nav item
            const activeNavItem = document.querySelector(`.side-nav .nav-item[href="#${sectionId}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }
    }, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '0px 0px -20% 0px'
    });

    // Observe all sections with IDs
    sections.forEach(section => {
        navObserver.observe(section);
    });
});