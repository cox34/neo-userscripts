// ==UserScript==
// @name        NEOPETS: Stock Market Highlighter
// @namespace   cox34-neoscripts
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/stockmarket.phtml?type=portfolio
// @match       *://www.neopets.com/stockmarket.phtml?type=buy&ticker=*
// @grant       none
// @description Highlights stocks in your portfolio above or equal to x price
// @version     2.1
// ==/UserScript==

//you can change these
const highlightMinValue = 30;
const highlightColor = "#EEBC1D";

//highlight stocks at 15 or 10 if boon is active
const highlight15 = true;
const highlight15Color = "#00b300";

if(document.URL.includes("?type=buy&ticker")){
  document.querySelector("input[name='amount_shares']").value = 1000;
} else {
  const portfolio = document.querySelector("#postForm").querySelectorAll("tr");
  for(let stock of portfolio){
      const stockPrice = parseInt(stock.querySelectorAll("td")[3].textContent);
      if(stockPrice >= highlightMinValue){
        makeColoredChildren(stock.querySelectorAll("td"), highlightColor);
      }
      if(highlight15 === true && ((stockPrice === 15 && !document.querySelector(".perkBar")) || (document.querySelector(".perkBar") && stockPrice === 10))){
        makeColoredChildren(stock.querySelectorAll("td"), highlight15Color);
      }
  }
}

function makeColoredChildren(children, color){
  for(child of children){
    child.style.backgroundColor = color;
  }
}