//Declare global variables for use throughout program
const menuButton = document.getElementById("menu-button");
const sidePanel = document.getElementById("side-nav-bar");
const carousel = document.getElementById("carousel");
const carouselPrev = document.getElementById("carousel-prev-button");
const carouselNext = document.getElementById("carousel-next-button");
const carouselImgCount = 5;
const carouselMoveSpeed = 7500;
var sidePanelOpen = false;
var userMobile = false;
var carouselImgID = 0;
var carouselTimer;
//Initialization commands for mobile
if (window.orientation !== undefined) {
  userMobile = true;
  document.getElementById("nav-header").innerHTML =
    "<img src='FHSS-logo.png' id='nav-header-logo'> FHS Robotics";
  sidePanel.style.width = "100vw";
  sidePanel.style.right = 0;
  sidePanel.style.top = "-93vh";
  document.getElementById("WAW-body").style.width = "95vw";
  document.getElementById("WAW-athena").style.position = "static";
  document.getElementById("WAW-athena").style.width = "90vw";
  document.getElementById("WAW-container").style.width = "96vw";
  document.getElementById("about-FIRST-body").style.width = "95vw";
  document.getElementById("about-FIRST-body").style.position = "static";
  document.getElementById("about-FIRST-logo").src = "vertical-FIRST-logo.png";
  document.getElementById("about-FIRST-logo").style.width = "90vw";
  document.getElementById("about-FIRST-logo").style.position = "static";
}
//General Initialization commands
window.onload = function () {
  carouselMove(0);
  carouselTimer = setInterval(function () {
    carouselMove(1, true);
  }, carouselMoveSpeed);
  menuButton.addEventListener("click", openCloseSidePanel);
  window.addEventListener("resize", function () {
    carouselPrev.style.top =
      carousel.offsetHeight / 2 - carouselPrev.offsetHeight / 2;
    carouselNext.style.top =
      carousel.offsetHeight / 2 - carouselNext.offsetHeight / 2;
  });
};

//Called when menu button clicked
function openCloseSidePanel() {
  sidePanelOpen = !sidePanelOpen;
  if (sidePanelOpen) {
    //Open menu from side if on desktop or if on mobile open from top.
    userMobile ? (sidePanel.style.top = "7vh") : (sidePanel.style.right = 0);
    sidePanel.style.opacity = 1;
    //Change menu button icon to an X
    document.getElementById("bar-two").style.opacity = 0;
    document.getElementById("bar-one").style.transform = "rotate(-45deg)";
    document.getElementById("bar-three").style.transform = "rotate(45deg)";
    document.getElementById("bar-one").style.top =
      window.innerHeight * 0.035 + "px";
    document.getElementById("bar-three").style.top =
      window.innerHeight * 0.035 + "px";
  } else {
    //Close menu
    userMobile
      ? (sidePanel.style.top = "-93vh")
      : (sidePanel.style.right = "-25vw");
    sidePanel.style.opacity = 0;
    //Return X button to triple bar icon.
    document.getElementById("bar-two").style.opacity = 1;
    document.getElementById("bar-one").style.transform = "rotate(0deg)";
    document.getElementById("bar-three").style.transform = "rotate(0deg)";
    document.getElementById("bar-one").style.top =
      window.innerHeight * 0.025 + "px";
    document.getElementById("bar-three").style.top =
      window.innerHeight * 0.045 + "px";
  }
}

function carouselMove(delta, auto) {
  if (!auto) {
    clearInterval(carouselTimer);
  }
  carouselImgID += delta;
  if (carouselImgID < 0) {
    carouselImgID = carouselImgCount - 1;
  } else if (carouselImgID >= carouselImgCount) {
    carouselImgID = 0;
  }
  for (
    var i = 0;
    i < document.getElementsByClassName("active-image").length;
    i++
  ) {
    document
      .getElementsByClassName("active-image")[i]
      .classList.remove("active-image");
  }
  document
    .getElementById("carousel-img-" + carouselImgID)
    .classList.add("active-image");
  document.getElementById("carousel-img-" + carouselImgID).style.width = "100%";
  document.getElementById("carousel-img-" + carouselImgID).style.height =
    "auto";
  if (
    document.getElementById("carousel-img-" + carouselImgID).offsetHeight >
    carousel.offsetHeight
  ) {
    document.getElementById("carousel-img-" + carouselImgID).style.width =
      "auto";
    document.getElementById("carousel-img-" + carouselImgID).style.height =
      "100%";
  } else {
    document.getElementById("carousel-img-" + carouselImgID).style.top =
      carousel.offsetHeight / 2 -
      document.getElementById("carousel-img-" + carouselImgID).offsetHeight / 2;
  }
}
