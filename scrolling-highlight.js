document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');
    let ticking = false;
    
    const checkScroll = () => {
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
      });
      
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
    requestTick(); // Check on load
});

// Hero effect

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const hero = document.querySelector('.hero');
    hero.classList.add('loaded');
  }, 100);
});