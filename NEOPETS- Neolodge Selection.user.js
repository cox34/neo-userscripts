// ==UserScript==
// @name        NEOPETS: Neolodge Selection
// @namespace   cox34-neoscripts
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/neolodge.phtml
// @grant       none
// @version     1.0
// @description Selects Neolodge options
// ==/UserScript==

document.querySelector("select[name='hotel_rate']").value = "5";
document.querySelector("select[name='nights']").value = "28";