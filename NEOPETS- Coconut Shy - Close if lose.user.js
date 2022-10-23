// ==UserScript==
// @name        NEOPETS: Coconut Shy - Close if lose
// @namespace   cox34-neoscripts
// @match       https://www.neopets.com/halloween/process_cocoshy.phtml
// @grant       none
// @version     1.0
// @author      cox34
// @description Close the Coconut Shy window if you didn't win the grand prize
// ==/UserScript==

const prize = parseInt(document.querySelector("body").textContent.split("points=")[1].split("&totalnp="));
if(prize < 333){
  window.close();
}