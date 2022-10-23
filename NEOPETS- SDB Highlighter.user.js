// ==UserScript==
// @name        NEOPETS: SDB Highlighter
// @namespace   cox34-neoscripts
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/safetydeposit.phtml*
// @grant       none
// @version     1.2
// @description Highlights items in SDB
// ==/UserScript==

//add your own lists in this format
//item names are not exact, all items containing the item name will be highlighted
//upper or lowercase is fine
//remember your commas
/*
  {
    exact: true_or_false,
    color: "hex_or_color_name",
    items: [
      "item_name_contains",
      "item_name_contains",
      "item_name_contains",
    ]
  },
*/
const highlightLists = [

  {
    exact: false,
    color: "gold",
    items: [
      "nerkmid",
      "morphing potion",
    ]
  },

  {
    exact: true,
    color: "#d3a3a2",
    items: [
      "Nova",
"Weak Bottled Air Faerie",
"Weak Bottled Dark Faerie",
"Weak Bottled Light Faerie",
"Weak Bottled Water Faerie",
    ]
  },

];

const sdbitems = document.querySelector(".content").querySelectorAll("table")[3].querySelectorAll("tr[bgcolor^='#F']");

highlightLists.forEach((list) => {
  for(let sdbitem of sdbitems){
    if(list.exact === true){
      if(list.items.some(e => sdbitem.querySelector("td[align='left']").querySelector("b").childNodes[0].textContent.toLowerCase() === e.toLowerCase())){
        sdbitem.style.backgroundColor = list.color;
      }
    }
    else {
      if(list.items.some(e => sdbitem.querySelector("td[align='left']").querySelector("b").childNodes[0].textContent.toLowerCase().includes(e.toLowerCase()))){
        sdbitem.style.backgroundColor = list.color;
      }
    }
  }
});
