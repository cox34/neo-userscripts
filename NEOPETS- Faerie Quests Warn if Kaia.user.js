// ==UserScript==
// @name        NEOPETS: Faerie Quests Warn if Kaia
// @namespace   cox34-neoscripts
// @match       https://www.neopets.com/quests.phtml
// @match       https://www.neopets.com/quickstock.phtml
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.0
// @author      cox34
// @description Check inv for nc items, alert for fq page
// ==/UserScript==


if(document.URL.includes("https://www.neopets.com/quickstock.phtml")){
  let invHasNCItem = false;
  if(document.querySelector("form[name='quickstock']")){
    const quickstockItems = document.querySelector("form[name='quickstock']").querySelectorAll("tr");

    quickstockItems.forEach((row, index) => {
      if(row.children.length > 1 && row.children[0].textContent !== "Object Name" && row.children[0].textContent !== "Check All"){
        //if the item can't be discarded, it's probably neocash
        // non-neocash items have a hidden input element so children is 9, neocash items dont have this element
        if(row.children.length === 8){
          invHasNCItem = true;
        }
      }
    });
  }
  let lastInvCheck = new Date().getTime();
  console.log("invHasNCItem", invHasNCItem, lastInvCheck);
  GM_setValue("invHasNCItem", invHasNCItem);
  GM_setValue("lastInvCheck", lastInvCheck);
}

else if (document.URL === "https://www.neopets.com/quests.phtml"){
  //if(add check to see if cookie is active and quest is available today)
  let lastInvCheckAgo = new Date().getTime() - GM_getValue("lastInvCheck", 0);
  console.log("lastInvCheckAgo", lastInvCheckAgo);
  if(lastInvCheckAgo > 300000){
    //5 minutes = 300000
    const qsWin = window.open("https://www.neopets.com/quickstock.phtml", "_blank");
    setTimeout(function(){
      qsWin.close();
      checkKaia();
    }, 4000);
  }
  else {
    checkKaia();
  }
}

function checkKaia(){
  if(GM_getValue("invHasNCItem", true)){
    alert("QuickStock check had an NC item "+(lastInvCheckAgo/1000).toFixed(0)+" seconds ago");
  }
  else {
    console.log("no kaia");
  }
}
