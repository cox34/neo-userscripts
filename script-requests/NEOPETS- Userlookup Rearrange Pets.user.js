// ==UserScript==
// @name        NEOPETS: Userlookup Rearrange Pets
// @namespace   cox34-neoscripts
// @match       https://www.neopets.com/userlookup.phtml
// @grant       none
// @version     1.0
// @author      cox34
// @description client side only, user requested script
// ==/UserScript==

const petContainer = document.querySelector("#userneopets #bxlist");
const pets = petContainer.querySelectorAll("li:not(.bx-clone)");
const petOrder = [
  "pet1",
  "pet2",
  "pet3",
];

petOrder.forEach(petName => {
  pets.forEach(pet => {
    if(petName === pet.innerText.split("\n\n\n")[1].split("\n")[0]){
      petContainer.append(pet);
    }
  });
});
