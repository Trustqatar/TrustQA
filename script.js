// TrustQA - Smooth scrolling and animations

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
});
