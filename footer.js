// footer.js
console.log("Footer script loaded");

// footer.js
const footerContent = `
<footer>
<div class="footer-buttons">
<!-- Go home button -->
<a href="../index.html">
  <button class="secondary-button">
  <span class="material-symbols-outlined">
home
</span>
Home Page</button>
</a>

<!-- Scroll to top button -->
<button onclick="scrollToTop()" class="tertiary-button">
<span class="material-symbols-outlined">
arrow_upward
</span>Scroll to Top</button>
</div>

<p style="color: #707070;">
Copyright &copy; 2025 Tim Portnoy<br>
Designed and programmed by Tim Portnoy
<a href="https://github.com/timonim/timonim.github.io">
  <i class="fa-brands fa-github fa-lg"></i>
</a>
</p>
</footer>
`;

// Check if the footer element exists
const footerElement = document.querySelector("footer");
if (footerElement) {
  footerElement.innerHTML = footerContent;
} else {
  // If the footer element does not exist, create a new one and append it to the body
  const newFooter = document.createElement("footer");
  newFooter.innerHTML = footerContent;
  document.body.appendChild(newFooter);
}

const ANIMATION_DURATION = 800;
const ANIMATION_INCREMENT = 20;

function scrollToTop() {
  let currentTime = 0;

  function animateScroll() {
    if (currentTime >= ANIMATION_DURATION) {
      window.scrollTo(0, 0);
      return;
    }

    currentTime += ANIMATION_INCREMENT;

    const easeProgress = easeInOutQuad(currentTime / ANIMATION_DURATION);
    const scrollPosition = (1 - easeProgress) * window.pageYOffset;

    try {
      window.scrollTo(0, scrollPosition);
    } catch (error) {
      console.error("Error during scrolling:", error);
    }

    requestAnimationFrame(animateScroll);
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  animateScroll();
}
