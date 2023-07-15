// window.addEventListener('load', function() {
//   document.body.classList.add('loaded');
// });

let heroPill = document.getElementById("hero-pill");
let words = [
  "Products",
  "UI/UX",
  "Web",
  "Apps",
  "3D",
  "Marketing",
  "Branding",
  "Packagings",
  "Social",
  "AI Art",
];
let index = 0;
let prevWord = words[0]; // add a variable to store the previous word

setInterval(function () {
  let newWord = words[index];
  if (newWord !== prevWord) {
    // check if the word has changed
    heroPill.innerHTML = newWord;
    heroPill.classList.add("changed"); // add a class to trigger the animation
    setTimeout(function () {
      heroPill.classList.remove("changed"); // remove the class after the animation
    }, 300);
    prevWord = newWord; // store the new word as the previous word
  }
  index = (index + 1) % words.length;
}, 1000);

// hidden text

let button = document.getElementById("my-button");
let paragraph = document.getElementById("my-paragraph");

button.addEventListener("click", function () {
  paragraph.classList.toggle("hidden");
});
