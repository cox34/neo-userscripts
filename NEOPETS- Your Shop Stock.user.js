// ==UserScript==
// @name        NEOPETS: Your Shop Stock
// @namespace   cox34-neoscripts
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/market.phtml?*type=your*
// @match       *://www.neopets.com/market_your.phtml*
// @grant       none
// @version     2.1
// @description Auto-input price after SSW search, highlight newly stocked items, warn if Nerkmid price seems low
// ==/UserScript==

//you can change these
const highlightNewStock = true;
const removeZeroes = false; //removes the "0" on unpriced items
const warnOnLowPriceNerk = true;
const nerkmidEstMinValue = 111111;

const autoPriceAfterSSW = true;
const randomizeUndercutValue = false;
let undercutValue = 1;
//enter your own value or use a random one 1-100

//dont change the rest

const userName = document.querySelector(".user.medText").querySelector("a").textContent;
//check username so you dont undercut your own shop
const shopStock = document.querySelector("form[action='process_market.phtml']");
const shopStockItems = shopStock.querySelectorAll("tr");
const updateButton = document.querySelector("input[value='Update']");

const warning = document.createElement("tr");
warning.id = "pricewarning";
warning.style.backgroundColor = "#e1afaf";
warning.style.fontSize = "24";
warning.style.fontWeight = "bold";
warning.style.visibility = "hidden";
warning.textContent = "Update button hidden while pricing Nerkmids, click here to remove focus from price input"
shopStock.appendChild(warning);

for(let [i, item] of shopStockItems.entries()){
  const itemName = item.querySelector("b");
  const itemPrice = item.querySelector("input[name='cost_"+i+"']");
  if(itemPrice && itemPrice.value === "0"){
    if(removeZeroes){
      itemPrice.value = "";
    }
    if(highlightNewStock){
      makeColoredChildren(item.querySelectorAll("td"), "#afafe1");
    }
  }
  if(warnOnLowPriceNerk && itemName && itemName.textContent.match("Nerkmid")){
    itemPrice.addEventListener("input", event => {
      if(parseInt(itemPrice.value) < nerkmidEstMinValue){
        makeColoredChildren(item.querySelectorAll("td"), "yellow");
        toggleUpdateButton(true);
      } else {
        makeColoredChildren(item.querySelectorAll("td"), "#AFE1AF");
        toggleUpdateButton(false);
      }
    });
    itemPrice.addEventListener("focusout", event => {
      if(itemPrice.value !== "0" && parseInt(itemPrice.value) < nerkmidEstMinValue){
        makeColoredChildren(item.querySelectorAll("td"), "#e1afaf");
        toggleUpdateButton(false);
        alert("That Nerkmid price seems low. Double check!");
      }
    });
  }
}

function makeColoredChildren(children, color){
  for(child of children){
    //setting bg for the tr just went around the item image
    child.style.backgroundColor = color;
  }
}

function toggleUpdateButton(removeButton){
  if(removeButton){
    warning.style.visibility = "visible";
    updateButton.style.display = "none";
  } else {
    warning.style.visibility = "hidden";
    updateButton.style.display = "inline";
  }
}

function waitForResults(){
  return new Promise((resolve, reject)=>{
    const observer = new MutationObserver((mutations) => {
      //console.log(mutations);
      if(document.getElementById("results_table") !== null){
        //observer.disconnect();
        return resolve();
      }
    });
    observer.observe(document.getElementById("results"), {
      childList: true,

      subtree: true
    });
  });
}

function waitForSWResults(){
  if(randomizeUndercutValue === true){
    undercutValue = Math.ceil(Math.random()*100);
  }
  waitForResults().then(function(){
    const searchedItem = document.getElementById("search_for").textContent.split("matching \'")[1].replace("\'...", "");
    const searchedItemPrice = parseInt(
      document.getElementById("results_table")
      .querySelectorAll("tr")[1]
      .querySelectorAll("td")[2]
      .textContent.replace(/,/g,"")
    );
    const searchedItemSeller =
      document.getElementById("results_table")
      .querySelectorAll("tr")[1]
      .querySelectorAll("td")[0]
      .textContent;
    console.log("Lowest price for "+searchedItem+" is "+searchedItemPrice);
    if(userName !== searchedItemSeller){
      updateItemPrice(searchedItem, searchedItemPrice);
    }
    waitForSWResults();
  }).catch((e)=>{
    console.log(e);
  });
}

function updateItemPrice(itemName, itemPrice){
  for(let [i, item] of shopStockItems.entries()){
    const stockedItemName = item.querySelector("b");
    const stockedItemPriceInput = item.querySelector("input[name='cost_"+i+"']");
    if(stockedItemName && stockedItemName.textContent === itemName){
      stockedItemPriceInput.value = itemPrice-undercutValue;
      if(itemPrice-undercutValue <= 0){
        stockedItemPriceInput.value = 1;
      }
      makeColoredChildren(item.querySelectorAll("td"), "#006400");
    }
  }
}

if(autoPriceAfterSSW === true){
  waitForSWResults();
}
