document.addEventListener("DOMContentLoaded", function () {
  loadHeader().then(initHeaderEffects);
});

// Load and inject the header dynamically
async function loadHeader() {
  try {
    const response = await fetch("/header.html");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    document.body.insertAdjacentHTML("afterbegin", data);
  } catch (error) {
    console.error("Error loading header:", error);
  }
}

// Initialize header animations and effects after it's loaded
function initHeaderEffects() {
  const stickyHeader = document.getElementById("sticky-header");
  const logoElement = document.getElementById("logo");
  const logoLink = document.querySelector(".logo-link");

  if (!stickyHeader || !logoElement || !logoLink) {
    console.error("Header elements not found.");
    return;
  }

  initScrollHide(stickyHeader);
  initLogoAnimation(logoElement, logoLink);
}

// Smooth hide/show effect on scroll
function initScrollHide(header) {
  let lastScrollTop = 0;
  let isTicking = false;

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      requestAnimationFrame(() => {
        isTicking = false;
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop) {
          header.classList.add("hide");
        } else {
          header.classList.remove("hide");
        }

        lastScrollTop = Math.max(0, currentScrollTop);
      });
      isTicking = true;
    }
  });
}

// Placeholder function for initializing logo animation
function initLogoAnimation(logo, logoLink) {
  // Add your logo animation logic here
  console.log("Logo animation initialized");
}

console.log("Header script loaded successfully.");