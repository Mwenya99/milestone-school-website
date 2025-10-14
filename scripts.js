document.addEventListener("DOMContentLoaded", () => {
  // 1. Select all elements with the 'scroll-animate' class
  const elementsToAnimate = document.querySelectorAll(".scroll-animate")})

  AOS.init();
  {
    threshold: 0.1 // Trigger the animation when 10% of the element is visible
  };

  AOS.init({
  duration: 1000 // Animation duration in milliseconds
});

  // 5. Tell the observer to watch each of our animated elements
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });