// ==UserScript==
// @name        NEOPETS: Wishing Well Input
// @author      cox34
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/wishing.phtml*
// @grant       none
// @version     1.0
// @description Input wishing well wish
// ==/UserScript==

document.getElementsByName("donation")[0].value = 21;
document.getElementsByName("wish")[0].value = "Neopets 22nd Birthday Goodie Bag";
