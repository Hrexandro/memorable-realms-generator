
import {
  maleSlavicNames,
 orkishNames


} from "./names.js";

const generateButton = document.getElementById("generate-button");
const nameDisplay = document.getElementById("name-display");
const categoryPicker = document.getElementById("kategoria");
const numberPicker = document.getElementById("liczba");
const formContainer = document.getElementById("form-container");
const selectColumn = document.getElementById("select-column");



categoryPicker.addEventListener("change", (e) => {
  removeAllChildren(nameDisplay);
});

function updatePick() {
  category = categoryPicker.value;
  numberGenerated = numberPicker.value;
  updateSecondaryPicked()
}

let numberGenerated = 20;
let category = "example";
let secondaryPicked = null;

const secondaryPicker = document.createElement("select");

function updateSecondaryPicked() {
  secondaryPicked = secondaryPicker.value
}

function updateSecondarySelectStatus() {
  if (categoryPicker.value === "generatedName") {
    function addOption(displayedName, valueIfDifferent) {
      let option = document.createElement("option");
      option.text = displayedName;
      option.value = displayedName;
      secondaryPicker.appendChild(option);
    }
    //formContainer.insertBefore(secondaryPicker, nameDisplay)
    selectColumn.appendChild(secondaryPicker);
    secondaryPicker.classList.add("input");
    ///
    secondaryPicker.classList.add("form-select");
    ///


    //add names here
    addOption("Losowe");
    addOption("Orcze");
    secondaryPicker.addEventListener("click", () => {
      updateSecondaryPicked();
    });
    secondaryPicker.addEventListener("change", () => {
      updateSecondaryPicked();
      removeAllChildren(nameDisplay);
    });
  } else {
    removeAllChildren(secondaryPicker);
    secondaryPicker.remove();
  }
}

function k(sides, exploding = false) {
  let result = Math.floor(Math.random() * sides) + 1;
  if (exploding === true) {
    if (result === sides) {
      result = result + k(sides, true);
    }
  }

  return result;
}

class Roll {
  constructor(result) {
    this.result = result;
  }
}






function removeAllChildren(element) {
  const counter = element.children.length;
  for (let m = 0; m <= counter; m++) {
    if (element.children[0]) {
      element.children[0].remove();
    }
  }
}

function randomizeFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function displayArray(ar, parent) {
  for (let j = 0; j < ar.length; j++) {
    const tableRow = document.createElement("tr");
    parent.appendChild(tableRow);

    const line = document.createElement("p");
    line.innerText = `${j + 1}. ${ar[j]}`;
    tableRow.appendChild(line);
  }
}

function pickFromList(pickedList) {
  console.log(pickedList)
  if (pickedList.type === "mixerSpaced") {
    const nonTypeKeys = Object.keys(pickedList).filter((key) => {
      return key !== "type";
    });
    let combinedParts = "";
    for (let k = 0; k < nonTypeKeys.length; k++) {
      combinedParts += ` ${randomizeFromArray(pickedList[nonTypeKeys[k]])}`;
    }
    return combinedParts;
  } else if (pickedList.type === "mixerConcatenated") {
    const nonTypeKeys = Object.keys(pickedList).filter((key) => {
      return key !== "type";
    });
    let combinedParts = "";
    for (let k = 0; k < nonTypeKeys.length; k++) {
      combinedParts += randomizeFromArray(pickedList[nonTypeKeys[k]]);
    }
    return combinedParts;
  } else if (pickedList.type === "picker") {
    return randomizeFromArray(pickedList.list);
  } else if (pickedList().type === "pickerRoller") {
    // pickerRollers (e.g. random encounters, corpse loot) are functions, so that the numbers are rerolled each time
    return randomizeFromArray(pickedList().list);
  }
}

let names = [//add names here
  maleSlavicNames,
  orkishNames
]

function createName (){//add names here
  let chosenNameType = secondaryPicked ? secondaryPicked: "Losowe";
  if (chosenNameType === "Orcze") {
    chosenNameType = orkishNames
  } else if (chosenNameType === "Losowe") {
    chosenNameType = randomizeFromArray(names);
  } else {
    chosenNameType = randomizeFromArray(names);
  }

  return pickFromList(chosenNameType)
}

const generatedName = function () {
  return {
    type: "pickerRoller",
    list: [createName()],
  };
};

generateButton.addEventListener("click", () => {
  updatePick();
  const result = [];

  const pickedCategory = eval(category);
  removeAllChildren(nameDisplay);
  for (let i = 0; i < numberGenerated; i++) {
    result.push(pickFromList(pickedCategory));
  }
  displayArray(result, nameDisplay);
});
updateSecondarySelectStatus();
