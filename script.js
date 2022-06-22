const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");

const pageHeading = document.querySelector(".container-header__heading");

const messageBox = document.querySelector(".container-content__text");
const avaterBox = document.querySelector(".container-content__avater-text");

const beerMessages = [
  `When consumed moderately, drinking beer has the potential to help you build stronger bones, clean your teeth, help you live longer, and boost brainpower.`,
  `Moreover, Beer appears to be beneficial to the heart: one preliminary study at the American Heart Association Scientific Sessions 2016 discovered that moderate beer drinkers showed higher levels of "good" cholesterol.`,
  `Another interesting benefit of drinking beer is that it can be good for your kidneys. Some studies have shown that moderate beer drinkers show a marked reduction in the build-up of kidney stones.`,
  `However, the amount of alcohol consumed by adult men in a day should not exceed 25 grams, which is equivalent to 750 mL of beer.`,
  `Excessive alcohol intake causes liver injury, and leads to liver disease. Initially a person develops fatty liver, where excess fat is stored in the liver, and later it leads to ongoing inflammation of the liver (hepatitis).`,
  `Long-term excessive beer consumption can lead to nerve damage, memory lapses, and erectile dysfunction`,
];

const avatarMessages = [
  `Ready for a beer?`,
  `Prost!`,
  `YumYum...`,
  `Enough for today`,
  `Oops... should stop now`,
  `Oh, now it's a bit much.`,
];

updateCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener("click", () => fillCup(idx));
});

function fillCup(idx) {
  //checking if the clicked cup already full and is the last filled one, if yes, unfill clicked cup
  if (
    smallCups[idx].classList.contains("full") &&
    !smallCups[idx].nextElementSibling.classList.contains("full")
  ) {
    idx--;
  }

  // filling cups all the way to the clicked cup, or unfill cups all the way to the clicked cup
  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateCup();
  updateMessage(smallCups);
}

function updateCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const allCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / allCups) * 330}px`;
  }

  if (fullCups === allCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${1.25 - (250 * fullCups) / 1000}L`;
  }
}

function updateMessage(cups) {
  let fullCupsCount = 0;
  cups.forEach((cup) => {
    if (cup.classList.contains("full")) {
      fullCupsCount++;
    }
  });
  messageBox.innerText = beerMessages[fullCupsCount];
  avaterBox.innerText = avatarMessages[fullCupsCount];
  checkWarning(fullCupsCount);
}

function checkWarning(num) {
  if (num > 3) {
    pageHeading.classList.add("warning");
    messageBox.classList.add("warning");
  } else {
    pageHeading.classList.remove("warning");
    messageBox.classList.remove("warning");
  }
}
