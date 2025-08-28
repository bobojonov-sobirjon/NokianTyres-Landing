/**
* Template Name: Strategy
* Template URL: https://bootstrapmade.com/strategy-bootstrap-agency-template/
* Updated: Jun 06 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    
    // Function to initialize isotope
    function initializeIsotope() {
      try {
        const container = isotopeItem.querySelector('.isotope-container');
        if (!container) {
          console.error('Isotope container not found');
          return;
        }
        
        initIsotope = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
          transitionDuration: '0.4s'
        });
        console.log('Isotope initialized successfully');
        
        // Initialize filters after isotope is ready
        initializeFilters();
      } catch (error) {
        console.error('Error initializing Isotope:', error);
      }
    }
    
    // Initialize filter functionality
    function initializeFilters() {
      const filterButtons = isotopeItem.querySelectorAll('.isotope-filters li');
      filterButtons.forEach(function(filterBtn) {
        filterBtn.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all filters
          filterButtons.forEach(btn => btn.classList.remove('filter-active'));
          
          // Add active class to clicked filter
          this.classList.add('filter-active');
          
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          console.log('Filtering by:', filterValue);
          
          // Apply filter
          if (initIsotope) {
            initIsotope.arrange({
              filter: filterValue
            });
            
            // Reinitialize AOS after filtering
            if (typeof AOS !== 'undefined') {
              AOS.refresh();
            }
          }
        });
      });
    }
    
    // Try to use imagesLoaded, but fallback to immediate initialization
    if (typeof imagesLoaded !== 'undefined') {
      try {
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
          initializeIsotope();
        });
      } catch (error) {
        console.warn('imagesLoaded failed, initializing immediately:', error);
        initializeIsotope();
      }
    } else {
      console.warn('imagesLoaded not available, initializing immediately');
      initializeIsotope();
    }
  });

  /**
   * Frequently Asked Questions Toggle - REMOVED (replaced by new implementation below)
   */

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Hero Tire Selection Functionality - tire-selection.html style
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize tire selection
    const tireSelection = new HeroTireSelection();
    tireSelection.init();
  });

  class HeroTireSelection {
    constructor() {
      this.currentStep = 1;
      this.totalSteps = 2;
      this.quizData = {
        selectionType: 'by_car',
        carMake: '',
        carModel: '',
        season: ''
      };
    }
    
    init() {
      this.bindEvents();
      this.updateProgress();
      this.updateStepIndicator();
    }
    
    bindEvents() {
      // Selection type cards
      document.querySelectorAll('.hero-selection-card').forEach(card => {
        card.addEventListener('click', (e) => {
          this.selectCard(e.currentTarget);
        });
      });
      
      // Season selection
      document.querySelectorAll('.hero-option-card[data-season]').forEach(card => {
        card.addEventListener('click', (e) => {
          this.selectSeason(e.currentTarget);
        });
      });
      
      // Navigation buttons
      const nextBtn = document.getElementById('nextBtn');
      const backBtn = document.getElementById('backBtn');
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          this.nextStep();
        });
      }
      
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.previousStep();
        });
      }
      
      // Back to website button
      const backToWebsiteBtn = document.getElementById('backToWebsiteBtn');
      if (backToWebsiteBtn) {
        backToWebsiteBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.backToWebsite();
        });
      }
    }
    
    selectCard(card) {
      // Remove active class from all cards
      document.querySelectorAll('.hero-selection-card').forEach(c => c.classList.remove('active'));
      
      // Add active class to selected card
      card.classList.add('active');
      
      // Store selection
      this.quizData.selectionType = card.dataset.type;
      
      // Add visual feedback
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
      
      // If car selection, show next step after delay
      if (this.quizData.selectionType === 'by_car') {
        setTimeout(() => {
          this.nextStep();
        }, 500);
      }
    }
    
    selectSeason(card) {
      // Remove selected class from all season cards
      document.querySelectorAll('.hero-option-card[data-season]').forEach(c => c.classList.remove('selected'));
      
      // Add selected class to clicked card
      card.classList.add('selected');
      
      // Store selection
      this.quizData.season = card.dataset.season;
      
      // Add visual feedback
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    }
    
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.showStep(this.currentStep);
        this.updateProgress();
        this.updateStepIndicator();
      }
    }
    
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.showStep(this.currentStep);
        this.updateProgress();
        this.updateStepIndicator();
      }
    }
    
    showStep(step) {
      // Hide all steps
      document.getElementById('step1').classList.add('hidden');
      document.getElementById('step2').classList.add('hidden');
      
      // Show current step
      document.getElementById(`step${step}`).classList.remove('hidden');
    }
    
    updateProgress() {
      const progressFill = document.getElementById('progressFill');
      if (progressFill) {
        const progress = (this.currentStep / this.totalSteps) * 100;
        progressFill.style.width = `${progress}%`;
      }
    }
    
    updateStepIndicator() {
      const dots = document.querySelectorAll('.step-dot');
      dots.forEach((dot, index) => {
        if (index < this.currentStep) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    backToWebsite() {
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Hero Selection Cards functionality
   */
  document.addEventListener('DOMContentLoaded', function() {
    const selectionCards = document.querySelectorAll('.hero-selection-card');
    
    selectionCards.forEach(card => {
      card.addEventListener('click', function() {
        // Remove active class from all cards
        selectionCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
        
        // Get selection type
        const selectionType = this.dataset.selection;
        console.log('Selected:', selectionType);
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
        
        // Here you can add logic to proceed to next step
        // For example, redirect to tire selection page or show form
      });
    });
  });

  /**
   * New FAQ Accordion functionality
   */
  document.addEventListener('DOMContentLoaded', function() {
    console.log('FAQ: DOM loaded, initializing...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('FAQ: Found', faqItems.length, 'FAQ items');
    
    faqItems.forEach(function(item, index) {
      const header = item.querySelector('.faq-header');
      const toggle = item.querySelector('.faq-toggle');
      
      console.log('FAQ item', index, ':', {
        header: header ? 'found' : 'missing',
        toggle: toggle ? 'found' : 'missing'
      });
      
      if (header && toggle) {
        header.addEventListener('click', function() {
          console.log('FAQ item', index, 'clicked');
          
          // Close all other items
          faqItems.forEach(function(otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherToggle = otherItem.querySelector('.faq-toggle');
              if (otherToggle) {
                otherToggle.textContent = '+';
              }
            }
          });
          
          // Toggle current item
          if (item.classList.contains('active')) {
            item.classList.remove('active');
            toggle.textContent = '+';
            console.log('FAQ item', index, 'closed');
          } else {
            item.classList.add('active');
            toggle.textContent = '×';
            console.log('FAQ item', index, 'opened');
          }
        });
        
        console.log('FAQ item', index, 'event listener attached');
      }
    });
    
    console.log('FAQ: Initialization complete');
  });

  /**
   * Simple Portfolio Filtering (without Isotope.js dependency)
   */
  function initializePortfolioFiltering() {
    console.log('=== Portfolio Filtering Initialization ===');
    
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
      const portfolioSection = document.querySelector('#portfolio');
      if (!portfolioSection) {
        console.error('Portfolio section not found!');
        return;
      }
      console.log('Portfolio section found:', portfolioSection);

      const filterButtons = portfolioSection.querySelectorAll('.portfolio-filters li');
      const portfolioItems = portfolioSection.querySelectorAll('.portfolio-item');

      console.log('Filter buttons found:', filterButtons.length);
      console.log('Portfolio items found:', portfolioItems.length);

      // Log filter button details
      filterButtons.forEach((btn, index) => {
        console.log(`Filter button ${index}:`, {
          text: btn.textContent.trim(),
          filter: btn.getAttribute('data-filter'),
          classes: btn.className
        });
      });

      // Log portfolio item details
      portfolioItems.forEach((item, index) => {
        console.log(`Portfolio item ${index}:`, {
          classes: item.className,
          title: item.querySelector('h4')?.textContent || 'No title'
        });
      });

      // Add click event listeners to filter buttons
      filterButtons.forEach(function(filterBtn) {
        filterBtn.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Filter button clicked:', this.textContent.trim());
          
          // Remove active class from all filters
          filterButtons.forEach(btn => btn.classList.remove('filter-active'));
          
          // Add active class to clicked filter
          this.classList.add('filter-active');
          
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          console.log('Filtering by:', filterValue);
          
          // Apply filter
          portfolioItems.forEach(function(item, index) {
            if (filterValue === '*') {
              // Show all items
              console.log(`Showing item ${index}: all items filter`);
              item.style.display = 'block';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            } else {
              // Check if item has the filter class
              const filterClass = filterValue.replace('.', '');
              const hasFilterClass = item.classList.contains(filterClass);
              console.log(`Item ${index} has filter class '${filterClass}':`, hasFilterClass);
              
              if (hasFilterClass) {
                console.log(`Showing item ${index} with filter class ${filterClass}`);
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              } else {
                console.log(`Hiding item ${index} - no filter class ${filterClass}`);
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                  item.style.display = 'none';
                }, 300);
              }
            }
          });
          
          // Reinitialize AOS after filtering
          if (typeof AOS !== 'undefined') {
            setTimeout(() => {
              AOS.refresh();
              console.log('AOS refreshed');
            }, 500);
          }
        });
      });

      console.log('Portfolio filtering initialized successfully!');
      
      // Test: show initial state
      console.log('Initial state: showing all items');
      portfolioItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      });
      
    }, 500); // Wait 500ms for everything to load
  }

  // Initialize portfolio filtering when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio filtering');
    initializePortfolioFiltering();
  });

  // Also initialize on window load
  window.addEventListener('load', function() {
    console.log('Window loaded, initializing portfolio filtering');
    initializePortfolioFiltering();
  });

  // Additional initialization for dynamic content
  document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
      console.log('Document ready state complete, initializing portfolio filtering');
      initializePortfolioFiltering();
    }
  });

})();