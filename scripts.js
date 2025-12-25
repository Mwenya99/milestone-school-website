// scripts.js - Enhanced with modern features
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    mirror: false,
    offset: 100
  });

  // Set current year
  document.getElementById('date').textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileMenuButton.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.querySelector('i').classList.add('fa-bars');
        mobileMenuButton.querySelector('i').classList.remove('fa-times');
      }
    });
  }

  // Back to Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
        scrollTopBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'invisible');
        scrollTopBtn.classList.remove('opacity-100', 'visible');
      }
    });
    
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Counter Animation
  function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      
      // Start counter when in viewport
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCounter();
          observer.unobserve(counter);
        }
      }, { threshold: 0.5 });
      
      observer.observe(counter);
    });
  }
  
  // Initialize counters
  animateCounter();

  // Gallery Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const imageCaption = document.getElementById('image-caption');
  const closeLightbox = document.getElementById('close-lightbox');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  let currentImageIndex = 0;
  const images = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt,
    caption: item.querySelector('h3')?.textContent || ''
  }));
  
  if (galleryItems.length && lightbox) {
    galleryItems.forEach((item, index) => {
      item.querySelector('.view-image')?.addEventListener('click', () => {
        openLightbox(index);
      });
      
      item.querySelector('img')?.addEventListener('click', () => {
        openLightbox(index);
      });
    });
    
    function openLightbox(index) {
      currentImageIndex = index;
      updateLightbox();
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    
    function updateLightbox() {
      lightboxImage.src = images[currentImageIndex].src;
      lightboxImage.alt = images[currentImageIndex].alt;
      imageCaption.textContent = images[currentImageIndex].caption;
    }
    
    function closeLightboxFunc() {
      lightbox.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
    
    function showNext() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateLightbox();
    }
    
    function showPrev() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      updateLightbox();
    }
    
    // Event listeners
    closeLightbox?.addEventListener('click', closeLightboxFunc);
    prevBtn?.addEventListener('click', showPrev);
    nextBtn?.addEventListener('click', showNext);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('hidden')) return;
      
      if (e.key === 'Escape') closeLightboxFunc();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
    
    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightboxFunc();
    });
  }

  // Gallery Filter
  const filterButtons = document.querySelectorAll('.gallery-filter');
  const galleryItemsAll = document.querySelectorAll('.gallery-item');
  
  // Function to filter gallery items
  function filterGallery(filter) {
    // Update URL without reload
    const url = new URL(window.location);
    if (filter === 'all') {
      url.searchParams.delete('filter');
    } else {
      url.searchParams.set('filter', filter);
    }
    window.history.pushState({}, '', url);
    
    // Remove active styling from all buttons
    filterButtons.forEach(btn => {
      btn.classList.remove('active', 'bg-gradient-to-r', 'from-primary', 'to-teal-500', 'text-white', 'shadow-lg');
      btn.classList.add('bg-white', 'text-gray-700', 'shadow-soft');
    });
    
    // Add active styling to selected button
    const activeButton = Array.from(filterButtons).find(btn => btn.getAttribute('data-filter') === filter);
    if (activeButton) {
      activeButton.classList.remove('bg-white', 'text-gray-700', 'shadow-soft');
      activeButton.classList.add('active', 'bg-gradient-to-r', 'from-primary', 'to-teal-500', 'text-white', 'shadow-lg');
    }
    
    // Filter items with smooth animation
    galleryItemsAll.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }
  
  if (filterButtons.length) {
    // Check URL parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter') || 'all';
    filterGallery(filterParam);
    
    // Add click handlers to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = button.getAttribute('data-filter');
        filterGallery(filter);
      });
    });
  }

  // Load More Button for Gallery
  const loadMoreBtn = document.getElementById('load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // Simulate loading more items
      loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
      loadMoreBtn.disabled = true;
      
      setTimeout(() => {
        // Add more items here
        loadMoreBtn.innerHTML = 'No More Photos <i class="fas fa-check ml-2"></i>';
        loadMoreBtn.classList.remove('from-primary', 'to-accent');
        loadMoreBtn.classList.add('bg-gray-300', 'text-gray-600');
        loadMoreBtn.disabled = true;
      }, 1500);
    });
  }

  // Active Navigation Link Highlighting
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html') ||
        (currentPage === 'index.html' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Newsletter Form
  const newsletterForm = document.getElementById('footer-newsletter');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      
      if (!emailInput.value) {
        showToast('Please enter your email address', 'error');
        return;
      }
      
      // Save original button text
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        showToast('Thank you for subscribing to our newsletter!', 'success');
        emailInput.value = '';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Toast Notification Function
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-hard transform translate-x-full opacity-0 transition-all duration-500 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.innerHTML = `
      <div class="flex items-center space-x-3">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
      toast.classList.remove('translate-x-0', 'opacity-100');
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // Parallax Effect on Hero Section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
  }

  // Floating WhatsApp Button
  const whatsappBtn = document.createElement('a');
  whatsappBtn.href = 'https://wa.me/260978443323';
  whatsappBtn.target = '_blank';
  whatsappBtn.className = 'fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full shadow-hard flex items-center justify-center text-white text-2xl animate-float hover:shadow-glow hover:scale-110 transition-all duration-300';
  whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
  whatsappBtn.title = 'Chat with us on WhatsApp';
  document.body.appendChild(whatsappBtn);

  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('opacity-0');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    });
  }
});

// Initialize when page loads
window.addEventListener('load', () => {
  // Add loaded class for CSS transitions
  document.body.classList.add('loaded');
});