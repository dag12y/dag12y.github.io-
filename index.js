// Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS with your public key
(function() {
    // Replace with your actual public key from EmailJS dashboard
    emailjs.init("403hQQyf-3iI5s6W1");
})();

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Prepare the parameters - update these to match your EmailJS template variables
        const templateParams = {
            from_name: document.getElementById('name').value,
            reply_to: document.getElementById('email').value,  // Changed from from_email
            message: document.getElementById('message').value,
            to_name: 'Dagm Yibabe'  // Add this if your template uses it
        };

        emailjs.send('service_gg1lz2q', 'template_stuomxn', templateParams)
            .then(function() {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('EmailJS error:', error);
                alert('Oops! Something went wrong. Please try again later.');
            })
            .finally(function() {
                // Restore button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// Enhanced Scroll Reveal
const scrollReveal = () => {
    const elements = document.querySelectorAll('.project-card, .about-content, .skill-tags span, .hero > *');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            // Add delay based on index for cascade effect
            setTimeout(() => {
                element.classList.add('reveal');
                element.classList.add('active');
            }, index * 100);
        }
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#home');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `50% ${scrolled * 0.5}px`;
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
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

// Initialize typing effect
window.addEventListener('load', () => {
    const titleElement = document.querySelector('.hero h1');
    const originalText = titleElement.innerText;
    typeWriter(titleElement, originalText);
});

// Initialize
window.addEventListener('load', () => {
    navSlide();
    window.addEventListener('scroll', scrollReveal);
});

// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});