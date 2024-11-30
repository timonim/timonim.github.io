document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);

  const cursor = document.querySelector('.custom-cursor');
  const projects = gsap.utils.toArray('.project');
  const bentoBoxes = gsap.utils.toArray('.bento-box');

  // Custom cursor animation
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power1.out' });
  });

  const checkScrollAndHover = () => {
    projects.forEach(project => {
      const rect = project.getBoundingClientRect();
      const projectMiddle = (rect.top + rect.bottom) / 2;
      const viewportHeight = window.innerHeight;
      const triggerTop = viewportHeight * 0.3;
      const triggerBottom = viewportHeight * 0.7;

      if (projectMiddle > triggerTop && projectMiddle < triggerBottom) {
        project.classList.add('scrolled');
      } else {
        project.classList.remove('scrolled');
      }
    });
  };

  window.addEventListener('scroll', checkScrollAndHover);
  document.addEventListener('touchmove', checkScrollAndHover);

  // Animate projects
  const animateProjects = () => {
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
        duration: 0.6,
        ease: 'power3.out',
        delay: index * 0.1
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
  };

  // Animate bento boxes
  const animateBentoBoxes = () => {
    bentoBoxes.forEach((box, index) => {
      gsap.from(box, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: box,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
      });
    });
  };

  // Animate hero section
  const animateHero = () => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: '.hero',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Set initial states for elements
    gsap.set('.hero, .hero-text, .button-container button, .button-container .tertiary-button, .bio-container p, .card', {
      autoAlpha: 0,
      scale: 0.8,
      y: 10
    });

    // Animation timeline for hero section
    tl.to('.hero', { autoAlpha: 1, scale: 1, y: 0, duration: 1 }, 'start')
      .to('.hero-text', { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 }, 'start-=0.3')
      .staggerTo(['.button-container button', '.bio-container p', '.button-container .tertiary-button', '.card'], 0.8, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: 'power3.out'
      }, 0.15, 'start-=0.3');
  };

  // Bio text animation
  const sentences = document.querySelectorAll(".text-animation .sentence");
  
  gsap.set(sentences, { opacity: 0, y: 20 });
  
  gsap.to(sentences, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.2
  });

  // Initialize animations
  animateProjects();
  animateHero();
  animateBentoBoxes();
});