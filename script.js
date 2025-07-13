// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Set active navigation state based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for hash links (only for same-page navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only apply smooth scrolling to hash links on the same page
        if (this.getAttribute('href').includes('#contact')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Enhanced cooking animation (only on home page)
document.addEventListener('DOMContentLoaded', () => {
    const codeSnippets = document.querySelectorAll('.code-snippet');
    const cookingScene = document.querySelector('.cooking-scene');
    
    // Add click interaction to cooking scene (only if it exists)
    if (cookingScene) {
        cookingScene.addEventListener('click', () => {
            // Add a little shake animation to the pan
            const pan = document.querySelector('.pan');
            pan.style.animation = 'shake 0.5s ease-in-out';
            
            // Reset animation after completion
            setTimeout(() => {
                pan.style.animation = '';
            }, 500);
            
            // Randomize code snippets
            const codeExamples = [
                'console.log("Hello!");',
                'const result = cook();',
                'if (tasty) return;',
                'function magic() {}',
                'let creativity = true;',
                'while (coding) {}',
                'return "delicious";',
                'const chef = new Dev();',
                'async function serve()',
                'export default taste;'
            ];
            
            codeSnippets.forEach(snippet => {
                const randomCode = codeExamples[Math.floor(Math.random() * codeExamples.length)];
                snippet.textContent = randomCode;
            });
        });
    }
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards for scroll animations
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(category);
    });
});

// Add shake animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(-50%) rotate(0deg); }
        25% { transform: translateX(-50%) rotate(1deg); }
        75% { transform: translateX(-50%) rotate(-1deg); }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 2rem;
        gap: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(9px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(8px, -6px);
    }
    
    .typing-cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Add typing effect to the hero title (only on home page)
const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    let currentText = '';
    let index = 0;
    let isDeleting = false;

    function typeWriter() {
        const fullText = "Hi, I'm <span class='highlight'>Zachary Yu</span>";
        
        if (!isDeleting && index < fullText.length) {
            currentText += fullText.charAt(index);
            index++;
        } else if (isDeleting && index > 0) {
            currentText = fullText.substring(0, index - 1);
            index--;
        }
        
        heroTitle.innerHTML = currentText + '<span class="typing-cursor">|</span>';
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && index === fullText.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            speed = 500; // Pause before restarting
        }
        
        setTimeout(typeWriter, speed);
    }

    // Start typing effect after page load
    setTimeout(() => {
        heroTitle.innerHTML = '<span class="typing-cursor">|</span>';
        typeWriter();
    }, 1000);
}

// Add particle effect for cooking (only on home page)
function createParticle() {
    const pan = document.querySelector('.pan-body');
    if (!pan) return;
    
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#a0aec0';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10';
    
    particle.style.left = Math.random() * 160 + 20 + 'px';
    particle.style.top = '20px';
    particle.style.opacity = '0.8';
    
    pan.appendChild(particle);
    
    // Animate particle
    let posY = 20;
    let opacity = 0.8;
    
    const animate = () => {
        posY -= 2;
        opacity -= 0.02;
        
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    
    animate();
}

// Create particles periodically (only if cooking scene exists)
if (document.querySelector('.cooking-scene')) {
    setInterval(createParticle, 300);
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '3px';
progressBar.style.background = 'linear-gradient(90deg, #2d3748, #4a5568)';
progressBar.style.zIndex = '9999';
progressBar.style.transition = 'width 0.3s ease';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = progress + '%';
});

console.log('🍳 Welcome to Zachary Yu\'s Code Kitchen! 👨‍💻'); 