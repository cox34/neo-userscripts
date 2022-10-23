// ==UserScript==
// @name        NEOPETS: Wise/Grumpy Old Kings
// @namespace   cox34-neoscripts
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/medieval/wiseking.phtml
// @match       *://www.neopets.com/medieval/grumpyking.phtml
// @grant       none
// @description Randomizes input
// @version     2.0
// ==/UserScript==

if(document.URL.includes("wiseking")){
  for(let i=1; i<8; i++){
    const q = document.getElementById("qp"+i);
    const qOpt = q.querySelectorAll("option");
    const ran = (Math.floor(Math.random()*(qOpt.length-1)+1));
    q.value = qOpt[ran].value;
  }
} else {
  document.getElementById("qp1").value = "What";
  document.getElementById("qp2").value = "do";
  document.getElementById("qp3").value = "you do if";
  document.getElementById("qp4").value = "";
  document.getElementById("qp5").value = "fierce";
  document.getElementById("qp6").value = "Peophins";
  document.getElementById("qp7").value = "";
  document.getElementById("qp8").value = "has eaten too much";
  document.getElementById("qp9").value = "";
  document.getElementById("qp10").value = "tin of olives";
  for(let i=1; i<9; i++){
    const q = document.getElementById("ap"+i);
    const qOpt = q.querySelectorAll("option");
    const ran = (Math.floor(Math.random()*(qOpt.length-1)+1));
    q.value = qOpt[ran].value;
  }
}
