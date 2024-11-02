// Logo animation
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo");
  const logoLink = document.querySelector(".logo-link");
  const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");

  const THRESHOLD = 25; // Adjust threshold based on your design requirements

function handleHover(e) {
  if (navigator.userAgent.indexOf("Firefox") === -1) {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;

    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

    logo.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
  }
}

function resetStyles(e) {
  logo.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}


  if (!motionMatchMedia.matches) {
    // Add the event listeners to the element for hover effect
    logoLink.addEventListener("mousemove", handleHover);
    logoLink.addEventListener("mouseleave", resetStyles);
  }
});

console.log("Script is running");
