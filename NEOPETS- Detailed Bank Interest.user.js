// ==UserScript==
// @name        NEOPETS: Detailed Bank Interest
// @namespace   cox34-neoscripts
// @namespace   https://github.com/cox34/neopets-scripts
// @match       *://www.neopets.com/bank.phtml
// @grant       none
// @version     2.0
// @description Shows daily, 7-day, and 30-day interest, boon interest, and interest calculator
// ==/UserScript==

const interestYearlyRate = parseFloat(document.querySelector("#txtAnnualInterestRate").textContent.replace(/,/g,""))/100;
const interestYearly = parseInt(document.querySelector("#txtAnnualInterest").textContent.replace(/,/g,""));
const interestDaily = Math.ceil(interestYearly/365);
const interestDailyBoon = Math.ceil((interestYearly/interestYearlyRate)*(interestYearlyRate+0.03)/365);

const desiredInterestInput = document.createElement("input");
const desiredInterestOutput = document.createElement("span");
desiredInterestInput.type = "text";
desiredInterestInput.style.width = "100px";
desiredInterestInput.addEventListener("keyup", e => {
  desiredInterestInput.value = desiredInterestInput.value.toLocaleString("en-US");
  desiredInterestOutput.textContent = Math.ceil(desiredInterestInput.value*365/0.125).toLocaleString("en-US")+" NP"
});

const desiredBalanceInput = document.createElement("input");
const desiredBalanceOutput = document.createElement("span");
desiredBalanceInput.type = "text";
desiredBalanceInput.style.width = "100px";
desiredBalanceInput.addEventListener("keyup", e => {
  desiredBalanceInput.value = desiredBalanceInput.value.toLocaleString("en-US");
  desiredBalanceOutput.textContent = Math.ceil(0.125 * desiredBalanceInput.value / 365).toLocaleString("en-US")+" NP";
});

let interestTable = [];
for(const [index, int] of [interestDaily, interestDaily*7, interestDaily*30].entries()){
  let str = int.toLocaleString("en-US");
  let arr = [["Daily", "7 days", "30 days"][index], str];
  if(index<2) arr.push("+"+([1,7][index]*(interestDailyBoon-interestDaily)).toLocaleString("en-US"));
  interestTable.unshift(arr);
}
interestTable.unshift(["Interest", "NP", "w/ Boon"]);

let calcTable = [
  [desiredInterestInput, "NP daily interest requires", desiredInterestOutput],
  [desiredBalanceInput, "NP in the bank generates", desiredBalanceOutput],
];

function createHTMLTable(array){
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  array.forEach(function(items) {
    const row = document.createElement("tr");
    row.style.borderBottom = "1px dashed #aaa";
    items.forEach(function(item) {
      const cell = document.createElement("td");
      if(typeof item === "string"){
        console.log("str");
        cell.textContent = item;
      } else {
        cell.append(item);
      }
      cell.style.padding = "3px 10px";
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  applyStyles(table, [
    ["fontFamily","\"MuseoSansRounded700\", \'Arial\', sans-serif"],
    ["borderCollapse", "collapse"],
    ["margin", "5px auto"]
  ]);

  return table;
}

function applyStyles(element, styles){
	styles.forEach(rule => {element.style[rule[0]] = rule[1];});
}

document.querySelector(".bank-grid2").parentNode.insertBefore(
  createHTMLTable(calcTable), document.querySelector(".bank-grid2").nextSibling
);
document.querySelector(".bank-grid2").parentNode.insertBefore(
  createHTMLTable(interestTable), document.querySelector(".bank-grid2").nextSibling
);
