// ==UserScript==
// @name        NEOPETS: Close usershop after buying
// @namespace   cox34-neoscripts
// @match       https://www.neopets.com/browseshop.phtml?owner*
// @grant       window.close
// @version     1.0
// @author      cox34
// ==/UserScript==

//if you're like me and use your mouse's middle click to shop
//(which bypasses the "are you sure..." popup)
//the new tab that is opened after buying the item will be closed automatically

//this works only after buying because if you manually click
// previous 80 or next 80, lower is at the beginning of the url
// after buying its at the end of the url
if(window.location.toString().includes("&lower=")){
  window.close();
}
//document.querySelector("hr").previousSibling.textContent.includes("Item not found!") ||
