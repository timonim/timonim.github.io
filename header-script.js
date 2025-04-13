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

// Smooth hide/show effect on scroll with hover delay on desktop
function initScrollHide(header) {
  let lastScrollTop = 0;
  let isTicking = false;
  let isHovering = false;
  let hideTimeoutId = null;
  const hideDelay = 300; // milliseconds delay before hiding
  const desktopBreakpoint = 1024; // Consider screens >= 1024px as desktop

  header.addEventListener('mouseenter', () => {
    if (window.innerWidth >= desktopBreakpoint) {
      isHovering = true;
      // Cancel any pending hide operation when hovering
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
        hideTimeoutId = null;
      }
      // Ensure header is visible upon hover
      header.classList.remove('hide');
    }
  });

  header.addEventListener('mouseleave', () => {
    if (window.innerWidth >= desktopBreakpoint) {
      isHovering = false;
      // If user scrolls down *after* mouse leaves, the scroll handler will re-initiate the hide timer
    }
  });

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(() => {
        isTicking = false;
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isDesktop = window.innerWidth >= desktopBreakpoint;

        // Always clear any pending hide timer at the start of a scroll check
        if (hideTimeoutId) {
            clearTimeout(hideTimeoutId);
            hideTimeoutId = null;
        }

        if (currentScrollTop > lastScrollTop) {
          // Scrolling Down
          if (isDesktop) {
            // Only hide if not hovering and scrolled past a small threshold (e.g., 10px)
            if (!isHovering && currentScrollTop > 10) {
              hideTimeoutId = setTimeout(() => {
                header.classList.add('hide');
                hideTimeoutId = null; // Clear ID after execution
              }, hideDelay);
            }
            // If hovering, do nothing (mouseenter ensures it's visible)
          } else {
            // On mobile, hide immediately if scrolled down
            if (currentScrollTop > 10) {
                 header.classList.add('hide');
            }
          }
        } else if (currentScrollTop < lastScrollTop) {
          // Scrolling Up - always show immediately
          header.classList.remove('hide');
        }
        // If currentScrollTop === lastScrollTop, do nothing

        lastScrollTop = Math.max(0, currentScrollTop); // Prevent negative values
      });
      isTicking = true;
    }
  });

  // Optional: Initial check in case page loads scrolled down
  const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
   if (initialScrollTop > 10) { // Use the same threshold
       if (window.innerWidth < desktopBreakpoint) { // Hide only on mobile initially if scrolled
           header.classList.add('hide');
       }
   }
   lastScrollTop = Math.max(0, initialScrollTop); // Initialize lastScrollTop correctly
}

// Placeholder function for initializing logo animation
function initLogoAnimation(logo, logoLink) {
  // Add your logo animation logic here
  console.log("Logo animation initialized");
}

console.log("Header script loaded successfully.");