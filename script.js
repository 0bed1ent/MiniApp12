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

let scoreInHour = localStorage.getItem("scoreInHour")
	? Number(localStorage.getItem("scoreInHour"))
	: 0;

let cardData = {
	1: {
		price: 100,
		img: "clash-royale-1280x720.jpg",
		bonus: 102,
		title: "ф-клЭш рояль",
		level: 0,
		k: 2.3,
	},
	2: {
		price: 60,
		img: "clash-royale-1280x720.jpg",
		bonus: 40,
		title: "shjaui",
		level: 0,
		k: 2.3,
	},
	3: {
		price: 425,
		img: "3ab86c385ee011eea9df429f31467427_upscaled.jpg",
		bonus: 343,
		title: "Помощь сверху",
		level: 0,
		k: 2.3,
	},
	4: {
		price: 1870,
		img: "mid_358257_183204.jpg",
		bonus: 531.02,
		title: "ЭТО ВОССТАНИЕ!",
		level: 0,
		k: 2.3,
	},
	5: {
		price: 200,
		img: "clash-royale-1280x720.jpg",
		bonus: 167,
		title: "Нэйм5",
		level: 0,
		k: 2.3,
	},
};
//ghb pf[jlt yfn cnhfybwe djccnfyfdkbdftv rfhnjxrb]
Object.keys(cardData).forEach(id => {
	const saved = JSON.parse(localStorage.getItem(`card${id}`));
	if (saved) {
		cardData[id] = saved;
	}
});

let scoreHTML = document.getElementById("souls");
scoreHTML.innerText = Math.floor(score);
let energyHTML = document.getElementById("energyText");
let lvlEnergyHTML = document.getElementById("lvlEnergy");
let priceLvlEnergyHTML = document.getElementById("pricelvlEnergy");
let countEnergyHTML = document.getElementById("CountEnergy");
let lvlContainerHTML = document.getElementById("lvlContainer");
let scoreInHourHTML = document.getElementById("InHour");

/*if (localStorage.getItem("score")){
  score = Number (localStorage.getItem("score"))
}
else{
  score = 0;
}*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ghjdthrf yf lfne c,hjcf
let lvlContainerDate = localStorage.getItem("lvlContainerDate");
let today = new Date().toDateString();
let lvlContainer;

if (lvlContainerDate !== today) {
	lvlContainer = 0;
} else {
	lvlContainer = localStorage.getItem("lvlContainer")
		? Number(localStorage.getItem("lvlContainer"))
		: 0;
}

function dataScreen() {
	scoreHTML.innerText = Math.floor(score);
	energyHTML.innerText = energy;
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
	scoreInHourHTML.innerText = scoreInHour;
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

const containerCardsPassive = document.querySelectorAll(".cardsPassive");
containerCardsPassive.forEach(container => {
	const id = container.getAttribute("data-id");
	const data = cardData[id];
	if (data) {
		container.innerHTML = `
		<div class="imgCard card2" style="background-image: url(images/${data.img}); background-size : cover;">
			<p>
				 ур. <span id="lvl${id}">${data.level}</span>
			</p>
		</div>
		<p class="text2">${data.title}</p>`;
	}
});

const dialog = document.getElementById(`screenLvlPassive`);
containerCardsPassive.forEach(container => {
	let touchStart = 100;
	let touchEnd = 0;
	container.addEventListener("touchstart", e => {
		touchStart = e.changedTouches[0].screenX;
	});
	container.addEventListener("touchend", e => {
		touchEnd = e.changedTouches[0].screenX;
		console.log(touchEnd);
		if (Math.abs(touchStart - touchEnd) < 10) {
			const id = container.getAttribute("data-id");
			const data = cardData[id];
			if (data) {
				dialog.innerHTML = `<form method="dialog">
				<button class="close">X</button>
				<img src="images/${data.img}" alt="" class="picture" />
				<h2>${data.title}></h2>
				<div class="textContainer">
					<p>ур.<span class="lvlPassive">${data.level} </span></p>
					<p><span class="bonusPassive">${data.bonus}</span> в час</p>
				</div>
				<button class="payLvlCardPassive">
					<p>
						Купить за <span class="priceLvlCardPassive">${data.price}</span>
					</p>
				</button>
			</form>`;
				dialog.showModal();
				dialog
					.querySelector(".payLvlCardPassive")
					.addEventListener("touchstart", e => {
						payLvlCardPassive(id, data);
					});
			}
		}
	});
});

function payLvlCardPassive(id, data) {
	if (score >= data.price) {
		score -= data.price;
		scoreHTML.innerText = Math.floor(score);
		data.level++;
		scoreInHour += data.bonus;
		data.price = Math.floor(data.price * data.k);
		scoreInHourHTML.innerText = scoreInHour;
		data.bonus = Math.floor(data.bonus * data.k);
		document.querySelector(`#lvl${id}`).innerText = data.level;

		localStorage.setItem(`card${id}`, JSON.stringify(data));
		localStorage.setItem("scoreInHour", scoreInHour);
	}
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
	localStorage.setItem("lvlContainerDate", new Date().toDateString());
}

function clicker(event) {
	console.log("dsip");
	if (energy >= counter) {
		score += counter;
		scoreHTML.innerText = Math.floor(score);

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
	}
	score += scoreInHour / 3600;
	scoreHTML = Math.floor(score);
	saveData();
}

function payLvlEnergy() {
	if (score >= priceLvlEnergy) {
		score -= priceLvlEnergy;
		lvlEnergy++;
		priceLvlEnergy *= 3.25;
		fullEnergy += 200;
		scoreHTML.innerHTML = Math.floor(score);
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
//ВЫЗОВ ПРИ ЗАКРЫТИИ ИГПРЫ
window.addEventListener("beforeunload", () => {
	localStorage.setItem("lastVist", Date.now());
});

//ЫЫФЗРОЫ ППРРИ ЗВГШНГ-УЗКЕ ИГРЫ
window.addEventListener("load", () => {
	const lastVist = localStorage.getItem("lastVisit");
	const now = Date.now();
	if (now - lastVist < 60000 && lastVist) {
		let hoursAway = (now - parseInt(lastVist)) / (60 * 60 * 1000);
		if (hoursAway > 3) {
			hoursAway = 3;
		}
		let offlineScore = Math.floor(scoreInHour * hoursAway);
		score += offlineScore;
		scoreHTML.innerText = Math.floor(score);
		alert(`Вы заработали ${offlineScore}`);
		let offlineEnergy = Math.floor(hoursAway * 3600);
		energy = Math.min(energy + offlineEnergy, fullEnergy);
		energyFillHTML.style.width = percentEnergy + "%";
		scoreInHourHTML.innerText = scoreInHour;
		energyHTML.innerText = energy;
	}
});
