// TrustQA - Smooth scrolling and animations

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    nav.style.boxShadow = '0 4px 30px rgba(44, 95, 125, 0.12)';
    nav.style.background = 'rgba(255, 255, 255, 0.9)';
  } else {
    nav.style.boxShadow = '0 2px 24px rgba(44, 95, 125, 0.06)';
    nav.style.background = 'rgba(255, 255, 255, 0.8)';
  }
  
  lastScroll = currentScroll;
});

// Subtle parallax effect for floating elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((el, index) => {
    const speed = 0.02 + (index * 0.01);
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in, .feature-card');
  fadeElements.forEach(el => observer.observe(el));
});

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Reset message
    formMessage.className = 'form-message';
    formMessage.textContent = '';
    
    // Validation
    if (!name || !email || !message) {
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Please fill in all fields.';
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }
    
    // Simulate form submission (no backend)
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
    
    // Reset form
    contactForm.reset();
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// Add fade-in class to mission section on load
document.addEventListener('DOMContentLoaded', () => {
  const missionContent = document.querySelector('.mission-content');
  if (missionContent) {
    missionContent.classList.add('fade-in');
    observer.observe(missionContent);
  }
  
  const contactContainer = document.querySelector('.contact-container');
  if (contactContainer) {
    contactContainer.classList.add('fade-in');
    observer.observe(contactContainer);
  }
  
  // Add staggered animation to floating elements
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });
  
  // Add hover tilt effect to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  });
});
