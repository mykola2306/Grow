let popupButton = document.getElementsByClassName("showPopup")[0];
let fixedEl = document.querySelector(".fixedSide");
let absoluteEl = document.querySelector(".absolute");

popupButton.addEventListener("click", function(){
  fixedEl.classList.toggle("hide")
  absoluteEl.classList.toggle("hide")
});