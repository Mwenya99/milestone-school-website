document.addEventListener("DOMContentLoaded", () => {
  // Initialize the AOS (Animate on Scroll) library with all options in one object
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    threshold: 0.1, // Trigger the animation when 10% of the element is visible
    mirror: false,    
  });

// Get the button
// Get the button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button after scrolling down 100px
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// Scroll to top smoothly when clicked
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Wait for the entire page to load
window.onload = function() {
  const preloader = document.getElementById('preloader');
  
  // Add the 'hidden' class to fade out the preloader
  preloader.classList.add('hidden');
};

  // --- Your Newsletter Form Script ---
  const newsletterForm = document.getElementById('newsletter-form');
  
  // Check if the form actually exists on the page before adding a listener
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      // Prevent the form from submitting and reloading the page
      event.preventDefault();

      // Get the email input and the response message element
      const emailInput = document.getElementById('email');
      const responseMessage = document.getElementById('response-message');

      // Check if the email field is not empty
      if (emailInput.value) {
        // Display a success message
        responseMessage.textContent = 'Thank you for subscribing!';

        // Clear the input field and message after 2 seconds
        setTimeout(() => {
          emailInput.value = '';
          responseMessage.textContent = ''; 
        }, 2000);
      }
    });
  }
});

// Set current year for copyright
document.getElementById('date').textContent = new Date().getFullYear();

// Hamburger Menu Toggle Logic
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Optional: Change icon (bars <-> times)
    const icon = mobileMenuButton.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
  });

  // Optional: Hide menu when a link is clicked (for single-page navigation)
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.querySelector('i').classList.remove('fa-times');
        mobileMenuButton.querySelector('i').classList.add('fa-bars');
      }
    });
  });
};