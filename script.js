// The Epsilon Protocol
// Dramatic interactions and scroll animations

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Stagger discipline cards
                const cards = entry.target.querySelectorAll('.discipline-card');
                cards.forEach((card, index) => {
                    card.style.transitionDelay = `${index * 0.1}s`;
                    card.classList.add('animate-in');
                });

                // Stagger tier items
                const tiers = entry.target.querySelectorAll('.tier');
                tiers.forEach((tier, index) => {
                    setTimeout(() => {
                        tier.classList.add('animate-in');
                    }, index * 100);
                });

                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

    document.querySelectorAll('.disciplines, .ascension, .manifesto, .tenets, .enter').forEach(section => {
        section.classList.add('scroll-animate');
        scrollObserver.observe(section);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Nav transparency on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            nav.classList.add('nav-solid');
        } else {
            nav.classList.remove('nav-solid');
        }
    });

    // Discipline card hover glow follow
    document.querySelectorAll('.discipline-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `${x - rect.width}px`;
                glow.style.top = `${y - rect.height}px`;
            }
        });
    });

    // Tier hover enhancement
    document.querySelectorAll('.tier').forEach(tier => {
        tier.addEventListener('mouseenter', () => {
            document.querySelectorAll('.tier').forEach(t => {
                if (t !== tier) {
                    t.style.opacity = '0.3';
                }
            });
            tier.style.opacity = '1';
        });

        tier.addEventListener('mouseleave', () => {
            document.querySelectorAll('.tier').forEach(t => {
                t.style.opacity = '';
            });
        });
    });

    // Form handling
    const form = document.querySelector('.enter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const button = form.querySelector('.btn-submit');
            const originalText = button.querySelector('.btn-text').textContent;

            button.querySelector('.btn-text').textContent = 'Transmission Received';
            button.disabled = true;
            button.style.background = 'var(--gold)';
            button.style.color = 'var(--void)';
            button.style.borderColor = 'var(--gold)';

            setTimeout(() => {
                form.reset();
                button.querySelector('.btn-text').textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                button.style.color = '';
                button.style.borderColor = '';
            }, 3000);
        });
    }

    // Parallax effect on hero geometric lines
    const heroGeometric = document.querySelector('.geometric-lines');
    if (heroGeometric) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroGeometric.style.transform = `scale(${1 + scrolled * 0.0003}) rotate(${scrolled * 0.01}deg)`;
                heroGeometric.style.opacity = Math.max(0.15 - scrolled * 0.0002, 0);
            }
        });
    }

    // Mouse follower effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;

            const geometric = hero.querySelector('.geometric-lines svg');
            if (geometric) {
                geometric.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            }
        });
    }

    // Counter animation for stats (Roman numerals are static, but we add a reveal effect)
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';

        setTimeout(() => {
            stat.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 2000 + index * 200);
    });

    // Add glitch effect on epsilon mark hover
    const epsilonMarks = document.querySelectorAll('.epsilon-mark');
    epsilonMarks.forEach(mark => {
        mark.addEventListener('mouseenter', () => {
            mark.classList.add('glitch');
            setTimeout(() => mark.classList.remove('glitch'), 300);
        });
    });
});

// Add CSS for scroll animations and effects
const style = document.createElement('style');
style.textContent = `
    .scroll-animate {
        opacity: 0;
        transform: translateY(60px);
        transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
                    transform 1s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .scroll-animate.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

    .discipline-card {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                    border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .discipline-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .discipline-card:hover {
        transform: translateY(-8px) !important;
    }

    .tier {
        opacity: 0.3;
        transform: translateX(-20px);
        transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .tier.animate-in {
        opacity: 0.5;
        transform: translateX(0);
    }

    .tier[data-tier="7"].animate-in {
        opacity: 1;
    }

    .nav-solid {
        background: rgba(10, 10, 11, 0.95) !important;
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(201, 162, 39, 0.1);
    }

    .epsilon-mark.glitch {
        animation: glitchEffect 0.3s ease;
    }

    @keyframes glitchEffect {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(2px, -2px); }
        60% { transform: translate(-2px, -2px); }
        80% { transform: translate(2px, 2px); }
    }

    .geometric-lines svg {
        transition: transform 0.1s ease-out;
    }
`;
document.head.appendChild(style);
