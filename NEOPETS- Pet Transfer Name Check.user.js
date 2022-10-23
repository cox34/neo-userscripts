// ==UserScript==
// @name        NEOPETS: Pet Transfer Name Check
// @namespace   cox34-neoscripts
// @match       https://www.neopets.com/pound/transfer_status.phtml
// @grant       none
// @version     1.0
// @author      cox34
// ==/UserScript==

//someone on reddit requested this but didnt give any feedback
//here it is anyway

const container = document.querySelector(".contentModuleContent").querySelectorAll("td")[1];
const petName = container.textContent.split("Would you like to adopt ")[1].split(" for")[0];
let possibleScam = false;

petName.split("").forEach(letter => {
  if((letter.toUpperCase() === "I" && letter === letter.toUpperCase()) || (letter.toLowerCase() === "l" && letter === letter.toLowerCase())){
    possibleScam = true;
  }
});

const warning = document.createElement("div");

if(possibleScam){
  warning.textContent = "WARNING: This pet has an uppercase I or lowercase L. Check its name!";
  warning.style.backgroundColor = "darkred";
} else {
  warning.textContent = "This pet does not have an uppercase I or lowercase L. Make sure it's what you asked for regardless.";
  warning.style.backgroundColor = "green";
}
warning.style.padding = "5px";
warning.style.fontSize = "20px";
warning.style.fontFamily = "serif";
warning.style.color = "white";
warning.style.whiteSpace = "pre-line";
warning.textContent += "\nUPPERCASE NAME = " + petName.toUpperCase() + "\nlowercase name = " + petName.toLowerCase();
container.appendChild(warning);