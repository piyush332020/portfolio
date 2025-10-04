        // ============================
// PORTFOLIO ENHANCEMENT SCRIPT
// ============================

class PortfolioEnhancer {
    constructor() {
        this.init();
        this.bindEvents();
        this.initializeAnimations();
    }

    init() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.themeToggle = document.getElementById('theme-toggle');
        this.contactForm = document.getElementById('contact-form');
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressBar = document.querySelector('.progress');
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        // Animation states
        this.isAnimating = false;
        this.currentRole = 0;
        this.roles = [
            'AI/ML Enthusiast',
            'Frontend Developer', 
            'Python Developer',
            'Full-Stack Developer',
            'Computer Vision Expert'
        ];
        
        // Smooth scroll offset
        this.scrollOffset = 80;
    }

    bindEvents() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.handlePageLoad();
        });

        // Window events
        window.addEventListener('load', () => {
            this.hideLoadingScreen();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateProgressBar();
            this.updateActiveNav();
            this.revealSections();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Navigation events
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e);
            });
        });

        // Mobile menu
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Contact form
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                this.handleFormSubmit(e);
            });
        }

        // Custom cursor
        if (window.innerWidth > 768) {
            this.initCustomCursor();
        }

        // Project filters
        this.initProjectFilters();

        // Skill animations
        this.initSkillAnimations();

        // Statistics counter
        this.initStatsCounter();

        // Role carousel
        this.initRoleCarousel();

        // Button ripple effects
        this.initButtonRipples();

        // Form enhancements
        this.initFormEnhancements();
    }

    // ============================
    // PAGE LOADING & ANIMATIONS
    // ============================

    handlePageLoad() {
        // Start initial animations
        this.animateNameLetters();
        this.startFloatingElements();
        
        // Reveal sections on load
        setTimeout(() => {
            this.revealSections();
        }, 1000);
    }


    animateNameLetters() {
        const nameLetters = document.querySelectorAll('.name-part');
        nameLetters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0) rotateX(0)';
            }, 1000 + (index * 100));
        });
    }

    startFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 1}s`;
        });
    }

    // ============================
    // NAVIGATION & SCROLLING
    // ============================

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            this.scrollToSection(targetSection);
            this.closeMobileMenu();
        }
    }

    scrollToSection(section) {
        const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - this.scrollOffset;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    handleScroll() {
        this.updateNavbarBackground();
        this.handleParallaxElements();
    }

    updateNavbarBackground() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    }

    updateProgressBar() {
        if (this.progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            this.progressBar.style.width = scrolled + '%';
        }
    }

    updateActiveNav() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;
            
            if (sectionTop <= 120 && sectionTop + sectionHeight > 120) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    revealSections() {
        this.sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                setTimeout(() => {
                    section.classList.add('visible');
                    this.animateSectionElements(section);
                }, index * 200);
            }
        });
    }

    animateSectionElements(section) {
        // Animate cards within sections
        const cards = section.querySelectorAll('.project-card, .certification-card, .skill-category');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 150);
        });

        // Animate timeline items
        const timelineItems = section.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 300);
        });
    }

    handleParallaxElements() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.bg-animation');
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Orbital elements rotation based on scroll
        const orbitalItems = document.querySelectorAll('.orbital-item');
        orbitalItems.forEach((item, index) => {
            const rotation = scrolled * 0.1 + (index * 60);
            item.style.transform = `rotate(${rotation}deg) translate(200px) rotate(-${rotation}deg)`;
        });
    }

    // ============================
    // MOBILE MENU
    // ============================

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = this.hamburger.querySelectorAll('span');
        if (this.hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        
        const spans = this.hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // ============================
    // THEME SYSTEM
    // ============================

toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    const icon = this.themeToggle.querySelector('i');
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    document.body.style.transition = 'background-color 0.3s ease';
    document.body.style.backgroundColor = isLight ? 'white' : 'black';
    // document.querySelectorAll('.typed-text').forEach(el => {
    //     el.style.color = isLight ? 'black' : 'white';
    // });
    //     document.querySelectorAll('.about-lead').forEach(el => {
    //     el.style.color = isLight ? 'black' : 'white';
    // });

}

// In initTheme(), replace with:

initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    const isLight = saved === 'light';
    document.body.classList.toggle('light-theme', isLight);
    const icon = this.themeToggle?.querySelector('i');
    if (icon) icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    document.body.setAttribute("data-theme", isLight ? "light" : "dark");


}

// In initCustomCursor(), update to:

initCustomCursor() {
    const cursor = this.cursor, follower = this.cursorFollower;
    let mx=0, my=0, fx=0, fy=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
    const loop = () => {
        fx += (mx - fx) * 0.15; fy += (my - fy) * 0.15;
        cursor.style.transform = `translate3d(${mx}px,${my}px,0)`;
        follower.style.transform = `translate3d(${fx}px,${fy}px,0)`;
        requestAnimationFrame(loop);
    };
    loop();
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            follower.classList.add('follower-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            follower.classList.remove('follower-hover');
        });
    });
}

    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        
        const icon = this.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }


    // ============================
    // ROLE CAROUSEL
    // ============================

    initRoleCarousel() {
        const roleItems = document.querySelectorAll('.role-item');
        if (roleItems.length === 0) return;

        // Start after name animation completes
        setTimeout(() => {
            this.startRoleCarousel(roleItems);
        }, 1000);
    }

    startRoleCarousel(roleItems) {
        const showNextRole = () => {
            // Hide current role
            roleItems[this.currentRole].classList.remove('active');
            
            // Show next role
            this.currentRole = (this.currentRole + 1) % roleItems.length;
            
            setTimeout(() => {
                roleItems[this.currentRole].classList.add('active');
            }, 300);
        };

        // Change role every 3 seconds
        setInterval(showNextRole, 3000);
    }

    // ============================
    // STATISTICS COUNTER
    // ============================

    initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateStats = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const current = parseInt(stat.textContent) || 0;
                
                if (current < target) {
                    const increment = Math.ceil(target / 50);
                    const newValue = Math.min(current + increment, target);
                    stat.textContent = newValue;
                    
                    if (newValue < target) {
                        setTimeout(() => animateStats(), 50);
                    }
                }
            });
        };

        // Start counter when stats section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // ============================
    // SKILLS ANIMATIONS
    // ============================

    initSkillAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target.closest('.skill-item');
                    const percentage = skillItem.getAttribute('data-skill');
                    const progressBar = skillItem.querySelector('.skill-progress');
                    
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
                    }, 300);
                    
                    observer.unobserve(entry.target);
                }
            });
        });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });

        // Circular skill rings
        const skillRings = document.querySelectorAll('.skill-progress[data-skill]');
        skillRings.forEach(ring => {
            const percentage = ring.getAttribute('data-skill');
            ring.style.setProperty('--percentage', percentage);
        });
    }

    // ============================
    // PROJECT FILTERS
    // ============================

    initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                
                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        setTimeout(() => {
                            card.style.display = 'block';
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(30px)';
                            
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================
    // BUTTON RIPPLE EFFECTS
    // ============================

    initButtonRipples() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tertiary');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                ripple.classList.add('btn-ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // ============================
    // FORM ENHANCEMENTS
    // ============================

    initFormEnhancements() {
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
        
        formInputs.forEach(input => {
            // Label animation
            input.addEventListener('focus', () => {
                const label = input.parentElement.querySelector('label');
                if (label) {
                    label.style.color = 'var(--primary-color)';
                    label.style.transform = 'translateY(-5px)';
                }
            });
            
            input.addEventListener('blur', () => {
                const label = input.parentElement.querySelector('label');
                if (label && !input.value) {
                    label.style.color = 'var(--text-gray)';
                    label.style.transform = 'translateY(0)';
                }
            });

            // Real-time validation
            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch(field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                message = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'text':
                isValid = value.length >= 2;
                message = isValid ? '' : 'Please enter at least 2 characters';
                break;
            case 'textarea':
                isValid = value.length >= 5;
                message = isValid ? '' : 'Please enter at least 5 characters';
                break;
        }

        // Update field styling
        if (value.length > 0) {
            if (isValid) {
                field.style.borderColor = 'var(--primary-color)';
                field.style.background = 'rgba(0, 255, 136, 0.05)';
            } else {
                field.style.borderColor = 'var(--accent-color)';
                field.style.background = 'rgba(255, 0, 102, 0.05)';
            }
        } else {
            field.style.borderColor = 'var(--border-color)';
            field.style.background = 'rgba(255, 255, 255, 0.05)';
        }

        // Show/hide validation message
        let validationMsg = field.parentElement.querySelector('.validation-message');
        if (!validationMsg && message) {
            validationMsg = document.createElement('div');
            validationMsg.className = 'validation-message';
            validationMsg.style.cssText = `
                color: var(--accent-color);
                font-size: 0.8rem;
                margin-top: 0.5rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            field.parentElement.appendChild(validationMsg);
        }
        
        if (validationMsg) {
            validationMsg.textContent = message;
            validationMsg.style.opacity = message ? '1' : '0';
        }

        return isValid;
    }

    // ============================
    // CONTACT FORM HANDLING
    // ============================

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const submitBtn = this.contactForm.querySelector('.submit-btn');
        const successMessage = document.getElementById('form-success');
        const errorMessage = document.getElementById('form-error');
        
        // Validate all fields
        const inputs = this.contactForm.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormMessage(errorMessage, 'Please correct the errors above');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

    fetch(this.contactForm.action, {
    method: 'POST',
    body: formData,
    })


        setTimeout(() => {
            // Hide form and show success message
            this.contactForm.style.display = 'none';
            this.showFormMessage(successMessage, 'Thank you! Your message has been sent successfully.');
            
            // Reset form after delay
            setTimeout(() => {
                this.resetContactForm();
            }, 4000);
            
        }, 2000);
    }

    showFormMessage(messageElement, customText) {
        if (customText) {
            const messageContent = messageElement.querySelector('.message-content p');
            if (messageContent) {
                messageContent.textContent = customText;
            }
        }
        
        messageElement.style.display = 'block';
        messageElement.style.opacity = '0';
        
        setTimeout(() => {
            messageElement.style.opacity = '1';
        }, 50);
    }

    resetContactForm() {
        const submitBtn = this.contactForm.querySelector('.submit-btn');
        const successMessage = document.getElementById('form-success');
        
        // Hide success message
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.style.display = 'none';
            
            // Show and reset form
            this.contactForm.style.display = 'block';
            this.contactForm.reset();
            
            // Reset submit button
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Reset field styling
            const inputs = this.contactForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.style.borderColor = 'var(--border-color)';
                input.style.background = 'rgba(255, 255, 255, 0.05)';
                
                const validationMsg = input.parentElement.querySelector('.validation-message');
                if (validationMsg) {
                    validationMsg.remove();
                }
            });
            
        }, 300);
    }

    // ============================
    // UTILITY FUNCTIONS
    // ============================

    handleResize() {
        // Update cursor on mobile
        if (window.innerWidth <= 768) {
            if (this.cursor) this.cursor.style.display = 'none';
            if (this.cursorFollower) this.cursorFollower.style.display = 'none';
        } else {
            if (this.cursor) this.cursor.style.display = 'block';
            if (this.cursorFollower) this.cursorFollower.style.display = 'block';
        }
        
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    // Public method for external scroll calls
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - this.scrollOffset;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Resume download function
    downloadResume() {
        // Create download link
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/file/d/1Y2Xp5PkMHHFlF7YvyPymzK3SGSRq_jbJ/view?usp=drive_link'; // Replace with actual resume file path
        link.download = 'resume.pdf';
        
        // Add ripple effect to button
        const btn = event.target.closest('button');
        if (btn) {
            const ripple = document.createElement('div');
            ripple.classList.add('btn-ripple');
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
        
        // Trigger download (or show message if file not available)
        try {
            link.click();
        } catch (error) {
            // Show notification
            this.showNotification('Resume download will be available soon. Please contact me directly for the latest version.', 'info');
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 1rem;
            max-width: 350px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }

    // Smooth reveal for elements
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animated elements
        const animatedElements = document.querySelectorAll(
            '.project-card, .certification-card, .skill-category, .timeline-item, .achievement-card, .contact-method'
        );
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize everything
    initializeAnimations() {
        // Theme initialization
        this.initTheme();
        
        // Element observation
        this.observeElements();
        
        // Add loading class to body initially
        document.body.classList.add('loading');
        
        // Remove loading class after animations
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 3000);
    }
}

// ============================
// GLOBAL FUNCTIONS
// ============================

// Global scroll function for buttons
function scrollToSection(sectionId) {
    if (window.portfolioEnhancer) {
        window.portfolioEnhancer.scrollToSection(sectionId);
    }
}

// Global download function
function downloadResume() {
    if (window.portfolioEnhancer) {
        window.portfolioEnhancer.downloadResume();
    }
}

// ============================
// ADDITIONAL ENHANCEMENTS
// ============================

// Typing effect for hero description
class TypeWriter {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    start() {
        this.element.textContent = '';
        this.type();
    }
}

// Particle system for background
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================
// INITIALIZE ON DOM READY
// ============================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio enhancer
    window.portfolioEnhancer = new PortfolioEnhancer();
    
    // Initialize typing effect for hero description
    const heroDescription = document.querySelector('.typed-text');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        const typeWriter = new TypeWriter(heroDescription, originalText, 30);
        
        setTimeout(() => {
            typeWriter.start();
        }, 2700); // Start after name animation
    }
    
    // Initialize particle system
    const particleContainer = document.querySelector('.animated-bg');
    if (particleContainer && window.innerWidth > 768) {
        new ParticleSystem(particleContainer);
    }
    
    // Add smooth scrolling to all internal links
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
    
    // Add intersection observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                fadeObserver.unobserve(entry.target);
            }
        });
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
});

// ============================
// PERFORMANCE OPTIMIZATIONS
// ============================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    if (window.portfolioEnhancer) {
        window.portfolioEnhancer.handleScroll();
    }
}, 16)); // ~60fps

// Optimize resize events
window.addEventListener('resize', debounce(() => {
    if (window.portfolioEnhancer) {
        window.portfolioEnhancer.handleResize();
    }
}, 250));

// ============================
// SERVICE WORKER REGISTRATION
// ============================

// Register service worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ============================
// ANALYTICS & TRACKING
// ============================

// Track user interactions (replace with your analytics)
function trackEvent(action, category = 'Portfolio', label = '') {
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for development
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}


// Track navigation clicks
document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (target) {
        const text = target.textContent.trim();
        const href = target.href || target.getAttribute('data-section');
        trackEvent('click', 'Navigation', text || href);
    }
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', throttle(() => {
    const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollDepth > maxScrollDepth && scrollDepth % 25 === 0) {
        maxScrollDepth = scrollDepth;
        trackEvent('scroll_depth', 'Engagement', `${scrollDepth}%`);
    }
}, 1000));

console.log('🚀 Portfolio Enhanced JavaScript Loaded Successfully!');