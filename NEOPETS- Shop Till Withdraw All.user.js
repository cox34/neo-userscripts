// ==UserScript==
// @name        NEOPETS: Shop Till Withdraw All
// @namespace   cox34-neoscripts
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/market.phtml?type=till
// @grant       none
// @version     1.0
// @description Sets collect amount to whatever is in the shop till
// ==/UserScript==

document.querySelector("input[name='amount']").value = parseInt(
  document.querySelector(".content")
  .querySelector("p")
  .querySelector("b")
  .textContent.match(/\d[\d,]+/)[0]
  .replace(/,/g,"")
);;