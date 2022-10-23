// ==UserScript==
// @name        NEOPETS: Quickstock Helper
// @namespace   cox34-neoscripts
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/quickstock.phtml
// @grant       none
// @version     1.0
// @description Highlights items in quickstock, selects action
// ==/UserScript==

//add your own lists in this format
//upper or lowercase is fine
//remember your commas
/*
  {
    action: "stock_OR_deposit_OR",
    match: "exact_OR_partial_OR_any",
    color: "hex_OR_color_name",
    items: [
      "item_name_OR_name_contains",
      "item_name_OR_name_contains",
      "item_name_OR_name_contains",
    ]
  },
*/

const excludeNeoCashItems = true;
const lists = [

  {
    //default
    match: "any",
    action: "deposit",
    color: "",
    items: []
  },

  {
    match: "partial",
    action: "stock",
    color: "gold",
    items: [
      "Baby Paint Brush",
      "nerkmid",
      "morphing potion",
    ]
  },

  {
    match: "exact",
    action: "deposit",
    color: "tan",
    items: [
      "Mau Codestone",
      "Tai-Kai Codestone",
      "Lu Codestone",
      "Vo Codestone",
      "Eo Codestone",
      "Main Codestone",
      "Zei Codestone",
      "Orn Codestone",
      "Har Codestone",
      "Bri Codestone",
    ]
  },

  {
    action: "deposit",
    match: "exact",
    color: "darkred",
    items: [
      "Mag Codestone",
      "Vux Codestone",
      "Sho Codestone",
      "Zed Codestone",
      "Cui Codestone",
      "Kew Codestone",
    ]
  },

  {
    action: "deposit",
    match: "partial",
    color: "green",
    items: [
      "bubbling fungus",
      "negg",
    ]
  }

];

const actions = ["", "", "stock", "deposit", "donate", "discard", "gallery", "closet", "shed"];

if(document.querySelector("form[name='quickstock']")){
  const quickstockItems = document.querySelector("form[name='quickstock']").querySelectorAll("tr");

  quickstockItems.forEach((row, index) => {
    if(row.children.length > 1 && row.children[0].textContent !== "Object Name" && row.children[0].textContent !== "Check All"){
      itemName = row.children[0].textContent.toLowerCase();
      //if the item can't be discarded, it's probably neocash
      // non-neocash items have a hidden input element so children is 9, neocash items dont have this element
      const isNeoCashItem = (row.children.length === 8);
      console.log(itemName, row, isNeoCashItem);
      if(!isNeoCashItem){
        lists.forEach(list => {
          if((list.match === "any" && list.action !== "") || (list.match === "partial" && list.items.some(e => itemName.includes(e.toLowerCase()))) || (list.match === "exact" && list.items.some(e => itemName === e.toLowerCase()))){
            row.style.backgroundColor = list.color;
            row.children[actions.indexOf(list.action)].querySelector("input").checked = true;
          }
        });
      }
    }
  });
}
