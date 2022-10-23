// ==UserScript==
// @name        NEOPETS: User Shops Unstyle
// @namespace   cox34-neoscripts
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/browseshop.phtml*
// @grant       none
// @version     1.0
// @description Remove user styles from shops
// ==/UserScript==

if(document.querySelector(".content").querySelector("style")){
  document.querySelector(".content").querySelector("style").remove();
}
for(node of document.querySelector(".content").childNodes){
  if(node.nodeType === 8 && node.textContent === " desc start "){
    while(node.nextSibling.nodeType !== 8 && node.nextSibling.textContent !== " desc end "){
      node.nextSibling.remove();
    }
    break;
  }
}
