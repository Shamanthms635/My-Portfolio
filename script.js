// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 500,
        easing: 'ease-out',
        once: true,
        mirror: false,
        offset: 50
    });
} else {
    console.warn('AOS not loaded. Scroll animations will not be available.');
}

// Particles.js Configuration
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
    });
} else {
    console.warn('Particles.js not loaded. Background animation will not be available.');
}

// Navigation functionality
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Check if navigation elements exist
if (!navbar || !navToggle || !navMenu) {
    console.warn('Some navigation elements not found. Navigation functionality may be limited.');
}

// Mobile navigation toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Navbar scroll effect
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else {
            console.warn(`Target section with id "${targetId}" not found.`);
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    if (sections.length > 0 && navLinks.length > 0) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});

// Resume download functionality
function downloadResume() {
    try {
        const resumeFileName = 'Shamanth_MS_Resume.pdf';
        const resumePath = resumeFileName;
        
        // Method 1: Try using fetch to get the file and create a blob download
        fetch(resumePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                // Create blob URL
                const blobUrl = window.URL.createObjectURL(blob);
                
                // Create download link
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = resumeFileName;
                downloadLink.style.display = 'none';
                
                // Add to DOM and trigger download
                document.body.appendChild(downloadLink);
                downloadLink.click();
                
                // Clean up
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(blobUrl);
                
                showDownloadMessage('Resume download started! Check your downloads folder.', 'success');
            })
            .catch(error => {
                console.error('❌ Fetch download failed:', error);
                // Fallback to direct link method
                fallbackDownload();
            });
        
    } catch (error) {
        console.error('❌ Error in downloadResume function:', error);
        fallbackDownload();
    }
}

// Fallback download method
function fallbackDownload() {
    try {
        const resumeFileName = 'Shamanth_MS_Resume.pdf';
        const resumePath = resumeFileName;
        
        // Create a simple link with download attribute
        const downloadLink = document.createElement('a');
        downloadLink.href = resumePath;
        downloadLink.download = resumeFileName;
        downloadLink.style.display = 'none';
        
        // Remove target attribute to prevent opening in new tab
        downloadLink.removeAttribute('target');
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        showDownloadMessage('Resume download initiated!', 'success');
        
    } catch (error) {
        console.error('❌ Fallback download also failed:', error);
        showDownloadMessage('Download failed. Please right-click and "Save as..." from the view option.', 'error');
    }
}

// Helper function to show download status messages
function showDownloadMessage(message, type = 'info') {
    // Remove any existing message
    const existingMessage = document.getElementById('download-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.id = 'download-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on message type
    switch (type) {
        case 'success':
            messageDiv.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            messageDiv.style.backgroundColor = '#f44336';
            break;
        case 'info':
        default:
            messageDiv.style.backgroundColor = '#2196F3';
            break;
    }
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }
    }, 5000);
}

// Contact form functionality
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Create mailto link
        const subject = 'Portfolio Contact Form - Message from ' + name;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:shamanthms28@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Reset form and button
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            alert('Thank you for your message! Your default email client should open with a pre-filled message.');
        }, 1000);
    });
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.onclick = scrollToTop;
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Add CSS for scroll to top button
const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
.scroll-top-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
    z-index: 1000;
}

.scroll-top-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

@media (max-width: 768px) {
    .scroll-top-btn {
        bottom: 1rem;
        right: 1rem;
        width: 45px;
        height: 45px;
        font-size: 1rem;
    }
}
`;
document.head.appendChild(scrollTopStyle);

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 30);
        }, 500);
    }
});

// Skill tags animation on hover
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add floating animation to profile image
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.style.animation = 'float 2s ease-in-out infinite';
    
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    `;
    document.head.appendChild(floatStyle);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add glow effect to buttons on hover
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.8)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.4)';
        });
    });
});

// Intersection Observer for animations
const observeElements = () => {
    const elements = document.querySelectorAll('.skill-category, .cert-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.transform = 'translateY(30px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
};

// Initialize intersection observer
document.addEventListener('DOMContentLoaded', observeElements);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance monitoring
if ('PerformanceObserver' in window) {
    try {
        const performanceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log(`🚀 Page loaded in ${entry.loadEventEnd - entry.loadEventStart}ms`);
                }
            }
        });
        performanceObserver.observe({ entryTypes: ['navigation'] });
    } catch (error) {
        console.warn('Performance monitoring not available:', error);
    }
}

// Enhanced user experience features
class PortfolioEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addThemePreference();
        this.addVisitorCounter();
        this.addLastUpdated();
    }

    // Keyboard navigation
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.scrollToNextSection();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.scrollToPrevSection();
            } else if (e.key === 'Home') {
                e.preventDefault();
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
            } else if (e.key === 'End') {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    scrollToNextSection() {
        const sections = ['home', 'about', 'skills', 'certifications', 'contact'];
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        document.getElementById(sections[nextIndex]).scrollIntoView({ behavior: 'smooth' });
    }

    scrollToPrevSection() {
        const sections = ['home', 'about', 'skills', 'certifications', 'contact'];
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        document.getElementById(sections[prevIndex]).scrollIntoView({ behavior: 'smooth' });
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100;

        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                return section.getAttribute('id');
            }
        }
        return 'home';
    }

    // Theme preference detection and application
    addThemePreference() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.applyTheme(prefersDark.matches);
        
        prefersDark.addEventListener('change', (e) => {
            this.applyTheme(e.matches);
        });
    }

    applyTheme(isDark) {
        document.documentElement.style.setProperty(
            '--glass-bg', 
            isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'
        );
        document.documentElement.style.setProperty(
            '--glass-border', 
            isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'
        );
    }

    // Simple visitor counter using localStorage
    addVisitorCounter() {
        let visits = localStorage.getItem('portfolio-visits') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('portfolio-visits', visits);
        
        // Add a subtle indicator
        if (visits > 1) {
            console.log(`👋 Welcome back! This is visit #${visits}`);
        } else {
            console.log('🎉 Welcome to my portfolio!');
        }
    }

    // Add last updated timestamp
    addLastUpdated() {
        const footer = document.querySelector('.footer p');
        if (footer) {
            const lastUpdated = new Date().getFullYear();
            footer.innerHTML = `&copy; ${lastUpdated} Shamanth MS. All rights reserved. | Last updated: ${new Date().toLocaleDateString()}`;
        }
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioEnhancer();
    
    // Test resume file accessibility
    testResumeFile();
});

// Test resume file accessibility
function testResumeFile() {
    const resumePath = 'Shamanth_MS_Resume.pdf';
    
    fetch(resumePath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                console.log('✅ Resume file is accessible');
                console.log('📄 File size:', response.headers.get('content-length'), 'bytes');
                console.log('📋 Content type:', response.headers.get('content-type'));
            } else {
                console.warn('⚠️ Resume file not accessible:', response.status, response.statusText);
            }
        })
        .catch(error => {
            console.warn('⚠️ Could not test resume file accessibility:', error.message);
        });
}

// Alternative methods for resume handling
function downloadResumeAlternative() {
    const resumePath = 'Shamanth_MS_Resume.pdf';
    
    // Create a simple link that forces download without opening
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Shamanth_MS_Resume.pdf';
    link.style.display = 'none';
    
    // Add attributes to prevent opening in browser
    link.setAttribute('download', 'Shamanth_MS_Resume.pdf');
    link.setAttribute('type', 'application/octet-stream');
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showDownloadMessage('Resume download initiated!', 'success');
}

// Enhanced download method with multiple fallbacks
function downloadResumeEnhanced() {
    const resumeFileName = 'Shamanth_MS_Resume.pdf';
    const resumePath = resumeFileName;
    
    // Try multiple download methods
    const methods = [
        // Method 1: Fetch + Blob (most reliable)
        () => {
            return fetch(resumePath)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = resumeFileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                    return true;
                });
        },
        
        // Method 2: Direct link with download attribute
        () => {
            return new Promise((resolve, reject) => {
                const a = document.createElement('a');
                a.href = resumePath;
                a.download = resumeFileName;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => resolve(true), 100);
            });
        },
        
        // Method 3: Force download with octet-stream
        () => {
            return new Promise((resolve, reject) => {
                const a = document.createElement('a');
                a.href = resumePath;
                a.download = resumeFileName;
                a.setAttribute('type', 'application/octet-stream');
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => resolve(true), 100);
            });
        }
    ];
    
    // Try each method until one works
    let methodIndex = 0;
    
    function tryNextMethod() {
        if (methodIndex >= methods.length) {
            showDownloadMessage('Download failed. Please use "View Online" and save manually.', 'error');
            return;
        }
        
        methods[methodIndex]()
            .then(() => {
                showDownloadMessage('Resume download started!', 'success');
            })
            .catch((error) => {
                console.log(`Method ${methodIndex + 1} failed:`, error);
                methodIndex++;
                tryNextMethod();
            });
    }
    
    tryNextMethod();
}

// Function to view resume in new tab (separate from download)
function viewResume() {
    try {
        const resumePath = 'Shamanth_MS_Resume.pdf';
        window.open(resumePath, '_blank', 'noopener,noreferrer');
        showDownloadMessage('Resume opened in new tab!', 'success');
    } catch (error) {
        console.error('❌ Error opening resume:', error);
        showDownloadMessage('Unable to open resume. Please try downloading instead.', 'error');
    }
}

// Enhanced resume function with user choice
function handleResumeAction() {
    // Create a custom modal for better UX
    createResumeModal();
}

// Create a custom modal for resume options
function createResumeModal() {
    // Remove existing modal if any
    const existingModal = document.getElementById('resume-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal container
    const modal = document.createElement('div');
    modal.id = 'resume-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        color: white;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: modalSlideIn 0.3s ease-out;
    `;
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Modal content
    modalContent.innerHTML = `
        <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem;">Resume Options</h3>
        <p style="margin: 0 0 2rem 0; opacity: 0.9;">Choose how you'd like to access my resume:</p>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button onclick="downloadResumeEnhanced(); closeResumeModal();" 
                    style="background: rgba(255, 255, 255, 0.2); border: 2px solid rgba(255, 255, 255, 0.3); 
                           color: white; padding: 12px 24px; border-radius: 8px; cursor: pointer; 
                           transition: all 0.3s ease; font-weight: 500;">
                <i class="fas fa-download" style="margin-right: 8px;"></i>
                Download
            </button>
            
            <button onclick="viewResume(); closeResumeModal();" 
                    style="background: rgba(255, 255, 255, 0.2); border: 2px solid rgba(255, 255, 255, 0.3); 
                           color: white; padding: 12px 24px; border-radius: 8px; cursor: pointer; 
                           transition: all 0.3s ease; font-weight: 500;">
                <i class="fas fa-eye" style="margin-right: 8px;"></i>
                View Online
            </button>
        </div>
        
        <button onclick="closeResumeModal();" 
                style="background: none; border: none; color: rgba(255, 255, 255, 0.7); 
                       margin-top: 1.5rem; cursor: pointer; font-size: 0.9rem;">
            Cancel
        </button>
    `;
    
    // Add hover effects
    const buttons = modalContent.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent !== 'Cancel') {
            button.addEventListener('mouseenter', () => {
                button.style.background = 'rgba(255, 255, 255, 0.3)';
                button.style.transform = 'translateY(-2px)';
            });
            button.addEventListener('mouseleave', () => {
                button.style.background = 'rgba(255, 255, 255, 0.2)';
                button.style.transform = 'translateY(0)';
            });
        }
    });
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeResumeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeResumeModal();
        }
    });
}

// Function to close the resume modal
function closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add easter egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        console.log('🎊 Easter egg activated! You found the secret!');
    }
});

// Add copy email functionality
document.addEventListener('DOMContentLoaded', () => {
    const emailElement = document.querySelector('.contact-item p');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText('shamanthms28@gmail.com');
                    emailElement.style.color = '#4CAF50';
                    emailElement.textContent = 'Email copied!';
                    
                    setTimeout(() => {
                        emailElement.style.color = '';
                        emailElement.textContent = 'shamanthms28@gmail.com';
                    }, 2000);
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = 'shamanthms28@gmail.com';
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    emailElement.style.color = '#4CAF50';
                    emailElement.textContent = 'Email copied!';
                    
                    setTimeout(() => {
                        emailElement.style.color = '';
                        emailElement.textContent = 'shamanthms28@gmail.com';
                    }, 2000);
                }
            } catch (err) {
                console.log('Failed to copy email:', err);
                alert('Email: shamanthms28@gmail.com');
            }
        });
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
});

// Success messages
console.log('🚀 Portfolio website loaded successfully!');
console.log('✨ All animations and interactions are ready!');
console.log('⌨️ Keyboard navigation: Use arrow keys, Home, End, or Page Up/Down');
console.log('📧 Click email to copy to clipboard');
console.log('🎮 Try the Konami code for a surprise!'); 
