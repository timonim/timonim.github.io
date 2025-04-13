document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  const projects = document.querySelectorAll('.project'); // Includes .social-card with .project class
  const bentoBoxes = document.querySelectorAll('.bento-box');
  const heroElement = document.querySelector('.hero');
  const sentences = document.querySelectorAll(".text-animation .sentence");

  // --- Cursor Logic ---
  let isCursorOverInteractive = false;

  document.addEventListener('mousemove', (e) => {
    anime({
      targets: cursor,
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
      scale: isCursorOverInteractive ? 1.5 : 1, // Scale up cursor on hover
      duration: 100,
      easing: 'easeOutQuad'
    });
  });

  // Function to handle hover effects
  const addHoverEffects = (elements) => {
    elements.forEach(el => {
      // Skip adding hover effects if the element has the ID 'category-title'
      if (el.id === 'category-title') {
        return; // Go to the next element
      }

      el.addEventListener('mouseenter', () => {
        // Prevent hover effect if entrance animation is still running
        if (el.dataset.animationInProgress === 'true') {
            return;
        }
        isCursorOverInteractive = true;
        anime({
          targets: el,
          scale: 1.03,
          duration: 200, // Increased from 120 to make hover slower
          easing: 'easeOutExpo'
        });
        anime({ targets: cursor, scale: 1.5, duration: 200, easing: 'easeOutExpo' }); // Match cursor animation speed
      });

      el.addEventListener('mouseleave', () => {
        isCursorOverInteractive = false;
        anime({
          targets: el,
          scale: 1,
          duration: 200, // Increased from 120 to make hover out slower
          easing: 'easeOutExpo'
        });
        anime({ targets: cursor, scale: 1, duration: 200, easing: 'easeOutExpo' }); // Match cursor animation speed
      });
    });
  };

  // Apply hover effects
  addHoverEffects(projects);
  addHoverEffects(bentoBoxes);

  // --- Intersection Observer Setup ---
  const observerOptions = {
    root: null, // relative to document viewport
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  // Observer for adding/removing 'scrolled' class (no change needed here)
  const scrollClassObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scrolled');
      } else {
        entry.target.classList.remove('scrolled');
      }
    });
  }, { rootMargin: '-30% 0px -30% 0px' });

  // Track scroll position to determine direction
  let lastScrollTop = 0;
  let scrollingDown = true;
  let isScrolling = false;
  let scrollTimeout = null;
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      // Use requestAnimationFrame for better performance
      window.requestAnimationFrame(() => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        scrollingDown = st > lastScrollTop;
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        
        // Set scrolling flag
        isScrolling = true;
        ticking = false;
      });
      ticking = true;
    }
    
    // Clear the previous timeout
    clearTimeout(scrollTimeout);
    
    // Set a timeout to run after scrolling ends
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      
      // More reliable way to check for missed animations
      checkMissedAnimations();
    }, 150); // Wait a bit after scrolling stops
  });
  
  // Separate function to check for missed animations (can be called from multiple places)
  const checkMissedAnimations = () => {
    // Check for any missed animations when scrolling stops
    document.querySelectorAll('[data-animation-type]').forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
        rect.bottom >= 0
      );
      
      if (isVisible && !el.dataset.hasAnimated) {
        const animationType = el.dataset.animationType;
        const index = parseInt(el.dataset.index || '0', 10);
        
        // Trigger animation for missed elements
        if (animationType === 'project') {
          animateProject(el, index);
        } else if (animationType === 'bento') {
          animateBentoBox(el, index);
        }
        
        el.dataset.hasAnimated = 'true';
      }
    });
  };

  // Observer for triggering entrance/exit animations
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const target = entry.target;
      const animationType = target.dataset.animationType;
      const index = parseInt(target.dataset.index || '0', 10);

      // Only stop animations if starting a new one
      if (entry.isIntersecting && (scrollingDown || animationType === 'hero')) {
        // If this element hasn't been animated or it's the hero section
        if (!target.dataset.hasAnimated || animationType === 'hero') {
          if (target.dataset.animationInProgress === 'true') return;
          
          // Stop any existing animations only if we're about to start a new one
          anime.remove(target);
          
          // Also remove animations on children if applicable (projects)
          if (animationType === 'project') {
            const header = target.querySelector('.project-header');
            const sub = target.querySelector('.project-sub');
            if(header) anime.remove(header);
            if(sub) anime.remove(sub);
          }
          
          // Element is entering the viewport - Play entrance animation
          if (animationType === 'project') {
            animateProject(target, index);
          } else if (animationType === 'bento') {
            animateBentoBox(target, index);
          } else if (animationType === 'hero') {
            // Hero animation only runs once on load usually
            animateHeroSection(target);
          }
          
          // Mark element as animated to prevent re-animation
          target.dataset.hasAnimated = 'true';
        }
      }
      // No need for exit animations as we want elements to stay visible
    });
  }, observerOptions); // Use the standard observer options

  // Modified animation functions to ensure completion
  
  // Animate individual project (Entrance)
  const animateProject = (project, index) => {
    // Prevent starting animation if one is already in progress
    if (project.dataset.animationInProgress === 'true') return;
    
    project.dataset.animationInProgress = 'true';
    
    const header = project.querySelector('.project-header');
    const sub = project.querySelector('.project-sub');

    const tl = anime.timeline({
      easing: 'easeOutCubic', // Smoother easing
      delay: index * 60, // More natural staggered delay
      complete: () => {
        // Mark animation as completed
        project.dataset.animationInProgress = 'false';
        // Ensure element is fully visible when animation completes
        project.style.opacity = 1;
        project.style.transform = 'translateY(0) scale(1)';
        if (header) header.style.opacity = 1;
        if (sub) sub.style.opacity = 1;
      }
    });

    tl.add({
      targets: project,
      opacity: [0, 1],
      translateY: [30, 0], // More subtle movement
      scale: [0.96, 1], // More subtle scale change
      duration: 650, // Longer duration for smoother animation
    });

    if (header) {
      tl.add({
        targets: header,
        opacity: [0, 1],
        translateY: [12, 0], // More subtle movement
        duration: 500, // Longer duration
        easing: 'easeOutCubic' // Smoother easing
      }, '-=450'); // Smoother overlap
    }

    if (sub) {
      tl.add({
        targets: sub,
        opacity: [0, 1],
        translateY: [12, 0], // More subtle movement
        duration: 500, // Longer duration
        easing: 'easeOutCubic' // Smoother easing
      }, '-=400'); // Smoother overlap
    }
  };

  // Animate individual project (Exit)
  const animateProjectExit = (project) => {
    const header = project.querySelector('.project-header');
    const sub = project.querySelector('.project-sub');

    const tl = anime.timeline({
      easing: 'easeInExpo', // Snappier exit easing
      duration: 150 // Even faster exit
    });

    // Animate header/sub out first if they exist
    if (header) {
        tl.add({
            targets: header,
            opacity: 0,
            translateY: 15, // Less distance for quicker movement
        }, 0);
    }
    if (sub) {
        tl.add({
            targets: sub,
            opacity: 0,
            translateY: 15, // Less distance for quicker movement
        }, 0); // Start at the same time as header exit
    }

    // Animate the main project card out
    tl.add({
      targets: project,
      opacity: 0,
      translateY: 40, // Less distance for quicker movement
      scale: 0.92,
    }, header || sub ? 20 : 0); // Tighter offset
  };

  // Animate individual bento box (Entrance)
  const animateBentoBox = (box, index) => {
    // Prevent starting animation if one is already in progress
    if (box.dataset.animationInProgress === 'true') return;
    
    box.dataset.animationInProgress = 'true';
    
    anime({
      targets: box,
      opacity: [0, 1],
      translateY: [25, 0], // More subtle movement
      scale: [0.97, 1], // More subtle scale change
      duration: 700, // Longer duration for smoother animation
      easing: 'easeOutCubic', // Smoother easing
      delay: index * 70, // More spaced out for smoother staggering
      complete: () => {
        // Mark animation as completed
        box.dataset.animationInProgress = 'false';
        // Ensure element is fully visible when animation completes
        box.style.opacity = 1;
        box.style.transform = 'translateY(0) scale(1)';
      }
    });
  };

  // Animate individual bento box (Exit)
  const animateBentoBoxExit = (box) => {
    anime({
      targets: box,
      opacity: 0,
      translateY: 40, // Less distance for snappier effect
      scale: 0.92, // Less scaling for snappier effect
      duration: 150, // Much faster exit
      easing: 'easeInExpo' // Snappier exit easing
    });
  };

  // Animate Hero Section
  const animateHeroSection = (hero) => {
     const heroText = hero.querySelector('.hero-text');
     const buttons = hero.querySelectorAll('.button-container button, .button-container .tertiary-button');
     const bioParagraphs = hero.querySelectorAll('.bio-container p');
     const card = hero.querySelector('.card');
     const elementsToAnimate = [...buttons, ...bioParagraphs, card].filter(el => el);

     // Split hero text into letters, preserving orange color
     if (heroText) {
        let newHTML = '';
        heroText.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                // Wrap letters in normal text nodes
                newHTML += node.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN' && node.style.color === 'rgb(255, 153, 0)') { // Check for the orange span
                // Wrap letters in the orange span, adding the style to each letter
                newHTML += node.textContent.replace(/\S/g, "<span class='letter' style='color: #ff9900;'>$&</span>");
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
                 // Keep the line break
                 newHTML += '<br />';
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Keep other potential elements (safer)
                newHTML += node.outerHTML;
            }
        });
        heroText.innerHTML = newHTML;
     }

    const tl = anime.timeline({
      easing: 'easeOutCubic', // Smoother easing
    });

    tl.add({
        targets: hero,
        opacity: [0, 1],
        scale: [0.98, 1], // More subtle scale change
        translateY: [-15, 0], // More subtle movement
        duration: 900 // Longer hero fade in for smoothness
      }, 0)
      .add({
        targets: heroText ? heroText.querySelectorAll('.letter') : [], // Target all letters
        opacity: [0,1],
        translateY: ["0.8em", 0], // More subtle movement
        translateX: ["0.2em", 0], // More subtle movement
        translateZ: 0,
        duration: 800, // Longer duration for smoothness
        easing: "easeOutQuad",
        delay: anime.stagger(25, {start: 100}) // More natural staggering
      }, 150) // Start letters slightly later for better flow
      .add({
        targets: elementsToAnimate,
        opacity: [0, 1],
        translateY: [-15, 0], // More subtle movement
        scale: [0.97, 1], // More subtle scale
        duration: 800, // Longer duration for smoothness
        delay: anime.stagger(100), // More spaced out for natural flow
        easing: 'easeOutCubic'
      }, 250); // Better timing with the letter animations
  };


  // Bio text animation (on load)
  const animateSentences = () => {
      // Split sentences into words
      sentences.forEach(sentence => {
          let words = sentence.textContent.split(' ');
          sentence.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
      });

      anime({
          targets: '.text-animation .word',
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.85, 1],
          duration: 800, // Faster word animation
          easing: "easeOutCubic",
          delay: anime.stagger(15) // Faster word stagger
      });
  };


  // --- Initialize Animations & Observers ---

  // Observe projects for scroll class toggling and animation trigger
  projects.forEach((project, index) => {
    scrollClassObserver.observe(project);
    project.dataset.animationType = 'project';
    project.dataset.index = index;
    // Set initial state to hidden
    project.style.opacity = 0;
    project.style.transform = `translateY(50px) scale(0.9)`;
    animationObserver.observe(project);
  });

  // Observe bento boxes for animation trigger
  bentoBoxes.forEach((box, index) => {
    box.dataset.animationType = 'bento';
    box.dataset.index = index;
    // Set initial state to hidden
    box.style.opacity = 0;
    box.style.transform = `translateY(50px) scale(0.9)`; // Removed rotate(5deg)
    animationObserver.observe(box);
  });

  // Observe hero section for animation trigger (only runs once typically)
  if (heroElement) {
    heroElement.dataset.animationType = 'hero';
    // Initial state handled within animateHeroSection
    animationObserver.observe(heroElement);
  }

  // Trigger sentence animation on load
  if (sentences.length > 0) {
      // Initial state handled within animateSentences
      animateSentences();
  }

  // Initial check for elements already in viewport on load
  window.addEventListener('load', () => {
    // Give a small delay for everything to render
    setTimeout(checkMissedAnimations, 300);
  });

});