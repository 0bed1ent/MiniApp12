//localStorage.clear();
let score = localStorage.getItem("score")
	? Number(localStorage.getItem("score"))
	: 0;
let energy = localStorage.getItem("energy")
	? Number(localStorage.getItem("energy"))
	: 500;
let fullEnergy = localStorage.getItem("fullEnergy")
	? Number(localStorage.getItem("fullEnergy"))
	: 500;
let percentEnergy;
let counter = 10; //леее в будущем измени силу клика брад
let energyFillHTML = document.getElementById("energyfill");
let lvlEnergy = localStorage.getItem("lvlEnergy")
	? Number(localStorage.getItem("lvlEnergy"))
	: 0;
let priceLvlEnergy = localStorage.getItem("priceLvlEnergy")
	? Number(localStorage.getItem("priceLvlEnergy"))
	: 100;

let lvlContainer = (lvlEnergy = localStorage.getItem("lvlContainer")
	? Number(localStorage.getItem("lvlContainer"))
	: 0);

let scoreHTML = document.getElementById("souls");
scoreHTML.innerText = score;
let energyHTML = document.getElementById("energyText");
let lvlEnergyHTML = document.getElementById("lvlEnergy");
let priceLvlEnergyHTML = document.getElementById("pricelvlEnergy");
let countEnergyHTML = document.getElementById("CountEnergy");
let lvlContainerHTML = document.getElementById("lvlContainer");

/*if (localStorage.getItem("score")){
  score = Number (localStorage.getItem("score"))
}
else{
  score = 0;
}*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dataScreen() {
	scoreHTML.innerText = score;
	energyHTML.innerText = energy;
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
}
dataScreen();

function dataScreen2() {
	dataScreen();
	lvlEnergyHTML.innerText = lvlEnergy;
	priceLvlEnergyHTML.innerText = priceLvlEnergy;
	lvlContainerHTML.innerText = lvlContainer;
}

const path = window.location.pathname;
if (path.includes("index.html")) {
	dataScreen();
} else if (path.includes("income.html")) {
	dataScreen2();
}

const obj = document.getElementById("objectClick");
if (obj) {
	obj.addEventListener("touchstart", clicker);
}

const obj2 = document.getElementById("paylvlEnergy");
if (obj2) {
	obj2.addEventListener("touchstart", payLvlEnergy);
}

const obj3 = document.getElementById("paylvlContainer");
if (obj3) {
	obj3.addEventListener("touchstart", paylvlContainer);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function saveData() {
	localStorage.setItem("score", score);
	localStorage.setItem("energy", energy);
	localStorage.setItem("energy", energy);
	localStorage.setItem("fullEnergy", fullEnergy);
	localStorage.setItem("lvlEnergy", lvlEnergy);
	localStorage.setItem("priceLvlEnergy", priceLvlEnergy);
	localStorage.setItem("lvlContainer", lvlContainer);
}

function clicker(event) {
	if (energy >= counter) {
		score += counter;
		scoreHTML.innerText = score;

		energy -= counter;
		energyHTML.innerText = energy;
	}

	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";

	saveData();
}
//gjgjktybt 'ythubbb
function regEn() {
	if (energy < fullEnergy) {
		energy++;
		energyHTML.innerText = energy;
		saveData();
	}
}

function payLvlEnergy() {
	if (score >= priceLvlEnergy) {
		score -= priceLvlEnergy;
		lvlEnergy++;
		priceLvlEnergy *= 3.25;
		fullEnergy += 200;
		scoreHTML.innerHTML = score;
		lvlEnergyHTML.innerHTML = lvlEnergy;
		priceLvlEnergyHTML.innerHTML = priceLvlEnergy;
		countEnergyHTML.innerHTML = counter;
		saveData();
	}
}

function paylvlContainer() {
	if (lvlContainer < 6) {
		lvlContainer++;
		energy = fullEnergy;
		saveData();
		dataScreen2();
	}
}

setInterval(regEn, 1000);
