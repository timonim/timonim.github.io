// Logo animation
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo");
  const logoLink = document.querySelector(".logo-link");
  const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
  const THRESHOLD = 15; // Adjust the threshold value for faster reaction time

  function handleHover(e) {
    // Check if the browser is Firefox
    if (navigator.userAgent.indexOf("Firefox") === -1) {
      const { clientX, clientY, currentTarget } = e;
      const { clientWidth, clientHeight, offsetLeft, offsetTop } =
        currentTarget;

      // Calculate the horizontal and vertical position relative to the element
      const horizontal = (clientX - offsetLeft) / clientWidth;
      const vertical = (clientY - offsetTop) / clientHeight;

      // Calculate the rotation angles based on the position
      const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
      const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

      // Apply the transform style with the rotation angles
      logo.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
    }
  }

  function resetStyles(e) {
    // Reset the transform style when the cursor leaves the element
    logo.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
  }

  if (!motionMatchMedia.matches) {
    // Add the event listeners to the element for hover effect
    logoLink.addEventListener("mousemove", handleHover);
    logoLink.addEventListener("mouseleave", resetStyles);
  }
});

console.log("Script is running");
