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
Copyright &copy; 2023<br>
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
