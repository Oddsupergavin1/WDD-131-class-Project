document.addEventListener("DOMContentLoaded", initMenuToggle);

document.addEventListener("DOMContentLoaded", initResponsiveUI);

function initResponsiveUI() {
  // Run once on load
  handleResize();

  // Run every time the window is resized
  window.addEventListener("resize", handleResize);
}

function handleResize() {
  var menu = document.querySelector(".menu");

  if (!menu) {
    console.warn("Menu element not found");
    return;
  }

  var isWideScreen = window.innerWidth > 1000;

  // Toggle visibility based on screen width
  if (isWideScreen) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}


function initMenuToggle() {
  var menuButton = document.querySelector(".linkButton");
  var nav = document.querySelector("nav");

  if (!menuButton || !nav) {
    console.error("Menu button or nav not found");
    return;
  }

  menuButton.addEventListener("click", toggleNavVisibility);
}

function toggleNavVisibility() {
  var nav = document.querySelector("nav");
  nav.classList.toggle("hide");
}

// Modal setup
const modal = document.createElement("dialog");
modal.innerHTML = `
  <img>
  <button class="close-viewer">X</button>
`;
document.body.appendChild(modal);

var gallery = document.querySelector(".gallery");
gallery.addEventListener("click", handleImageClick);

function handleImageClick(event) {
  var clickedImg = event.target.closest("img");
  if (!clickedImg) return;

  var smallSrc = clickedImg.getAttribute("src");
  var fullSrc = smallSrc.replace("-sm", "-full");

  var modalImg = modal.querySelector("img");
  modalImg.setAttribute("src", fullSrc);
  modalImg.setAttribute("alt", clickedImg.alt);

  modal.showModal();
}

var closeButton = modal.querySelector(".close-viewer");
closeButton.addEventListener("click", () => {
  modal.close();
});