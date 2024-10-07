document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);

  const cursor = document.querySelector('.custom-cursor');
  const projects = gsap.utils.toArray('.project');
  let ticking = false;

  // Custom cursor animation (simplified for performance)
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power1.out'
    });
  });

  const checkScrollAndHover = () => {
    const viewportHeight = window.innerHeight;
    const triggerBottom = viewportHeight * 0.7; // 70% of viewport height
    const triggerTop = viewportHeight * 0.3; // 30% of viewport height

    projects.forEach(project => {
      const rect = project.getBoundingClientRect();
      const projectMiddle = (rect.top + rect.bottom) / 2;

      if (projectMiddle > triggerTop && projectMiddle < triggerBottom) {
        project.classList.add('scrolled');
      } else {
        project.classList.remove('scrolled');
      }

      // Check for hover effect on touch devices
      if ('ontouchstart' in window) {
        let startY = null;
        const handleTouchStart = (e) => { startY = e.touches[0].clientY; };
        const handleTouchEnd = (e) => {
          const endY = e.changedTouches[0].clientY;
          if (!startY || Math.abs(endY - startY) < 10) return; // Ignore short taps

          if (endY > startY) {
            gsap.to(project, { duration: 0.2, scale: 0.95, ease: 'power1.out' });
          } else {
            gsap.to(project, { duration: 0.2, scale: 1.02, ease: 'power1.out' });
          }

          startY = null;
        };

        project.addEventListener('touchstart', handleTouchStart);
        project.addEventListener('touchend', handleTouchEnd);

        // Clean up event listeners when the component is unmounted
        project.onbeforeunload = () => {
          project.removeEventListener('touchstart', handleTouchStart);
          project.removeEventListener('touchend', handleTouchEnd);
        };
      }
    });

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(checkScrollAndHover);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
  document.addEventListener('touchmove', requestTick, { passive: true }); // Ensure touch events trigger the scroll check
  requestTick(); // Check on load

  projects.forEach((project, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: project,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(project, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      delay: index * 0.1,
      force3D: true
    })
    .from(project.querySelector('.project-header'), {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4')
    .from(project.querySelector('.project-sub'), {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3');
  });

  const heroTl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      trigger: '.hero',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  // Set initial states outside timeline to avoid redundant queries
  gsap.set('.hero', { autoAlpha: 0, scale: 0.95 });
  gsap.set('.hero-text, #my-button, .button-container .tertiary-button, .bio-container p, .button-container button', { autoAlpha: 0, y: 10 });

  // Animate the hero section
  heroTl.to('.hero', {
    autoAlpha: 1,
    scale: 1,
    duration: 1.2,
    ease: 'power3.out'
  }, 'start');

  // Animate the hero text with a slight delay and different easing
  heroTl.to('.hero-text', {
    autoAlpha: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, 'start-=0.3');

  // Stagger the animations for elements with a delay of 0.2 seconds and different easing
  heroTl.staggerTo('.button-container button, .bio-container p, .button-container .tertiary-button', 0.8, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    ease: 'power3.out'
  }, 0.2, 'start-=0.3');

});

// More About Me functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('more-about-me-btn');
  const closeButton = document.getElementById('close-bio-btn');
  const bioContent = document.getElementById('bio-content');

  if (toggleButton && bioContent) {
    toggleButton.addEventListener('click', function(event) {
      event.preventDefault();

      if (!bioContent.classList.contains('hidden')) {
        // Hide the content
        gsap.to(bioContent, {
          duration: 0.5,
          height: 0,
          opacity: 0,
          margin: '0vw 0vw',
          padding: '0vw 6vw',
          ease: 'power1.inOut',
          onComplete: function() {
            bioContent.classList.add('hidden');
            ScrollTrigger.refresh(); // Refresh ScrollTrigger after hiding
          }
        });
      } else {
        // Show the content
        bioContent.classList.remove('hidden');
        
        // Calculate scroll position immediately
        const offset = 100; // Adjust this value as needed
        const bioRect = bioContent.getBoundingClientRect();
        const absoluteY = window.pageYOffset + bioRect.top - offset;

        // Start scrolling immediately
        window.scrollTo({
          top: absoluteY,
          behavior: 'smooth'
        });

        // Animate the content
        gsap.fromTo(bioContent, 
          {
            height: 0,
            opacity: 0,
            margin: '0vw 0vw',
            padding: '0vw 6vw'
          },
          {
            duration: 0.5,
            height: 'auto',
            opacity: 1,
            margin: '4vw 0', 
            padding: '6vw 6vw',
            ease: 'power1.inOut',
            onComplete: function() {
              ScrollTrigger.refresh(); // Refresh ScrollTrigger after showing
            }
          }
        );
      }
    });

    // Close button logic
    if (closeButton) {
      closeButton.addEventListener('click', function(event) {
        event.preventDefault();

        gsap.to(bioContent, {
          duration: 0.5,
          height: 0,
          opacity: 0,
          margin: '0vw 0vw',
          padding: '0vw 6vw',
          ease: 'power1.inOut',
          onComplete: function() {
            bioContent.classList.add('hidden');
            ScrollTrigger.refresh(); // Refresh ScrollTrigger after closing
          }
        });
      });
    } else {
      console.error('Close button not found');
    }
  } else {
    console.error('Button or bio content not found');
  }
});
