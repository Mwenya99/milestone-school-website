document.addEventListener("DOMContentLoaded", () => {
  // Initialize the AOS (Animate on Scroll) library with all options in one object
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    threshold: 0.1, // Trigger the animation when 10% of the element is visible
    once: true,     // Whether animation should happen only once - while scrolling down
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