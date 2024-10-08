
import {
  maleSlavicNames,
  orkishNames,
  maleLatinNames,
  maleRussianNames,
  maleGaelicNames,
  WHFMaleHumanNames,
  wizardsAndClerics,
  warriorsAndThieves,
  fantasticCreatures,
  humanoids,
  feminineElfNames,
  masculineElfNames,
  humanMasculineNames,
  masculineTharkianNames,
  feminineTharkianNames,
  humanFeminineNames,
  femaleUlmiteNames,
  maleSarentineNames,
  femaleSarentineNames,
  femaleSwardonianNames,
  dwarvenMasculineNames,
  dwarvenMFeminineNames,
  wildClanNames,
  tavernNames,
} from "./names.js";

const generateButton = document.getElementById("generate-button");
const nameDisplay = document.getElementById("name-display");
const categoryPicker = document.getElementById("kategoria");
const numberPicker = document.getElementById("liczba");
const formContainer = document.getElementById("form-container");
const selectColumn = document.getElementById("select-column");



categoryPicker.addEventListener("change", (e) => {
  removeAllChildren(nameDisplay);
  updatePick()
});

function updatePick() {
  category = categoryPicker.value;
  numberGenerated = numberPicker.value;
  updateSecondarySelectStatus()
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

    selectColumn.appendChild(secondaryPicker);
    secondaryPicker.classList.add("input");
    
    secondaryPicker.classList.add("form-select");
    
    addOption("Losowe");
    namesAndCategories.forEach((n)=>{ 
      if (n.name){
        addOption(n.name)
      }
    })

    // addOption("Orcze");
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

let namesAndCategories = [//add names here
  {list: wizardsAndClerics, name: "Czarodzieje i Klerycy (DCC)"},
  {list: masculineElfNames, name: "Elfie - męskie"},
  {list: feminineElfNames, name: "Elfie - żeńskie"},
  {list: fantasticCreatures, name: "Fantastyczne Istoty (DCC)"},
  {list: humanoids, name: "Humanoidzi (DCC)"},
  {list: dwarvenMasculineNames, name: "Krasnoludzkie - męskie"},
  {list: dwarvenMFeminineNames, name: "Krasnoludzkie - żeńskie"},  
  {list: humanMasculineNames, name: "Ludzkie - męskie"},
  {list: humanFeminineNames, name: "Ludzkie - żeńskie"},
  {list: orkishNames, name: "Orcze"},
  {list: maleSarentineNames, name: "Sarentyńskie - męskie"},
  {list: femaleSarentineNames, name: "Sarentyńskie - żeńskie"},
  {list: maleSlavicNames, name: "Swardońskie - męskie"},
  {list: femaleSwardonianNames, name: "Swardońskie - żeńskie"},
  {list: masculineTharkianNames, name: "Tharkiańskie - męskie" },
  {list: feminineTharkianNames, name: "Tharkiańskie - żeńskie"},
  {list: WHFMaleHumanNames, name: "Ulmickie - męskie"},
  {list: femaleUlmiteNames, name: "Ulmickie - żeńskie"},
  {list: warriorsAndThieves, name: "Wojownicy i Złodzieje (DCC)"},
  {list: maleLatinNames},
  {list: maleRussianNames},
  {list: maleGaelicNames},






]

function createName(){
  let chosenNameType = namesAndCategories.find((element)=>{
    return element.name == secondaryPicked
  })

  return pickFromList(chosenNameType ? chosenNameType.list : randomizeFromArray(namesAndCategories).list)
}

const generatedName = function () {
  return {
    type: "pickerRoller",
    list: [createName()],
  };
};

const Goal = function (){
  // cele postaci cele drużyny motywacja motivations motywacje
  return{
    type: "pickerRoller",
    list: [
      'Zarobić a się nie narobić',
      'Żądza adrenaliny',
      'Żądza chwały',
      'Żądza bogactwa',
      'Wygnany z ojczyzny, tuła się po świecie',
      'Zmycie plamy na honorze',
      `Dług w wysokości ${(k(6, true)+3)*100} szt. złota, wierzyciele są na twoim tropie`,
      'Głód wiedzy',
      'Zew przygody',
    ]
  }
};

const whatConnectsUs = function (){
  // co nas łączy źródła drużyny party origins
  return{
    type: "pickerRoller",
    list: [
      "Przyjaciele",
      "Rodzina",
      "Członkowie gangu",
      "Banici",
      "Słudzy, którzy zabili swojego pana",
      "Zabili kogoś wspólnie",
      "Jedyni ocalali z nieudanej ekspedycji",
      "Pochodzą z tej samej miejscowości",
      "Koledzy z pracy",
      "Wspólnie dotknięci klątwą"
    ]
  }
};

const description = function () {
  let list = []
  let build = [
    "Wysportowany",
    "Krzepki",
    "Korpulentny",
    "Delikatny",
    "Wychudły",
    "Masywny",
    "Wiotki",
    "Chudy",
    "Muskularny",
    "Żylasty",
    "Tęgi"
  ]
  let face = [
    "nalana",
    "koścista",
    "przystojna",
    "o delikatnych rysach",
    "arystokratyczna",
    "wydłużona",
    "zniszczona",
    "orla",
    "szelmowska",
    "wąska",
    "szczurowata",
    "okrągła",
    "zapadła",
    "o ostrych rysach",
    "kwadratowa",
    "szeroka",
    "wilcza"
  ]
  let facialHair = [
    "gładko ogolony",
    "wąsy",
    "broda"
  ]
  let skin = [
    "pokryta bliznami",
    "oleista",
    "ciemna",
    "blada",
    "perfekcyjna",
    "ospowata",
    "rumiana",
    "ziemista",
    "opalona"
  ]
  let hair = [
    "łysy",
    "blondyn",
    "brunet",
    "szatyn",
    "rudy"
  ]
  let virtue = [
    "ambitny",
    "ostrożny",
    "odważny",
    "kulturalny",
    "ciekawski",
    "zdyscyplinowany",
    "zdeterminowany",
    "szczodry",
    "towarzyski",
    "uczciwy",
    "honorowy",
    "skromny",
    "idealistyczny",
    "sprawiedliwy",
    "lojalny",
    "litościwy",
    "pracy",
    "łagodny",
    "opanowany",
    "tolerancyjny"
  ]
  let vice = [
    "agresywny",
    "arogancki",
    "zgorzkniały",
    "tchórzliwy",
    "okrutny",
    "zdradliwy",
    "lekkomyślny",
    "żarłoczny",
    "chciwy",
    "wybuchowy",
    "leniwy",
    "nerwowy",
    "uprzedzony",
    "nonszalancki",
    "opryskliwy",
    "podejrzliwy",
    "próżny",
    "mściwy",
    "marnotrawny",
    "marudny"
  ]

  list.push(
    randomizeFromArray(build)+ ", twarz " + 
    randomizeFromArray(face) + ", " + randomizeFromArray(facialHair) + ", skóra " +
    randomizeFromArray(skin)+ ", " +
    randomizeFromArray(hair) + ", " +
    randomizeFromArray(virtue) + ", " +
    randomizeFromArray(vice)
  )

  return {
    type: "pickerRoller",
    list
  };
}
const medievalProfessions = {
  type: "picker",
  list: [
    "Aktor",
    "Alchemik",
    "Aptekarz",
    "Architekt",
    "Astrolog",
    "Bajarz",
    "Bankier",
    "Bednarz",
    "Biurokrata",
    "Blacharz",
    "Browarnik",
    "Brukarz",
    "Chirurg",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Chłop",
    "Cieśla",
    "Cieśla okrętowy",
    "Cyrulik",
    "Dmuchacz szkła",
    "Dozorca więzienny",
    "Dragoman",
    "Drobiarz",
    "Druciarz",
    "Drwal",
    "Emalier",
    "Farbiarz",
    "Folusznik",
    "Garbarz",
    "Garncarz",
    "Gipsiarz",
    "Gliptyk",
    "Goniec",
    "Górnik",
    "Grabarz",
    "Grawer",
    "Gręplarz",
    "Grotnik",
    "Guwerner",
    "Hafciarz",
    "Handlarz uliczny",
    "Harfiarz",
    "Hazardzista",
    "Herold",
    "Hodowca psów",
    "Ilustrator",
    "Introligator",
    "Inżynier",
    "Jubiler",
    "Kamieniarz",
    "Kapelusznik",
    "Karczmarz",
    "Kłusownik",
    "Kołodziej",
    "Koniuszy",
    "Konwisarz",
    "Kopista",
    "Korepetytor",
    "Koszykarz-plecionkarz",
    "koszykarz-plecionkarz ",
    "Kotlarz",
    "Kowal",
    "Krawiec",
    "Kucharz",
    "Kupiec bławatny",
    "Kupiec winny",
    "Kupiec żelazny",
    "Kurier",
    "Kuśnierz",
    "Leśnik",
    "Ludwisarz",
    "Lutnik",
    "Łuczarz",
    "Majordomus",
    "Malarz",
    "Mamka",
    "Marynarz",
    "Mędrzec",
    "Miecznik",
    "Mincerz",
    "Minstrel",
    "Miotlarz",
    "Młynarz",
    "Mosiężnik",
    "Murarz",
    "Nadzorca służby",
    "Nawigator",
    "Nosiwoda",
    "Notariusz",
    "Nożownik",
    "Ogrodnik",
    "Opój",
    "Oracz",
    "Owczarz",
    "Pachołek",
    "Pasterz",
    "Pasterz kóz",
    "Pastuch",
    "Piekarz",
    "Pijak",
    "Pilśniarz",
    "Pisarz",
    "Płatnerz",
    "Płytkarz",
    "Poborca podatkowy",
    "Podkuwacz",
    "Poeta",
    "Położnik",
    "Pomywacz",
    "Poseł",
    "Posłaniec",
    "Posługacz",
    "Powroźnik",
    "Praczka",
    "Prostytutka",
    "Przewodnik",
    "Radca prawny",
    "Rękawicznik",
    "Robotnik",
    "Rybak",
    "Rymarz",
    "Rytownik",
    "Rzeźbiarz",
    "Rzeźnik",
    "Serowar",
    "Skalnik",
    "Sklepikarz",
    "Skryba",
    "Sługa",
    "Służący",
    "Smolarz",
    "Snycerz",
    "Sokolnik",
    "Solarz",
    "Sprzedawca Ryb",
    "Stajenny",
    "Stawiacz pijawek",
    "Stolarz",
    "Strażnik więzienny",
    "Strzecharz",
    "Sukiennik",
    "Szczurołap",
    "Szewc",
    "Szklarz",
    "Szlifierz",
    "Szmaciarz",
    "Szmuklerz",
    "Szpachlarz",
    "Szpieg",
    "Szwaczka",
    "Ślusarz",
    "Świecarz",
    "Świniopas",
    "Tkacz",
    "Tłumacz",
    "Tokarz",
    "Tragarz",
    "Tragarz portowy",
    "Traper",
    "Trębacz",
    "Tynkarz",
    "Uczony",
    "Urzędnik",
    "Winiarz",
    "Wolny chłop",
    "Wolny chłop",
    "Wolny chłop",
    "Wolny chłop",
    "Wolny chłop",
    "Wolny chłop",
    "Wolny chłop",
    "Wolny chłop",
    "Wolny chłop",
    "Wolny chłop",
    "Woźnica",
    "Wychowawca",
    "Wypalacz wapna",
    "Zabójca",
    "Zbrojmistrz",
    "Zegarmistrz",
    "Zielarz",
    "Złotnik",
    "Żebrak",
    "Żeglarz",
    "Akolita",
    "Banita",
    "Berserker",
    "Pirat",
    "Ciura obozowa",
    "Cyrkowiec",
    "Fanatyk",
    "Flisak",
    "Giermek",
    "Gladiator",
    "Guślarz",
    "Hiena cmentarna",
    "Kanciarz",
    "Kozak",
    "Łowca",
    "Łowca nagród",
    "Mieszczanin",
    "Mytnik",
    "Najemnik",
    "Ochotnik",
    "Ochroniarz",
    "Oprych",
    "Paź",
    "Podżegacz",
    "Porywacz zwłok",
    "Przemytnik",
    "Przepatrywacz",
    "Tropiciel",
    "Przewoźnik",
    "Rzecznik rodu",
    "Rzemieślnik",
    "Rzezimieszek",
    "Strażnik dróg",
    "Strażnik pól",
    "Strażnik miejski",
    "Szlachcic",
    "Szermierz",
    "Śmieciarz",
    "Tarczownik",
    "Uczeń",
    "Węglarz",
    "Uczeń czarodzieja",
    "Włóczykij",
    "Zabójca bestii",
    "Zarządca",
    "Złodziej",
    "Żak",
    "Żołnierz",
    "Żołnierz okrętowy",
    "Bartodziej",
    "Pasiecznik",
    "Łagiewnik",
    "Brązownik",
    "Bursztynnik",
    "Bursztyniarz",
    "Cukiernik",
    "Cienietnik",
    "Fajkarz",
    "Dziewiarz",
    "Dekarz",
    "Giser",
    "Iluminator",
    "Iskarz",
    "Kaletnik",
    "Karpiniarz",
    "Kartownik",
    "Kominiarz",
    "Korabnik",
    "Szkutnik",
    "Koronkarz",
    "Malarz szkła",
    "Witrażysta",
    "Modysta",
    "Obraźnik",
    "Organmistrz",
    "Organista",
    "Partacz",
    "Pozłotnik",
    "Pszczelarz",
    "Bartnik",
    "Rogownik",
    "Strycharz",
    "Cegielnik",
    "Szczytnik",
    "Szłomnik",
    "Tapicer",
    "Kat"
  ],
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
