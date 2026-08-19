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
  sarentineTownNames,
  nordicMaleNames,
  nordicFemaleNames,
  maleSwardonianWarriorNames,
  deities,
  femaleLatinNames
} from "./names.js";


function pickNameSource(source) {
    if (Array.isArray(source)) {
        return pick(source);
    }

    const resolved =
        typeof source === "function"
            ? source()
            : source;

    if (
        resolved.type === "picker" ||
        resolved.type === "pickerRoller"
    ) {
        return pick(resolved.list);
    }

    if (
        resolved.type === "mixerSpaced" ||
        resolved.type === "mixerConcatenated"
    ) {
        const separator =
            resolved.type === "mixerSpaced"
                ? " "
                : "";

        return Object.keys(resolved)
            .filter(key => key !== "type")
            .map(key => pick(resolved[key]))
            .join(separator)
            .trim();
    }

    throw new Error("Nieobsługiwane źródło imienia");
}
function generateAncestryName(ancestry) {
    const sources = [
        ancestry.names,
        ...(ancestry.nameSources ?? [])
    ];

    return pickNameSource(pick(sources));
}
function createSluzospierdControls() {
    // Nie twórz drugi raz, jeśli już istnieje
    if (document.getElementById("sluzospierd-options")) return;

    const formContainer = document.getElementById("form-container");
    if (!formContainer) return;

    const container = document.createElement("div");

    container.id = "sluzospierd-options";
    container.className = "row mt-3";

container.innerHTML = `
    <div class="col">
        <label for="sluzospierd-ancestry" class="form-label">Rasa:</label>
        <select id="sluzospierd-ancestry" class="form-select">
            <option value="random">Losowa</option>
            <option value="human">Człowiek</option>
            <option value="elf">Elf</option>
            <option value="dwarf">Krasnolud</option>
            <option value="halfling">Niziołek</option>
        </select>
    </div>

    <div class="col">
        <label for="sluzospierd-class" class="form-label">Klasa:</label>
        <select id="sluzospierd-class" class="form-select">
            <option value="random">Losowa</option>
            <option value="optimal">Optymalna</option>
            <option value="fighter">Wojownik</option>
            <option value="priest">Kapłan</option>
            <option value="thief">Złodziej</option>
            <option value="wizard">Czarodziej</option>
        </select>
    </div>

    <div class="col d-flex align-items-end">
        <div class="form-check mb-2">
            <input
                id="sluzospierd-random-name"
                class="form-check-input"
                type="checkbox"
                checked
            >
            <label
                class="form-check-label"
                for="sluzospierd-random-name"
            >
                Losowe imię
            </label>
        </div>
    </div>
`;

    formContainer.appendChild(container);
}

function updateSluzospierdControlsVisibility() {
    const categorySelect = document.getElementById("kategoria");
    const container = document.getElementById("sluzospierd-options");

    if (!categorySelect || !container) return;

    container.hidden = categorySelect.value !== "SluzospierdCharacter";
}

function getSluzospierdOptionsFromDom() {
    return {
        ancestry:
            document.getElementById("sluzospierd-ancestry")?.value ?? "random",

        characterClass:
            document.getElementById("sluzospierd-class")?.value ?? "random",

        randomName:
            document.getElementById("sluzospierd-random-name")?.checked ?? true,

        level: 1,
    };
}

document.addEventListener("DOMContentLoaded", () => {
    createSluzospierdControls();

    const categorySelect = document.getElementById("kategoria");

    categorySelect?.addEventListener("change", () => {
        updateSluzospierdControlsVisibility();
    });

    updateSluzospierdControlsVisibility();
});

const STAT_KEYS = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

const STAT_LABELS = {
  strength: "SIŁ",
  dexterity: "ZRĘ",
  constitution: "KON",
  intelligence: "INT",
  wisdom: "MĄD",
  charisma: "CHA",
};

const COMMON_LANGUAGES = [
  "Krasnoludzki",
  "Elfi",
  "Olbrzymi",
  "Gobliński",
  // "Merrański",
  "Orczy",
  "Gadzi",
  "Leśny",
  "Thaniański",
  /////
  "Niziołczy"
];

const RARE_LANGUAGES = [
  "Niebiański",
  "Piekielny",
  "Drakoński",
  "Pierwotny",
  "Podwspólny"
];

const BACKGROUNDS = [
  ["Ulicznik", "Dorastałeś na bezlitosnych ulicach wielkiego miasta."],
  ["Poszukiwany", "Wyznaczono nagrodę za twoją głowę, ale masz sprzymierzeńców."],
  ["Adept kultu", "Znasz bluźniercze tajemnice i rytuały."],
  ["Gildia złodziei", "Masz znajomości, kontakty i długi."],
  ["Wygnaniec", "Twój lud wygnał cię za domniemane zbrodnie."],
  ["Sierota", "Ocalił i wychował cię niezwykły opiekun."],
  ["Uczeń czarodzieja", "Masz talent do magii i oko do magicznych szczegółów."],
  ["Jubiler", "Łatwo oceniasz wartość i autentyczność kosztowności."],
  ["Zielarz", "Znasz rośliny, lekarstwa i trucizny."],
  ["Barbarzyńca", "Opuściłeś hordę, ale horda nigdy całkiem nie opuściła ciebie."],
  ["Najemnik", "Walczyłeś za pieniądze zarówno z wrogami, jak i dawnymi przyjaciółmi."],
  ["Żeglarz", "Piractwo, korsarstwo albo handel — morza są twoim żywiołem."],
  ["Akolita", "Dobrze znasz obrzędy i doktryny religijne."],
  ["Żołnierz", "Służyłeś jako wojownik w zorganizowanej armii."],
  ["Łowca", "Lasy i dzicz są twoim prawdziwym domem."],
  ["Zwiadowca", "Przetrwałeś dzięki skradaniu, spostrzegawczości i szybkości."],
  ["Minstrel", "Przemierzyłeś wiele krain dzięki urokowi i talentowi."],
  ["Uczony", "Wiele wiesz o starożytnej historii i dawnych legendach."],
  ["Szlachcic", "Znane nazwisko otworzyło przed tobą wiele drzwi."],
  ["Chirurg", "Znasz anatomię, chirurgię i pierwszą pomoc."],
];

const DEITIES = {
  lawful: ["Święta Terragnis", "Madeera Przymierze", "Solarus", "Niebiański Ojciec", "Matka Ziemia", "Salvia", "Garncowy Iszek", "Elune"],
  neutral: ["Gede", "Ord", "Crom", "Wodan", "Wojan", "Karabog", "Zielarz", "Caius"],
  chaotic: ["Memnon", "Ramlaat", "Shune Nikczemna", "Bobugbubilz", "Nimlurun", "Gurglak", "Shari-Him", "Krall-Dinok", "Królowa Nocy", "Terminus"],
};

const ALIGNMENTS = {
  lawful: { name: "Praworządny", adjective: "praworządny" },
  neutral: { name: "Neutralny", adjective: "neutralny" },
  chaotic: { name: "Chaotyczny", adjective: "chaotyczny" },
};

const ANCESTRIES = {
  human: {
    name: "Człowiek",
    names: [
        "Zali", "Bram", "Clara", "Nattias", "Rina", "Denton", "Mirena", "Aran",
        "Morgan", "Giralt", "Tamra", "Oscar", "Ishana", "Rogar", "Jasmin", "Tarin",
        "Yuri", "Malchor", "Lienna", "Godfrey",
    ],

    nameSources: [
        humanMasculineNames,
        humanFeminineNames
    ],

    languages: ["Wspólny"],
    feature: "Ambitny: na 1. poziomie wykonujesz jeden dodatkowy rzut na talent klasowy.",
  },
  elf: {
    name: "Elf",

    names: [
        "Eliara", "Ryarn", "Sariel", "Tirolas", "Galira", "Varos", "Daeniel", "Axidor",
        "Hiralia", "Cyrwin", "Lothiel", "Zaphiel", "Nayra", "Ithior", "Amriel", "Elyon",
        "Jirwyn", "Natinel", "Fiora", "Ruhiel",
    ],

    nameSources: [
        masculineElfNames,
        feminineElfNames
    ],
    languages: ["Wspólny", "Elfi", "Leśny"],
    feature: "Dalekowzroczny: +1 do ataków dystansowych albo do testów rzucania czarów.",
  },
  dwarf: {
    name: "Krasnolud",
    names: [
        "Hilde", "Torbin", "Marga", "Bruno", "Karina", "Naugrim", "Brenna", "Darvin",
        "Elga", "Alric", "Isolde", "Gendry", "Bruga", "Junnor", "Vidrid", "Torson",
        "Brielle", "Ulfgar", "Sarna", "Grimm",
    ],

    nameSources: [
        dwarvenMasculineNames,
        dwarvenMFeminineNames
    ],
    languages: ["Wspólny", "Krasnoludzki"],
    feature: "Krzepki: zaczynasz z +2 HP, a kość HP na każdym poziomie rzucasz z przewagą.",
  },
  halfling: {
    name: "Niziołek",
    names: [
      "Willow", "Benny", "Annie", "Tucker", "Marie", "Hobb", "Cora", "Gordie",
      "Rose", "Ardo", "Alma", "Norbert", "Jennie", "Barvin", "Tilly", "Pike",
      "Lydia", "Marlow", "Astrid", "Jasper",
    ],

    nameSources: [
        humanMasculineNames,
        humanFeminineNames
    ],
    languages: ["Wspólny", "Niziołczy"],
    feature: "Skradający się: raz dziennie możesz stać się niewidzialny na 3 rundy.",
  },
};

const CLASS_ALIASES = {
  random: "random",
  losowa: "random",
  fighter: "fighter",
  wojownik: "fighter",
  priest: "priest",
  kapłan: "priest",
  kaplan: "priest",
  thief: "thief",
  złodziej: "thief",
  zlodziej: "thief",
  wizard: "wizard",
  czarodziej: "wizard",
  mag: "wizard",
};

const ANCESTRY_ALIASES = {
  random: "random",
  losowe: "random",
  human: "human",
  człowiek: "human",
  czlowiek: "human",
  elf: "elf",
  dwarf: "dwarf",
  krasnolud: "dwarf",
  halfling: "halfling",
  niziołek: "halfling",
  niziolek: "halfling",
};

const ALIGNMENT_ALIASES = {
  random: "random",
  losowy: "random",
  lawful: "lawful",
  praworządny: "lawful",
  praworzadny: "lawful",
  neutral: "neutral",
  neutralny: "neutral",
  chaotic: "chaotic",
  chaotyczny: "chaotic",
};

const WEAPONS = {
  bastardSword: {
    name: "Miecz półtoraręczny",
    type: "melee",
    range: "bliski",
    damage: "1k8/1k10",
    properties: ["versatile"],
    slots: 2,
  },
  club: {
    name: "Pałka",
    type: "melee",
    range: "bliski",
    damage: "1k4",
    properties: [],
    slots: 1,
  },
  crossbow: {
    name: "Kusza",
    type: "ranged",
    range: "daleki",
    damage: "1k6",
    properties: ["twoHanded", "loading"],
    slots: 1,
  },
  dagger: {
    name: "Sztylet",
    type: "finesse",
    range: "bliski/nieodległy",
    damage: "1k4",
    properties: ["finesse", "thrown"],
    slots: 1,
  },
  greataxe: {
    name: "Wielki topór",
    type: "melee",
    range: "bliski",
    damage: "1k8/1k10",
    properties: ["versatile"],
    slots: 2,
  },
  greatsword: {
    name: "Miecz dwuręczny",
    type: "melee",
    range: "bliski",
    damage: "1k12",
    properties: ["twoHanded"],
    slots: 2,
  },
  javelin: {
    name: "Oszczep",
    type: "thrown",
    range: "bliski/daleki",
    damage: "1k4",
    properties: ["thrown"],
    slots: 1,
  },
  longbow: {
    name: "Długi łuk",
    type: "ranged",
    range: "daleki",
    damage: "1k8",
    properties: ["twoHanded"],
    slots: 1,
  },
  longsword: {
    name: "Długi miecz",
    type: "melee",
    range: "bliski",
    damage: "1k8",
    properties: [],
    slots: 1,
  },
  mace: {
    name: "Buława",
    type: "melee",
    range: "bliski",
    damage: "1k6",
    properties: [],
    slots: 1,
  },
  shortbow: {
    name: "Krótki łuk",
    type: "ranged",
    range: "daleki",
    damage: "1k4",
    properties: ["twoHanded"],
    slots: 1,
  },
  shortsword: {
    name: "Krótki miecz",
    type: "melee",
    range: "bliski",
    damage: "1k6",
    properties: [],
    slots: 1,
  },
  spear: {
    name: "Włócznia",
    type: "thrown",
    range: "bliski/nieodległy",
    damage: "1k6",
    properties: ["thrown"],
    slots: 1,
  },
  staff: {
    name: "Kostur",
    type: "melee",
    range: "bliski",
    damage: "1k4",
    properties: ["twoHanded"],
    slots: 1,
  },
  warhammer: {
    name: "Młot bojowy",
    type: "melee",
    range: "bliski",
    damage: "1k10",
    properties: ["twoHanded"],
    slots: 1,
  },
};

const ARMORS = {
  leather: { name: "Skórzana zbroja", ac: 11, addDex: true, slots: 1 },
};

const PRIEST_SPELLS = [
  "Światło",
  "Leczenie ran",
  "Święta broń",
  "Ochrona przed złem",
  "Tarcza wiary",
];

const WIZARD_SPELLS = [
  "Alarm",
  "Płonące dłonie",
  "Zauroczenie osoby",
  "Wykrycie magii",
  "Piórkowy upadek",
  "Lewitujący dysk",
  "Zamknięcie przejścia",
  "Światło",
  "Magiczny pancerz",
  "Magiczny pocisk",
  "Ochrona przed złem",
  "Sen",
];

const CLASSES = {
  fighter: {
    name: "Wojownik",
    hitDie: 8,
    weapons: Object.keys(WEAPONS),
    wearsLeather: true,
    titles: {
      lawful: "Giermek",
      chaotic: "Łotr",
      neutral: "Wojownik",
    },
    features: [
      "Tragarz: dodajesz dodatni modyfikator z KON do liczby slotów ekwipunku.",
      "Mistrzostwo broni: +1 do ataku i obrażeń wybranym rodzajem broni; dodajesz też połowę poziomu, zaokrąglając w dół.",
      "Hart: masz przewagę w testach wybranej SIŁ albo ZRĘ wykonywanych, aby pokonać przeciwdziałającą siłę.",
    ],
  },
  priest: {
    name: "Kapłan",
    hitDie: 6,
    weapons: ["club", "crossbow", "dagger", "mace", "longsword", "staff", "warhammer"],
    wearsLeather: true,
    titles: {
      lawful: "Akolita",
      chaotic: "Adept",
      neutral: "Poszukiwacz",
    },
    features: [
      "Odpędzanie nieumarłych: znasz ten czar; nie wlicza się do liczby znanych czarów.",
      "Symbol bóstwa nie zajmuje slotu ekwipunku.",
    ],
  },
  thief: {
    name: "Złodziej",
    hitDie: 4,
    weapons: ["club", "crossbow", "dagger", "shortbow", "shortsword"],
    wearsLeather: true,
    titles: {
      lawful: "Rzezimieszek",
      chaotic: "Zbir",
      neutral: "Rabuś",
    },
    features: [
      "Cios w plecy: trafiając nieświadomy celu, zadajesz dodatkową kość obrażeń broni; liczba dodatkowych kości rośnie o połowę poziomu, zaokrąglając w dół.",
      "Złodziejstwo: masz przewagę we wspinaczce, skradaniu, ukrywaniu, przebieraniu się, wykrywaniu i rozbrajaniu pułapek, kradzieży kieszonkowej oraz otwieraniu zamków. Narzędzia złodziejskie nie zajmują slotów.",
    ],
  },
  wizard: {
    name: "Czarodziej",
    hitDie: 4,
    weapons: ["dagger", "staff"],
    wearsLeather: false,
    titles: {
      lawful: "Uczeń",
      chaotic: "Adept",
      neutral: "Szaman",
    },
    features: [
      "Nauka czarów: możesz zużyć zwój i po dniu nauki zdać test INT ST 15, aby trwale nauczyć się zapisanego na nim czaru.",
    ],
  },
};

const ZERO_LEVEL_GEAR = [
  "Pochodnia",
  "Sztylet",
  "Tyczka (3 m)",
  "Krótki łuk i 5 strzał",
  "Lina (18 m)",
  "Flaszka oliwy",
  "Łom",
  "Żelazne kolce (10)",
  "Krzesiwo",
  "Kotwiczka",
  "Pałka",
  "Worek kolców przeciwpiechotnych",
];

const CRAWLING_KIT = [
  "Plecak",
  "Krzesiwo",
  "Pochodnie (2)",
  "Racje żywnościowe (3)",
  "Żelazne kolce (10)",
  "Kotwiczka",
  "Lina (18 m)",
];

const SPELL_DETAILS = {
    "Alarm": {
        tier: 1,
        duration: "1 dzień",
        range: "bliski",
        description:
            "Dotykasz jednego obiektu, na przykład progu drzwi, i nakładasz na niego magiczny alarm. Podczas rzucania wskazujesz istoty, które mogą go bezpiecznie przekraczać. Jeśli inna istota dotknie obiektu lub przekroczy go, w twojej głowie rozlega się magiczny dzwonek."
    },

    "Płonące dłonie": {
        tier: 1,
        duration: "natychmiastowy",
        range: "bliski",
        description:
            "Wokół ciebie wybucha krąg płomieni obejmujący bliski obszar. Wszystkie istoty w obszarze otrzymują 1k6 obrażeń. Łatwopalne przedmioty zajmują się ogniem."
    },

    "Zauroczenie osoby": {
        tier: 1,
        duration: "1k8 dni",
        range: "nieodległy",
        description:
            "Wybierasz jednego humanoida 2. poziomu lub niższego w zasięgu. Przez czas działania uważa cię za bliskiego przyjaciela. Czar kończy się, jeśli ty lub twoi sprzymierzeńcy zrobicie coś, co cel zauważy i co go krzywdzi. Po zakończeniu czaru cel wie, że został magicznie zauroczony."
    },

    "Wykrycie magii": {
        tier: 1,
        duration: "koncentracja",
        range: "nieodległy",
        description:
            "Wyczuwasz obecność magii w nieodległym zasięgu. Jeśli utrzymasz koncentrację przez 2 rundy, poznajesz jej ogólne właściwości. Pełne bariery blokują działanie czaru."
    },

    "Piórkowy upadek": {
        tier: 1,
        duration: "natychmiastowy",
        range: "na siebie",
        description:
            "Możesz spróbować rzucić ten czar w chwili, gdy spadasz. Twój upadek zostaje spowolniony i bezpiecznie lądujesz na nogach."
    },

    "Lewitujący dysk": {
        tier: 1,
        duration: "10 rund",
        range: "nieodległy",
        description:
            "Tworzysz unoszący się na wysokości pasa dysk magicznej siły. Może przenosić do 20 slotów ekwipunku i automatycznie podąża za tobą, pozostając w nieodległym zasięgu. Nie może pokonywać przepaści ani uskoków wyższych od człowieka."
    },

    "Zamknięcie przejścia": {
        tier: 1,
        duration: "10 rund",
        range: "nieodległy",
        description:
            "Magicznie utrzymujesz zamknięte wybrane przejście. Istota próbująca je otworzyć musi zdać test SIŁ przeciwko wynikowi twojego testu rzucania tego czaru. Czar Otwarcie natychmiast kończy ten efekt."
    },

    "Światło": {
        tier: 1,
        duration: "1 godzina czasu rzeczywistego",
        range: "bliski",
        description:
            "Dotknięty przedmiot zaczyna emitować jasne, pozbawione ciepła światło. Oświetla ono obszar w nieodległym zasięgu przez 1 godzinę czasu rzeczywistego."
    },

    "Magiczny pancerz": {
        tier: 1,
        duration: "10 rund",
        range: "na siebie",
        description:
            "Niewidzialna warstwa magicznej siły chroni twoje ciało. Twoje KP wynosi 14 przez czas działania czaru. Jeśli test rzucania tego czaru był krytycznym sukcesem, twoje KP wynosi 18."
    },

    "Magiczny pocisk": {
        tier: 1,
        duration: "natychmiastowy",
        range: "daleki",
        description:
            "Masz przewagę w teście rzucania tego czaru. Pocisk magicznej energii trafia jeden cel w zasięgu i zadaje mu 1k4 obrażeń."
    },

    "Ochrona przed złem": {
        tier: 1,
        duration: "koncentracja",
        range: "bliski",
        description:
            "Przez czas działania chaotyczne istoty mają utrudnienie w testach ataku oraz wrogich testach rzucania czarów przeciwko chronionemu celowi. Nie mogą go również opętać, zmusić ani magicznie omamić. Jeśli cel jest już opętany, istota, która go opętała, wykonuje test CHA przeciwko ostatniemu wynikowi twojego testu rzucania tego czaru; porażka wypędza ją z celu."
    },

    "Sen": {
        tier: 1,
        duration: "natychmiastowy",
        range: "nieodległy",
        description:
            "Czar obejmuje nieodległy obszar rozciągający się od ciebie. Wybierz znajdujące się w nim żywe istoty w liczbie nie większej niż twój poziom. Wybrane istoty 2. poziomu lub niższego zapadają w głęboki sen. Energiczne potrząśnięcie lub otrzymanie obrażeń natychmiast je budzi."
    },

    "Leczenie ran": {
        tier: 1,
        duration: "natychmiastowy",
        range: "bliski",
        description:
            "Dotykasz jednej istoty. Odzyskuje ona liczbę k6 HP równą 1 + połowie twojego poziomu, zaokrąglając w dół."
    },

    "Święta broń": {
        tier: 1,
        duration: "5 rund",
        range: "bliski",
        description:
            "Dotykasz jednej broni i nasycasz ją świętą mocą. Przez czas działania broń jest magiczna i otrzymuje +1 do testów ataku oraz zadawanych obrażeń."
    },

    "Tarcza wiary": {
        tier: 1,
        duration: "5 rund",
        range: "na siebie",
        description:
            "Otacza cię ochronna siła. Przez czas działania otrzymujesz +2 do KP."
    },

    "Odpędzanie nieumarłych": {
        tier: 1,
        duration: "natychmiastowy",
        range: "nieodległy",
        description:
            "Musisz okazać święty symbol. Wszystkie nieumarłe istoty w nieodległym zasięgu wykonują test CHA przeciwko wynikowi twojego testu rzucania czaru. Nieumarły, który poniesie porażkę, ucieka przed tobą przez 5 rund. Jeśli przegra test o co najmniej 10 i jego poziom nie jest wyższy od twojego, zostaje zamiast tego zniszczony."
    }
};

const MAGIC_ITEM_SPELLS = {
    1: [
        "Alarm",
        "Płonące dłonie",
        "Zauroczenie osoby",
        "Wykrycie magii",
        "Piórkowy upadek",
        "Lewitujący dysk",
        "Zamknięcie przejścia",
        "Światło",
        "Magiczny pancerz",
        "Magiczny pocisk",
        "Ochrona przed złem",
        "Sen",
    ],

    2: [
        "Kwasowa strzała",
        "Zmiana postaci",
        "Wykrycie myśli",
        "Unieruchomienie przedmiotu",
        "Unieruchomienie osoby",
        "Niewidzialność",
        "Otwarcie",
        "Lewitacja",
        "Lustrzane odbicie",
        "Mglisty krok",
        "Cisza",
        "Sieć",
    ],

    3: [
        "Ożywienie zmarłego",
        "Rozproszenie magii",
        "Fabrykacja",
        "Kula ognia",
        "Lot",
        "Gazowa postać",
        "Iluzja",
        "Błyskawica",
        "Magiczny krąg",
        "Ochrona przed energią",
        "Posłanie",
        "Rozmowa ze zmarłym",
    ],

    4: [
        "Magiczne oko",
        "Zabójcza chmura",
        "Zamęt",
        "Kontrola wody",
        "Drzwi wymiarów",
        "Wróżenie",
        "Przejście przez ścianę",
        "Polimorfia",
        "Sprężysta sfera",
        "Kamienna skóra",
        "Telekineza",
        "Ściana mocy",
    ],

    5: [
        "Antymagiczna powłoka",
        "Stworzenie nieumarłego",
        "Dezintegracja",
        "Unieruchomienie potwora",
        "Przejście między planami",
        "Słowo mocy: śmierć",
        "Pryzmatyczna kula",
        "Jasnowidzenie",
        "Zmiana kształtu",
        "Przywołanie istoty pozaplanarnej",
        "Teleportacja",
        "Życzenie",
    ],
};

const MAGIC_ARMOR_BENEFITS = [
    "Raz dziennie możesz odbić trafiający cię atak dystansowy.",
    "Testy stabilizacji ciebie są łatwe (ST 9).",
    "Nie można cię przewrócić, dopóki jesteś przytomny.",
    "Niewykryte istoty nie mają przewagi w atakach przeciwko tobie.",
    "Znasz Diaboliczny i jesteś odporny na ogień, lawę i magmę.",
    "Jesteś odporny na klątwę jednego wybranego przedmiotu.",
    "Raz dziennie przez 3 rundy masz przewagę we wszystkich atakach.",
    "Masz +4 do liczby rund pozostałych do śmierci.",
    "Po jednokrotnym przeżyciu działania trucizny stajesz się na nią odporny.",
    "Znasz Niebiański i raz dziennie możesz latać przez 3 rundy.",
    "Trafienia krytyczne przeciwko tobie traktujesz jak zwykłe trafienia.",
    "Ignorujesz każde źródło obrażeń zadające 3 lub mniej obrażeń.",
];

const MAGIC_ARMOR_CURSES = [
    "Jeśli zdejmiesz ten pancerz, otrzymujesz 2k10 obrażeń.",
    "Drużyna nie może dodawać dodatnich modyfikatorów CHA do testów reakcji.",
    "Wierzchowce boją się ciebie i nie pozwalają ci na sobie jeździć.",
    "W pierwszej rundzie walki wykonaj test MĄD ST 15; porażka: atakujesz najbliższą istotę.",
    "Otrzymujesz podwójne obrażenia od broni obuchowej.",
    "Przedmiot zajmuje 5 slotów i jest niezwykle głośny.",
    "Ataki dystansowe przeciwko tobie mają przewagę.",
    "Naturalna 1 w ataku przeciwko tobie jest trafieniem krytycznym.",
    "Korzystne czary wymierzone w ciebie mają ST 15.",
    "Masz utrudnienie w testach ZRĘ.",
    "Każdy sprzymierzony NPC ma sekretną szansę 1 na 6, że cię zdradzi.",
    "Otrzymujesz podwójne obrażenia od posrebrzanej broni.",
];

const MAGIC_POTION_BENEFITS = [
    () => `Przez 5 rund jesteś odporny na ${
        pick(["ogień", "zimno", "elektryczność", "truciznę"])
    }.`,
    () => `Odzyskujesz ${
        pick(["1k4", "2k6", "3k8", "4k10"])
    } HP.`,
    "Przez godzinę czytasz myśli wszystkich istot w nieodległym zasięgu.",
    "Przez 5 rund możesz latać na nieodległą odległość.",
    "Przez 5 rund możesz w swojej turze poruszyć się na daleką odległość i nadal wykonać akcję.",
    "Stajesz się niewidzialny na 5 rund.",
    "Przez godzinę oddychasz pod wodą i znasz język merrański.",
    () => `${STAT_LABELS[pick(STAT_KEYS)]} staje się 18 (+4) na 5 rund.`,
    "Na 5 rund zmieniasz się w fioletowy, latający gaz.",
    "Usuwa wszystkie choroby i dolegliwości działające na pijącego.",
    "Przez godzinę możesz mówić ze zwierzętami i je rozumieć.",
    "Przez 5 rund jesteś odporny na wszystkie obrażenia.",
];

const MAGIC_POTION_CURSES = [
    "Test MĄD ST 15; porażka: przez 3 rundy atakujesz najbliższą istotę.",
    "Na 3 rundy zmieniasz się w traszkę mającą 1 HP.",
    () => `${STAT_LABELS[pick(STAT_KEYS)]} spada do 3 (-4) na godzinę.`,
    "Test KON ST 15; porażka: otrzymujesz 2k10 obrażeń.",
    "Na godzinę zapominasz wszystkie znane języki.",
    "Na 5 rund kurczysz się o połowę i masz utrudnienie w atakach.",
    "Przez 3 rundy śpiewasz na całe gardło.",
    "Przez godzinę przyciągasz wszystkie metalowe przedmioty w nieodległym zasięgu.",
    "Przez godzinę odczuwasz przymus wskakiwania do każdej zauważonej dziury lub przepaści.",
    "Test KON ST 15; porażka: ślepota przez 5 rund.",
    "Przez godzinę jesteś źródłem antymagicznej powłoki.",
    () => `Dwie kończyny kamienieją na 5 rund: ${
        rollDie(2) === 1 ? "obie ręce" : "obie nogi"
    }.`,
];

const MAGIC_UTILITY_BENEFITS = [
    "Nie można cię magicznie obserwować ani wykrywać.",
    "Przedmiot ma międzywymiarową kieszeń mieszczącą 5 slotów ekwipunku.",
    () => `${STAT_LABELS[pick(STAT_KEYS)]} wynosi 18 (+4), gdy używasz lub nosisz przedmiot.`,
    "Raz dziennie możesz teleportować się na nieodległą odległość.",
    "Wrogie czary wymierzone w ciebie mają ST 15.",
    () => `Jesteś odporny na ${
        pick(["ogień", "zimno", "elektryczność", "truciznę"])
    }.`,
    "Wyczuwasz sekretne drzwi w bliskim zasięgu.",
    "Widzisz niewidzialne i niematerialne istoty.",
    "Rodzaj terenu nie ogranicza twojego ruchu.",
    "Możesz wstrzymać oddech przez godzinę.",
    "Nie musisz jeść ani pić.",
    "Możesz chodzić po powierzchniach niematerialnych przez 2 rundy naraz.",
];

const MAGIC_UTILITY_CURSES = [
    "Powoli niszczy wszystkie niemagiczne przedmioty, których dotyka.",
    "Przy każdym użyciu zadaje ci 1k4 obrażeń i pozostawia pęcherze.",
    "Przedmiot przyciąga złą pogodę.",
    "Nie możesz być leczony magią; tylko odpoczynek odzyskuje ci HP.",
    "Gdy zabijasz istotę, przedmiot rozbrzmiewa jak potężny gong.",
    "Przedmiot przyciąga wszystkich nieumarłych w dalekim zasięgu.",
    "Po oblaniu wodą czasowo traci magię.",
    "Masz utrudnienie w testach KON.",
    "Odczuwasz przymus podpalania pergaminów.",
    "Musisz pić krew raz dziennie albo otrzymujesz 1k8 obrażeń.",
    "Przedmiot musi codziennie zjeść 1k10 szt. złota albo traci magię do czasu nakarmienia.",
    "Przedmiot potwornie cuchnie; wszystkie twoje testy CHA są trudne.",
];

const MAGIC_WEAPON_BENEFITS = [
    "Może ciąć lub rozbijać dowolny materiał.",
    "Raz dziennie płonie przez 5 rund i zadaje dodatkowe 1k4 obrażeń.",
    "Test CHA ST 15 pozwala rozkazać dzikiemu zwierzęciu w dalekim zasięgu.",
    "Trafienie krytyczne odcina przeciwnikowi głowę.",
    "Gdy trafisz istotę, poznajesz jej Prawdziwe Imię.",
    "Możesz wystrzelić pocisk energii na nieodległą odległość: test ZRĘ, 1k6 obrażeń.",
    "Raz dziennie możesz odbić trafiający cię atak wręcz.",
    "Gdy zabijasz istotę, odzyskujesz 1k6 HP.",
    "Masz przewagę w rzutach na inicjatywę.",
    "Broń można rzucać na nieodległą odległość; po ataku wraca do ręki.",
    () => `Zadaje podwójne obrażenia przeciwko ${
        pick(["nieumarłym", "nieumarłym", "demonom", "smokom"])
    }.`,
    "Przy atakowaniu tą bronią możesz jeden raz przerzucić każdą naturalną 1.",
];

const MAGIC_WEAPON_CURSES = [
    () => `Nie widzisz ${
        pick(["nieumarłych", "demonów", "węży", "pająków"])
    }.`,
    "Na widok kamienia szlachetnego odczuwasz przymus natychmiastowego połknięcia go.",
    "Każdego dnia musisz spalić słomianą kukłę albo broń czasowo traci magię.",
    "Każde źródło światła, które trzymasz, natychmiast gaśnie.",
    "Na widok symbolu bóstwa musisz głośno je wychwalać.",
    "Jadowite istoty zawsze wybierają cię jako cel swoich ataków.",
    "Każdej północy na godzinę zmieniasz się w szczura.",
    "Twoje testy pływania zawsze mają ST 18.",
    "Dotyk złota cię parzy.",
    "Każdego dnia musisz wykąpać broń we krwi albo czasowo traci magię.",
    "Nie możesz nosić pancerza podczas używania tej broni.",
    "Broń może próbować cię opętać, wygrywając przeciwstawny test CHA z premią +2.",
];
const MAGIC_ITEM_VIRTUES = [
    "Nalega, aby chronić istoty, które lubi.",
    "Ostrzega właściciela, gdy wyczuwa nadchodzące niebezpieczeństwo.",
    "Chętnie tłumaczy język Pierwotny.",
    "Wyczuwa ukrywające się istoty w nieodległym zasięgu, ale nie zna ich dokładnego położenia.",
    () => `Ma do odebrania przysługę od ${
        pick(["jednorożca", "jednorożca", "smoka", "szlachcica"])
    }.`,
    "Budzi respekt wśród wyznawców pewnego bóstwa.",
    "Czasem przypomina sobie użyteczny fakt ze starożytnej historii.",
    "Zapewnia właścicielowi spokojny sen i przyjemne sny.",
    "Podpowiada właścicielowi, co powiedzieć w danej sytuacji.",
    "Czasem udziela przydatnych porad taktycznych.",
    "Czasem zauważa ważne szczegóły przeoczone przez innych.",
    "Próbuje łagodzić spory między świadomymi magicznymi przedmiotami.",
    () => `Działa uspokajająco na ${
        pick(["psy", "konie", "koty", "ptaki"])
    }.`,
    "Ma niezwykle czuły węch.",
    "Zawsze zna kierunek do najbliższej płynącej wody.",
    "Jest praworządny i onieśmiela chaotyczne istoty.",
    "Jest neutralny i onieśmiela praworządne oraz chaotyczne istoty.",
    "Jest chaotyczny i onieśmiela praworządne istoty.",
    "Miewa prawdziwe proroctwa, ale nie rozumie ich znaczenia.",
    () => `Może odwrócić wielkie ${
        pick(["zło", "kłamstwo", "zaklęcie", "przymierze"])
    }.`,
];

const MAGIC_ITEM_FLAWS = [
    () => `Boi się ${
        pick(["ciemności", "robactwa", "wysokości", "wody"])
    }.`,
    "Wolał poprzedniego właściciela i stale porównuje go z obecnym.",
    "Bez przerwy gada, kiedy właściciel próbuje się skupić.",
    () => `Nie znosi ${
        pick(["elfów", "krasnoludów", "ludzi", "goblinów"])
    }.`,
    "Próbuje wciągać właściciela w bójki, żeby mieć coś do roboty.",
    "Nie chce być oddzielany od właściciela.",
    () => `Sprzeciwia się ${
        pick(["hazardowi", "hulankom", "skradaniu", "kradzieży"])
    }.`,
    "Oskarża wszystkich o kłamstwo; czasem ma rację.",
    () => `Odmawia krzywdzenia ${
        pick(["praworządnych", "praworządnych", "neutralnych", "chaotycznych"])
    } istot.`,
    "Uważa właściciela za pionek w swoim apokaliptycznym planie.",
    "Stale próbuje uciec od aktualnego właściciela.",
    "Domaga się przestrzegania surowych rytuałów swojego bóstwa.",
    "Nalega, aby odszukać jego twórcę, żywego lub martwego.",
    "Nie znosi innych świadomych magicznych przedmiotów.",
    "Odmawia użycia do zadań, które uznaje za nudne lub nieważne.",
    "Gdy jest zły na właściciela, celowo wyłącza własną magię.",
    "Domaga się dokładnego czyszczenia każdego dnia.",
    "Uwielbia kolor fioletowy i gardzi wszystkimi innymi.",
    () => `Sprzeciwia się ${
        pick(["negocjacjom", "walce", "walce", "planowaniu"])
    }.`,
    "Udaje, że posiada wiedzę, której w rzeczywistości nie ma.",
];

function rollMagicUtility() {
    return {
        name: pick([
            "Magiczna brosza",
            "Magiczny pierścień",
            "Magiczne buty",
            "Magiczny płaszcz",
            "Magiczny amulet",
            "Magiczna flaszka",
            "Magiczny tom",
            "Magiczny diadem",
            "Magiczna przepaska na oko",
            "Magiczne rękawice",
            "Magiczny symbol",
            "Magiczny kapelusz",
            "Magiczny kielich",
            "Magiczny hełm",
            "Magiczna statuetka",
            "Magiczne gogle",
            "Magiczna torba",
            "Magiczny kamień",
            "Magiczna tunika",
            "Magiczna maska",
        ]),
        slots: 1,
        rules: ""
    };
}

function rollMagicPotion() {
    return {
        name: "Magiczna mikstura",
        slots: 1,
        rules: "Jednorazowa. Wypicie zużywa całą miksturę."
    };
}

const MAGIC_ITEM_TRAITS = [
    ["władczy", "uprzejmy", "purytański", "uroczy"],
    ["lękliwy", "prawy", "krytyczny", "teatralny"],
    ["apodyktyczny", "szlachetny", "chciwy", "opiekuńczy"],
    ["impulsywny", "odważny", "okrutny", "lojalny"],
];
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function rollDice(number, sides) {
  let total = 0;
  for (let i = 0; i < number; i += 1) total += rollDie(sides);
  return total;
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function pickUnique(array, count, excluded = []) {
  const pool = array.filter((item) => !excluded.includes(item));
  const result = [];
  while (result.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(index, 1)[0]);
  }
  return result;
}


function resolveMagicEntry(entry) {
    return typeof entry === "function" ? entry() : entry;
}

function rollMagicQualities() {
    const roll = rollDice(2, 6);

    if (roll <= 3) return { benefits: 0, curses: 1 };
    if (roll <= 7) return { benefits: 1, curses: 1 };
    if (roll <= 11) return { benefits: 1, curses: 0 };

    return { benefits: 2, curses: 0 };
}

function rollMagicPersonality() {
    const roll = rollDice(2, 6);

    let virtues = 0;
    let flaws = 0;

    if (roll <= 3) {
        flaws = 1;
    } else if (roll <= 9) {
        return null;
    } else if (roll <= 11) {
        virtues = 1;
        flaws = 1;
    } else {
        virtues = 1;
    }

    return {
        trait:
            MAGIC_ITEM_TRAITS[rollDie(4) - 1][rollDie(4) - 1],

        virtues: Array.from(
            { length: virtues },
            () => resolveMagicEntry(pick(MAGIC_ITEM_VIRTUES))
        ),

        flaws: Array.from(
            { length: flaws },
            () => resolveMagicEntry(pick(MAGIC_ITEM_FLAWS))
        ),
    };
}

function rollMagicSpellTier() {
    const roll = rollDice(2, 6);

    if (roll <= 5) return 1;
    if (roll <= 7) return 2;
    if (roll <= 9) return 3;
    if (roll <= 11) return 4;

    return 5;
}

function rollMagicArmorBonus() {
    const roll = rollDice(2, 6);

    if (roll <= 5) return 0;
    if (roll <= 8) return 1;
    if (roll <= 11) return 2;

    return 3;
}

function rollMagicWeaponBonus() {
    const roll = rollDice(2, 6);

    if (roll <= 3) return 0;
    if (roll <= 9) return 1;
    if (roll <= 11) return 2;

    return 3;
}

function rollMagicArmor() {
    const roll = rollDice(2, 6);

    let type;
    let mithral = false;

    if (roll <= 5) {
        type = {
            name: "Skórzana zbroja",
            baseAc: 11,
            addDex: true,
            slots: 1
        };
    } else if (roll <= 7) {
        type = {
            name: "Kolczuga",
            baseAc: 13,
            addDex: true,
            slots: 2
        };
    } else if (roll <= 9) {
        type = {
            name: "Tarcza",
            shield: true,
            slots: 1
        };
    } else if (roll <= 11) {
        type = {
            name: "Zbroja płytowa",
            baseAc: 15,
            addDex: false,
            slots: 3
        };
    } else {
        mithral = true;

        type = pick([
            {
                name: "Kolczuga",
                baseAc: 13,
                addDex: true,
                slots: 2
            },
            {
                name: "Zbroja płytowa",
                baseAc: 15,
                addDex: false,
                slots: 3
            }
        ]);
    }

    const bonus = rollMagicArmorBonus();

    let rules;

    if (type.shield) {
        rules = `Zapewnia +${2 + bonus} KP. Zajmuje jedną rękę.`;
    } else {
        rules =
            `KP ${type.baseAc + bonus}` +
            (type.addDex ? " + ZRĘ." : ".");
    }

    if (mithral) {
        rules += " Mithral: brak kar do skradania i pływania.";
    }

    return {
        name:
            `${mithral ? "Mithralowa " : ""}` +
            `${type.name}` +
            `${bonus ? ` +${bonus}` : ""}`,

        slots: Math.max(1, type.slots - (mithral ? 1 : 0)),
        rules,
        bonus
    };
}

function rollMagicWeapon() {
    const roll = rollDie(20);

    let weaponId = null;
    let name;
    let slots = 1;
    let damage = null;

    if (roll === 1) {
        name = `Magiczne strzały (${rollDice(2, 6)})`;
    } else if (roll <= 3) {
        weaponId = "bastardSword";
    } else if (roll === 4) {
        weaponId = "club";
    } else if (roll === 5) {
        weaponId = "crossbow";
    } else if (roll === 6) {
        name = `Magiczne bełty (${rollDice(2, 6)})`;
    } else if (roll <= 8) {
        weaponId = "dagger";
    } else if (roll === 9) {
        weaponId = "greataxe";
    } else if (roll === 10) {
        weaponId = "greatsword";
    } else if (roll === 11) {
        weaponId = "javelin";
    } else if (roll === 12) {
        weaponId = "longbow";
    } else if (roll <= 14) {
        weaponId = "longsword";
    } else if (roll === 15) {
        weaponId = "mace";
    } else if (roll === 16) {
        weaponId = "shortbow";
    } else if (roll <= 18) {
        weaponId = "shortsword";
    } else if (roll === 19) {
        weaponId = "staff";
    } else {
        weaponId = "warhammer";
    }

    if (weaponId) {
        name = WEAPONS[weaponId].name;
        slots = WEAPONS[weaponId].slots;
        damage = WEAPONS[weaponId].damage;
    }

    const bonus = rollMagicWeaponBonus();

    return {
        name: `${name}${bonus ? ` +${bonus}` : ""}`,
        slots,
        bonus,
        rules:
            damage
                ? `${damage} obrażeń; +${bonus} do ataku i obrażeń.`
                : `+${bonus} do ataku i obrażeń tą amunicją.`
    };
}

function rollMagicScrollOrWand(type) {
    const tier = rollMagicSpellTier();
    const spell = pick(MAGIC_ITEM_SPELLS[tier]);

    let rules =
        `Czar ${tier}. kręgu. Test czarowania ST ${10 + tier}. `;

    if (type === "scroll") {
        rules +=
            "Po udanej lub nieudanej próbie użycia magiczny zapis znika.";
    } else {
        rules +=
            "Po nieudanej próbie różdżka nie działa do odpoczynku. " +
            "Przy krytycznej porażce zostaje zniszczona.";
    }

    // Dla czarów 1. kręgu mamy już pełny opis.
    if (SPELL_DETAILS[spell]) {
        rules +=
            ` ${SPELL_DETAILS[spell].range}, ` +
            `${SPELL_DETAILS[spell].duration}. ` +
            `${SPELL_DETAILS[spell].description}`;
    }

    return {
        name:
            `${type === "scroll" ? "Zwój" : "Różdżka"}: ${spell}`,
        slots: 1,
        tier,
        spell,
        rules
    };
}

function rollScrollWandEffectSource() {
    const roll = rollDice(2, 6);

    if (roll <= 6) return "armor";
    if (roll <= 8) return "potion";
    if (roll <= 11) return "utility";

    return "weapon";
}

function getMagicBenefitTable(type) {
    if (type === "armor") return MAGIC_ARMOR_BENEFITS;
    if (type === "potion") return MAGIC_POTION_BENEFITS;
    if (type === "utility") return MAGIC_UTILITY_BENEFITS;
    return MAGIC_WEAPON_BENEFITS;
}

function getMagicCurseTable(type) {
    if (type === "armor") return MAGIC_ARMOR_CURSES;
    if (type === "potion") return MAGIC_POTION_CURSES;
    if (type === "utility") return MAGIC_UTILITY_CURSES;
    return MAGIC_WEAPON_CURSES;
}

function rollMagicBenefit(type) {
    const source =
        ["scroll", "wand"].includes(type)
            ? rollScrollWandEffectSource()
            : type;

    return resolveMagicEntry(
        pick(getMagicBenefitTable(source))
    );
}

function rollMagicCurse(type) {
    const source =
        ["scroll", "wand"].includes(type)
            ? rollScrollWandEffectSource()
            : type;

    return resolveMagicEntry(
        pick(getMagicCurseTable(source))
    );
}

export function generateMagicItem(forcedType = null) {
    const type =
        forcedType ??
        pick([
            "armor",
            "potion",
            "scroll",
            "utility",
            "wand",
            "weapon"
        ]);

    let base;

    if (type === "armor") {
        base = rollMagicArmor();
    } else if (type === "potion") {
        base = rollMagicPotion();
    } else if (type === "scroll" || type === "wand") {
        base = rollMagicScrollOrWand(type);
    } else if (type === "utility") {
        base = rollMagicUtility();
    } else {
        base = rollMagicWeapon();
    }

    const qualities = rollMagicQualities();

    const benefits = Array.from(
        { length: qualities.benefits },
        () => rollMagicBenefit(type)
    );

    const curses = Array.from(
        { length: qualities.curses },
        () => rollMagicCurse(type)
    );

    const personality = rollMagicPersonality();

    const textParts = [];

    if (base.rules) {
        textParts.push(base.rules);
    }

    if (benefits.length) {
        textParts.push(
            `Korzyść: ${benefits.join(" ")}`
        );
    }

    if (curses.length) {
        textParts.push(
            `Klątwa: ${curses.join(" ")}`
        );
    }

    if (personality) {
        let personalityText =
            `Świadomy przedmiot (${personality.trait}).`;

        if (personality.virtues.length) {
            personalityText +=
                ` Zaleta: ${personality.virtues.join(" ")}`;
        }

        if (personality.flaws.length) {
            personalityText +=
                ` Wada: ${personality.flaws.join(" ")}`;
        }

        personalityText +=
            " Może przeciwstawić się właścicielowi przeciwstawnym testem CHA (+2).";

        textParts.push(personalityText);
    }

    return {
        ...base,
        type,
        benefits,
        curses,
        personality,
        cardText: textParts.join(" ")
    };
}
function normalize(value, aliases, fallback = "random") {
  if (!value) return fallback;
  const key = String(value).trim().toLowerCase();
  return aliases[key] ?? fallback;
}

function formatSigned(number) {
  return number >= 0 ? `+${number}` : `${number}`;
}

export function calculateSluzospierdModifier(score) {
  if (score <= 3) return -4;
  if (score <= 5) return -3;
  if (score <= 7) return -2;
  if (score <= 9) return -1;
  if (score <= 11) return 0;
  if (score <= 13) return 1;
  if (score <= 15) return 2;
  if (score <= 17) return 3;
  return 4;
}

function makeStats(rerollWeakStats) {
  let stats;
  do {
    stats = Object.fromEntries(STAT_KEYS.map((key) => [key, rollDice(3, 6)]));
  } while (rerollWeakStats && Math.max(...Object.values(stats)) < 14);
  return stats;
}

function refreshModifiers(character) {
  character.modifiers = Object.fromEntries(
    STAT_KEYS.map((key) => [key, calculateSluzospierdModifier(character.stats[key])]),
  );
}

function chooseRandomAncestry() {
  // Zachowuje proporcje pozostałych pochodzeń z pierwotnej tabeli:
  // człowiek 40%, elf 20%, krasnolud 20%, niziołek 20%.
  const roll = rollDie(10);
  if (roll <= 4) return "human";
  if (roll <= 6) return "elf";
  if (roll <= 8) return "dwarf";
  return "halfling";
}

function chooseRandomAlignment() {
  const roll = rollDie(6);
  if (roll <= 3) return "lawful";
  if (roll <= 5) return "neutral";
  return "chaotic";
}

function chooseRandomClass() {
  return ["fighter", "priest", "thief", "wizard"][rollDie(4) - 1];
}

function applyStatIncrease(character, eligibleStats, amount = 2) {
  const chosen = [];

  if (amount === 2 && rollDie(2) === 2 && eligibleStats.length > 1) {
    const twoStats = pickUnique(eligibleStats, 2);
    twoStats.forEach((stat) => {
      character.stats[stat] += 1;
      chosen.push(`${STAT_LABELS[stat]} +1`);
    });
  } else {
    const stat = pick(eligibleStats);
    character.stats[stat] += amount;
    chosen.push(`${STAT_LABELS[stat]} +${amount}`);
  }

  refreshModifiers(character);
  return chosen.join(" i ");
}

function chooseAnotherTalentOrStats(character, depth) {
  if (depth >= 8 || rollDie(2) === 2) {
    const result = applyStatIncrease(character, STAT_KEYS, 2);
    character.talents.push(`Wynik 12: rozdzielono 2 punkty cech (${result}).`);
    return;
  }

  character.talents.push("Wynik 12: wybrano dodatkowy talent.");
  rollClassTalent(character, depth + 1);
}

function rollClassTalent(character, depth = 0) {
  const roll = rollDice(2, 6);
  const classId = character.classId;

  if (classId === "fighter") {
    if (roll === 2) {
      const available = CLASSES.fighter.weapons.filter(
        (weaponId) => !character.weaponMasteries.includes(weaponId),
      );
      const weaponId = available.length ? pick(available) : pick(CLASSES.fighter.weapons);
      character.weaponMasteries.push(weaponId);
      character.talents.push(`Mistrzostwo dodatkowej broni: ${WEAPONS[weaponId].name}.`);
    } else if (roll <= 6) {
      character.bonuses.meleeAttack += 1;
      character.bonuses.rangedAttack += 1;
      character.talents.push("+1 do ataków wręcz i dystansowych.");
    } else if (roll <= 9) {
      const result = applyStatIncrease(
        character,
        ["strength", "dexterity", "constitution"],
        2,
      );
      character.talents.push(`+2 do cech fizycznych (${result}).`);
    } else if (roll <= 11) {
      character.armorMastery = "leather";
      character.talents.push("+1 KP podczas noszenia skórzanej zbroi.");
    } else {
      chooseAnotherTalentOrStats(character, depth);
    }
    return;
  }

  if (classId === "priest") {
    if (roll === 2) {
      const spell = pick(character.spells);
      character.spellAdvantages.push(spell);
      character.talents.push(`Przewaga podczas rzucania czaru: ${spell}.`);
    } else if (roll <= 6) {
      if (rollDie(2) === 1) {
        character.bonuses.meleeAttack += 1;
        character.talents.push("+1 do ataków wręcz.");
      } else {
        character.bonuses.rangedAttack += 1;
        character.talents.push("+1 do ataków dystansowych.");
      }
    } else if (roll <= 9) {
      character.bonuses.spellcasting += 1;
      character.talents.push("+1 do testów rzucania czarów kapłańskich.");
    } else if (roll <= 11) {
      const result = applyStatIncrease(character, ["strength", "wisdom"], 2);
      character.talents.push(`+2 do SIŁ lub MĄD (${result}).`);
    } else {
      chooseAnotherTalentOrStats(character, depth);
    }
    return;
  }

  if (classId === "thief") {
    if (roll === 2) {
      if (character.initiativeAdvantage) {
        rollClassTalent(character, depth + 1);
      } else {
        character.initiativeAdvantage = true;
        character.talents.push("Przewaga w rzutach na inicjatywę.");
      }
    } else if (roll <= 5) {
      character.backstabDice += 1;
      character.talents.push("Cios w plecy zadaje +1 dodatkową kość obrażeń.");
    } else if (roll <= 9) {
      const result = applyStatIncrease(
        character,
        ["strength", "dexterity", "charisma"],
        2,
      );
      character.talents.push(`+2 do SIŁ, ZRĘ lub CHA (${result}).`);
    } else if (roll <= 11) {
      character.bonuses.meleeAttack += 1;
      character.bonuses.rangedAttack += 1;
      character.talents.push("+1 do ataków wręcz i dystansowych.");
    } else {
      chooseAnotherTalentOrStats(character, depth);
    }
    return;
  }

  if (classId === "wizard") {

    if (roll === 2) {
        const magicItem = generateMagicItem();

        character.magicItems.push(magicItem);

        character.talents.push(
            `Magiczny przedmiot — ${magicItem.name}: ${magicItem.cardText}`
        );
    } else if (roll <= 7) {
      if (rollDie(2) === 1) {
        const result = applyStatIncrease(character, ["intelligence"], 2);
        character.talents.push(`+2 do INT (${result}).`);
      } else {
        character.bonuses.spellcasting += 1;
        character.talents.push("+1 do testów rzucania czarów czarodziejskich.");
      }
    } else if (roll <= 9) {
      const spell = pick(character.spells);
      character.spellAdvantages.push(spell);
      character.talents.push(`Przewaga podczas rzucania czaru: ${spell}.`);
    } else if (roll <= 11) {
      const extra = pickUnique(WIZARD_SPELLS, 1, character.spells)[0];
      if (extra) {
        character.spells.push(extra);
        character.talents.push(`Dodatkowy znany czar: ${extra}.`);
      } else {
        character.talents.push("Znasz jeden dodatkowy czar czarodziejski dostępnego kręgu.");
      }
    } else {
      chooseAnotherTalentOrStats(character, depth);
    }
  }
}

function applyAncestry(character) {
  if (character.ancestryId === "human" && character.level === 1) {
    character.talentRolls += 1;
  }

  if (character.ancestryId === "human") {
    const language = pickUnique(COMMON_LANGUAGES, 1, character.languages)[0];
    if (language) character.languages.push(language);
  }

  if (character.ancestryId === "elf") {
    if (["priest", "wizard"].includes(character.classId)) {
      character.bonuses.spellcasting += 1;
      character.ancestryChoice = "+1 do testów rzucania czarów";
    } else {
      character.bonuses.rangedAttack += 1;
      character.ancestryChoice = "+1 do ataków dystansowych";
    }
  }

}

function addClassLanguagesAndSpells(character) {
  if (character.classId === "priest") {
    character.languages.push(pick(["Niebiański", "Diaboliczny", "Pierwotny"]));
    character.spells = pickUnique(PRIEST_SPELLS, 2);
    character.spells.unshift("Odpędzanie nieumarłych");
    character.deity = pick(DEITIES[character.alignmentId]);
  }

  if (character.classId === "wizard") {
    character.languages.push(
      ...pickUnique(COMMON_LANGUAGES, 2, character.languages),
      ...pickUnique(RARE_LANGUAGES, 2, character.languages),
    );
    character.spells = pickUnique(WIZARD_SPELLS, 3);
  }

  character.languages = [...new Set(character.languages)];
}

function applyClassSelections(character) {
  if (character.classId === "fighter") {
    character.weaponMasteries.push(character.weaponId);
    character.gritStat = pick(["strength", "dexterity"]);
  }

  if (character.classId === "thief") {
    character.backstabDice = 1 + Math.floor(character.level / 2);
  }
}

function calculateHp(character) {
  if (character.level === 0) {
    const base = Math.max(1, character.modifiers.constitution);
    return base + (character.ancestryId === "dwarf" ? 2 : 0);
  }

  const hitDie = CLASSES[character.classId].hitDie;
  const roll = character.ancestryId === "dwarf"
    ? Math.max(rollDie(hitDie), rollDie(hitDie))
    : rollDie(hitDie);
  const dwarfBonus = character.ancestryId === "dwarf" ? 2 : 0;
  return Math.max(1, roll + character.modifiers.constitution + dwarfBonus);
}

function calculateAc(character) {
  if (!character.armor) return 10 + character.modifiers.dexterity;

  let ac = character.armor.ac;
  if (character.armor.addDex) ac += character.modifiers.dexterity;
  if (character.armorMastery === character.armorId) ac += 1;
  return ac;
}

function getWeaponAttackStat(character, weapon) {
  if (weapon.type === "ranged") return "dexterity";
  if (weapon.type === "finesse") {
    return character.modifiers.dexterity >= character.modifiers.strength
      ? "dexterity"
      : "strength";
  }
  return "strength";
}

function buildAttack(character) {
  if (!character.weapon) return null;

  const weapon = character.weapon;
  const masteryBonus = character.classId === "fighter"
    && character.weaponMasteries.includes(character.weaponId)
    ? 1 + Math.floor(character.level / 2)
    : 0;

  const modes = [];

  const addMode = ({ label, stat, ranged, ancestryMeleeBonus = false }) => {
    const attackBonus = character.modifiers[stat]
      + (ranged ? character.bonuses.rangedAttack : character.bonuses.meleeAttack)
      + masteryBonus;
    const damageBonus = (ranged ? character.bonuses.rangedDamage : 0)
      + (ancestryMeleeBonus ? character.bonuses.meleeDamage : 0)
      + masteryBonus;
    modes.push({ label, attackBonus, damageBonus });
  };

  if (weapon.type === "ranged") {
    addMode({ label: "dystans", stat: "dexterity", ranged: true });
  } else if (weapon.type === "thrown") {
    addMode({ label: "wręcz", stat: "strength", ranged: false, ancestryMeleeBonus: true });
    addMode({ label: "rzut", stat: "strength", ranged: true });
  } else if (weapon.type === "finesse") {
    const stat = getWeaponAttackStat(character, weapon);
    addMode({ label: "wręcz", stat, ranged: false, ancestryMeleeBonus: true });
    addMode({ label: "rzut", stat, ranged: true });
  } else {
    addMode({ label: "wręcz", stat: "strength", ranged: false, ancestryMeleeBonus: true });
  }

  return {
    name: weapon.name,
    damage: weapon.damage,
    range: weapon.range,
    modes,
  };
}

function generateFirstLevelGear(character) {
  const classData = CLASSES[character.classId];
  character.weaponId = pick(classData.weapons);
  character.weapon = WEAPONS[character.weaponId];
  character.armorId = classData.wearsLeather ? "leather" : null;
  character.armor = character.armorId ? ARMORS[character.armorId] : null;
  character.gold = 15;
  character.gear = [...CRAWLING_KIT];
  character.gear.push(character.weapon.name);
  if (character.armor) character.gear.push(character.armor.name);
}

function generateZeroLevelGear(character) {
  character.gold = 0;
  character.gear = Array.from(
    { length: rollDie(4) },
    () => pick(ZERO_LEVEL_GEAR),
  );

  const weaponMap = {
    Sztylet: "dagger",
    "Krótki łuk i 5 strzał": "shortbow",
    Pałka: "club",
  };
  const firstWeaponName = character.gear.find((item) => weaponMap[item]);
  if (firstWeaponName) {
    character.weaponId = weaponMap[firstWeaponName];
    character.weapon = WEAPONS[character.weaponId];
  }
}

function calculateGearSlots(character) {
  let capacity = Math.max(10, character.stats.strength);
  if (character.classId === "fighter" && character.modifiers.constitution > 0) {
    capacity += character.modifiers.constitution;
  }

  if (character.level === 0) {
    return { capacity, used: character.gear.length };
  }

  const weaponSlots = character.weapon?.slots ?? 0;
  const armorSlots = character.armor?.slots ?? 0;

  const magicItemSlots = character.magicItems.reduce(
      (sum, item) => sum + (item.slots ?? 1),
      0
  );

  return {
      capacity,
      used:
          7 +
          weaponSlots +
          armorSlots +
          magicItemSlots
  };
}

function optionalNonPriestDeity(character) {
  if (character.classId === "priest") return;
  if (rollDie(3) === 1) {
    character.deity = "Brak lub nieokreślone bóstwo";
  } else {
    character.deity = pick(DEITIES[character.alignmentId]);
  }
}

function formatStats(character) {
  return STAT_KEYS.map(
    (key) => `${STAT_LABELS[key]} ${character.stats[key]} (${formatSigned(character.modifiers[key])})`,
  ).join(", ");
}

function formatAttack(attack) {
  if (!attack) return "Brak wylosowanej broni";
  const modes = attack.modes.map((mode) => {
    const damageBonus = mode.damageBonus === 0 ? "" : formatSigned(mode.damageBonus);
    return `${mode.label} ${formatSigned(mode.attackBonus)}, ${attack.damage}${damageBonus} obrażeń`;
  });
  return `${attack.name}: ${modes.join("; ")}; zasięg ${attack.range}`;
}

function createDescription(character) {
  const headerParts = [
    `${character.name}, ${character.ancestry.name.toLowerCase()}`,
    character.classData ? character.classData.name.toLowerCase() : "postać 0. poziomu",
  ];

  const lines = [
    `${headerParts.join(" — ")}.`,
    `Poziom ${character.level};`,
    `Pochodzenie: ${character.background.name}. ${character.background.description}`,
    `HP ${character.hp}/${character.hp}; KP ${character.ac}; sloty ${character.gearSlots.used}/${character.gearSlots.capacity}; złoto: ${character.gold}.`,
    `Cechy: ${formatStats(character)}.`,
    `Atak: ${formatAttack(character.attack)}.`,
    `Języki: ${character.languages.join(", ")}.`,
    `Pochodzenie: ${character.ancestry.feature}${character.ancestryChoice ? ` Wybrano: ${character.ancestryChoice}.` : ""}`,
  ];

  if (character.classData) {
    const classFeatures = [...character.classData.features];
    if (character.classId === "fighter") {
      classFeatures.push(
        `Mistrzostwo: ${character.weaponMasteries.map((id) => WEAPONS[id].name).join(", ")}.`,
        `Hart: przewaga w odpowiednich testach ${STAT_LABELS[character.gritStat]}.`,
      );
    }
    if (character.classId === "thief") {
      classFeatures.push(`Cios w plecy: +${character.backstabDice} kość obrażeń broni.`);
    }
    lines.push(`Atuty klasy: ${classFeatures.join(" ")}`);
  }

  if (character.talents.length) lines.push(`Talenty: ${character.talents.join(" ")}`);
  if (["priest", "wizard"].includes(character.classId)) {
    const castingStat = character.classId === "priest" ? "wisdom" : "intelligence";
    const castingBonus = character.modifiers[castingStat] + character.bonuses.spellcasting;
    lines.push(`Rzucanie czarów: ${formatSigned(castingBonus)}.`);
  }
  if (character.spells.length) lines.push(`Czary: ${character.spells.join(", ")}.`);
  if (character.spellAdvantages.length) {
    lines.push(`Przewaga przy rzucaniu: ${character.spellAdvantages.join(", ")}.`);
  }
  if (character.magicItems.length) {
      lines.push(
          `Magiczne przedmioty: ${
              character.magicItems
                  .map(item => `${item.name}: ${item.cardText}`)
                  .join(" | ")
          }`
      );
  }
  lines.push(`Ekwipunek: ${character.gear.join(", ")}.`);

  return lines.join("\n");
}

/**
 * Tworzy jedną postać.
 *
 * options:
 * - level: 0 albo 1 (domyślnie 1)
 * - characterClass: random | fighter | priest | thief | wizard
 * - ancestry: random | human | elf | dwarf | halfling
 * - alignment: random | lawful | neutral | chaotic
 * - rerollWeakStats: automatycznie przerzuć zestaw bez cechy 14+ (domyślnie true)
 */
export function createSluzospierdCharacter(options = {}) {
  const level = Number(options.level ?? 1);
  if (![0, 1].includes(level)) {
    throw new RangeError("Generator obsługuje obecnie wyłącznie poziom 0 albo 1.");
  }

  const ancestryOption = normalize(options.ancestry, ANCESTRY_ALIASES);
  const classOption = normalize(options.characterClass, CLASS_ALIASES);
  const alignmentOption = normalize(options.alignment, ALIGNMENT_ALIASES);
  const stats = makeStats(options.rerollWeakStats !== false);
  const ancestryId = ancestryOption === "random" ? chooseRandomAncestry() : ancestryOption;
  let classId = null;
  function chooseOptimalClass(stats){

      const scores = {
      fighter: stats.strength * 0.9 + stats.constitution * 0.1,
      priest: stats.wisdom,
      thief: stats.dexterity,
      wizard: stats.intelligence,
      };

      const bestScore = Math.max(...Object.values(scores));

      const bestClasses = Object.keys(scores).filter(
          classId => scores[classId] === bestScore
      );

    return pick(bestClasses);

  }

  if (level === 1) {
    if (classOption === "optimal") {
        classId = chooseOptimalClass(stats);
    } else if (classOption === "random") {
        classId = chooseRandomClass();
    } else {
        classId = classOption;
    }
  }

  
  const alignmentId = alignmentOption === "random"
    ? chooseRandomAlignment()
    : alignmentOption;

  const ancestry = ANCESTRIES[ancestryId];
  const classData = classId ? CLASSES[classId] : null;
  if (!ancestry) throw new Error(`Nieznane pochodzenie: ${ancestryId}`);
  if (level === 1 && !classData) throw new Error(`Nieznana klasa: ${classId}`);

  const character = {
    system: "Śluzospierd",
    level,
    ancestryId,
    ancestry,
    classId,
    classData,
    alignmentId,
    name: options.randomName === false
        ? "________________"
        :  generateAncestryName(ancestry),
    background: (() => {
      const [name, description] = pick(BACKGROUNDS);
      return { name, description };
    })(),
    stats,
    modifiers: {},
    languages: [...ancestry.languages],
    deity: null,
    title: classData ? classData.titles[alignmentId] : null,
    weaponId: null,
    weapon: null,
    armorId: null,
    armor: null,
    gear: [],
    gold: 0,
    spells: [],
    spellAdvantages: [],
    magicItems: [],
    talents: [],
    talentRolls: level === 1 ? 1 : 0,
    weaponMasteries: [],
    gritStat: null,
    armorMastery: null,
    backstabDice: 0,
    initiativeAdvantage: false,
    ancestryChoice: null,
    bonuses: {
      meleeAttack: 0,
      rangedAttack: 0,
      meleeDamage: 0,
      rangedDamage: 0,
      spellcasting: 0,
    },
  };

  refreshModifiers(character);

  if (level === 1) generateFirstLevelGear(character);
  else generateZeroLevelGear(character);

  applyAncestry(character);
  addClassLanguagesAndSpells(character);
  optionalNonPriestDeity(character);
  applyClassSelections(character);

  for (let i = 0; i < character.talentRolls; i += 1) {
    rollClassTalent(character);
  }

  refreshModifiers(character);
  character.hp = calculateHp(character);
  character.ac = calculateAc(character);
  character.gearSlots = calculateGearSlots(character);
  character.attack = buildAttack(character);
  character.createdCharacterDescription = createDescription(character);
  character.toString = function toString() {
    return this.createdCharacterDescription;
  };

  return character;
}

export const sluzospierdData = {
    ancestries: ANCESTRIES,
    classes: CLASSES,
    alignments: ALIGNMENTS,
    backgrounds: BACKGROUNDS,
    weapons: WEAPONS,
    priestSpells: PRIEST_SPELLS,
    wizardSpells: WIZARD_SPELLS,
    spellDetails: SPELL_DETAILS,
};

// ---------------------------------------------------------------------------
// Integracja z głównym generatorem
// ---------------------------------------------------------------------------
// Główny script.js zna już obiekty typu "picker". Dzięki getterowi `list`
// każdorazowe wywołanie pickFromList(SluzospierdCharacter) tworzy nową postać,
// ale sam Śluzospierd nie jest pickerRollerem i nie wymaga osobnej gałęzi
// w pickFromList().

const SLUZOSPIERD_DEFAULT_OPTIONS = {
  level: 1,
  characterClass: "random",
  ancestry: "random",
  alignment: "random",
  rerollWeakStats: true,
};

let lastSluzospierdCharacter = null;

function getDomValue(id, fallback) {
  if (typeof document === "undefined") return fallback;
  const element = document.getElementById(id);
  if (!element) return fallback;
  return element.value ?? fallback;
}

function getDomChecked(id, fallback) {
  if (typeof document === "undefined") return fallback;
  const element = document.getElementById(id);
  if (!element) return fallback;
  return Boolean(element.checked);
}




/** Zwraca ostatnią postać wygenerowaną przez główny przycisk generatora. */
export function getLastSluzospierdCharacter() {
  return lastSluzospierdCharacter;
}

/**
 * Obiekt widziany przez główny script.js jako zwykły `picker`.
 * `list` jest getterem, więc nie przechowuje jednej postaci na stałe.
 * Każdy odczyt tworzy nową postać według bieżących opcji z HTML-a.
 */
export const SluzospierdCharacter = {
  type: "picker",

  get list() {
    lastSluzospierdCharacter = createSluzospierdCharacter(
      getSluzospierdOptionsFromDom(),
    );
    return [lastSluzospierdCharacter];
  },
};
