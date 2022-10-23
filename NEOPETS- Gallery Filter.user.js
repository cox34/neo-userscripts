// ==UserScript==
// @name        NEOPETS: Gallery Filter
// @namespace   cox34-neoscripts
// @match       https://impress.openneo.net/user/*/closet
// @match       https://www.neopets.com/gallery/index.phtml*
// @match       https://www.neopets.com/gallery/?gu=*
// @match       https://items.jellyneo.net/mywishes/*
// @grant       GM_setValue
// @grant       GM_getValue
// @version     2.0
// @author      cox34
// @description Filter Neopets galleries with your DTI wishlist
// ==/UserScript==


if(document.URL.includes("impress.openneo.net")){
  if(document.querySelector("#title").textContent === "Your Items"){
    let myWishList = [];
    document.querySelector("#closet-hangers-group-false").querySelectorAll(".object").forEach(item => {
      myWishList.push(item.querySelector("a").innerText);
    });
    GM_setValue("myWishList", myWishList);
    console.log("Script NEOPETS: Gallery Filter wishlist updated", myWishList);
  }
}

else if(document.URL.includes("www.neopets.com/gallery")){
  const filterButton = document.createElement("button");
  filterButton.textContent = "Show only items from my wishlist (reload to unfilter)";
  filterButton.style.margin = "10px 0 0 0";
  filterButton.addEventListener("click", e => {
    let myWishList = GM_getValue("myWishList", []);
    // myWishList.push("Baby Trick-or-Treat Bag"); //testing
    document.querySelector("#gallery_form").querySelectorAll("td[width='140']").forEach(item => {
      let itemName = item.querySelector("b").textContent;
      if(!myWishList.some(wlItemName => itemName === wlItemName)){
        // console.log("Removed", itemName);
        item.parentNode.nextElementSibling.cells[item.cellIndex].remove();
        item.remove();
      }
    });
    document.querySelector("#gallery_form").querySelectorAll("td[colspan='4']").forEach(emptyCell => {
      emptyCell.remove();
    });
    document.querySelector("#gallery_form").querySelectorAll("tr").forEach(row => {
      if(row.cells.length === 0){
        row.remove();
      }
    });
  });
  document.querySelector(".tableStyle").querySelector("center").append(filterButton);
}

else if(document.URL.includes("items.jellyneo.net/mywishes/")){
  const filterButton = document.createElement("button");
  filterButton.textContent = "Show only items from my wishlist (reload to unfilter)";
  filterButton.style.borderRadius = "10px";
  filterButton.addEventListener("click", e => {
    let myWishList = GM_getValue("myWishList", []);
    // myWishList.push("Baby Trick-or-Treat Bag"); //testing
    document.querySelector("ul.item-block-grid").querySelectorAll("li").forEach(item => {
      let itemName = item.textContent.replace(/\n/g,"");
      if(!myWishList.some(wlItemName => itemName === wlItemName)){
        item.remove();
      }
    });
  });
  document.querySelector("div.content-wrapper").querySelector("p").append(filterButton);
}
