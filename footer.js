function scrollToTop() {
  const duration = 800;
  const start = window.pageYOffset;
  const distance = -start;
  let currentTime = 0;
  const increment = 20;

  function animateScroll() {
    currentTime += increment;
    const easeProgress = easeOutQuad(currentTime / duration);
    const scrollPosition = start + distance * easeProgress;
    window.scrollTo(0, scrollPosition);

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  animateScroll();
}
