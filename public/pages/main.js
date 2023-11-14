import { items } from "./items.mjs";

// ----------------------------- ITEMS TYPE SELECTION ------------------------

const itemTypeButtons = document.querySelectorAll("#type-selection button");

itemTypeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const itemsToDelete = document.querySelectorAll("#items-area div");

    itemsToDelete.forEach((element) => {
      element.remove();
    });

    const typeSelected = event.target.id;
    refreshData(typeSelected);
  });
});

// ----------------------- REFRESH INVENTORY DATA -----------------------
const refreshData = (imgId) => {
  switch (imgId) {
    case "weapon-img":
      itemTypeButtons[0].classList.add("bg-secondary-color");
      itemTypeButtons[1].classList.remove("bg-secondary-color");
      itemTypeButtons[2].classList.remove("bg-secondary-color");
      itemTypeButtons[1].classList.add("bg-button-background");
      itemTypeButtons[2].classList.add("bg-button-background");
      renderingItems("weapons");
      break;
    case "shield-img":
      itemTypeButtons[1].classList.add("bg-secondary-color");
      itemTypeButtons[0].classList.remove("bg-secondary-color");
      itemTypeButtons[2].classList.remove("bg-secondary-color");
      itemTypeButtons[0].classList.add("bg-button-background");
      itemTypeButtons[2].classList.add("bg-button-background");
      renderingItems("shields");
      break;
    case "armor-img":
      itemTypeButtons[2].classList.add("bg-secondary-color");
      itemTypeButtons[0].classList.remove("bg-secondary-color");
      itemTypeButtons[1].classList.remove("bg-secondary-color");
      itemTypeButtons[0].classList.add("bg-button-background");
      itemTypeButtons[1].classList.add("bg-button-background");
      renderingItems("armors");
      break;

    default:
      break;
  }
};

// ------------------------------------------------------ INVENTORY ITEMS ----------------------------------------------------
const itemsArea = document.querySelector("#items-area");

const renderingItems = (types) => {
  switch (types) {
    // -------------------------- WEAPONS: ---------------------------
    case "weapons":
      items.weapons.forEach((weapon, index) => {
        const itemSquare = document.createElement("div");

        itemSquare.addEventListener("click", (event) => {
          const imgSource = event.target.src;
          const itemCategory = weapon.category;
          equipedItems(imgSource, itemCategory);

          const itemSelectedId = event.target.id;
          changeItemBgColor(itemSelectedId);

          itemModalInfo(itemSelectedId, itemCategory);

          arrowAnimation(itemSelectedId);
        });

        itemSquare.innerHTML = `<img id="${weapon.name}" src="${weapon.icon}"/><aside class="h-5 w-7 border border-border-color absolute bottom-0 right-0 flex justify-center items-center translate-x-2 translate-y-2 bg-background-primary"><p class="italic">${weapon.stats.damage}</p></aside>`;
        itemSquare.classList = `${weapon.name} h-[100px] w-[100px] border border-border-color relative  cursor-pointer`;
        itemsArea.append(itemSquare);
      });

      emptySquares(items.weapons.length);
      break;

    // -------------------------- SHIELDS: ---------------------------
    case "shields":
      items.shields.forEach((shield, index) => {
        const itemSquare = document.createElement("div");

        itemSquare.addEventListener("click", (event) => {
          const imgSource = event.target.src;
          const itemCategory = shield.category;
          equipedItems(imgSource, itemCategory);

          const itemSelectedId = event.target.id;
          changeItemBgColor(itemSelectedId);

          itemModalInfo(itemSelectedId, itemCategory);

          arrowAnimation(itemSelectedId);
        });

        itemSquare.innerHTML = `<img id="${shield.name}" src="${shield.icon}"/><aside class="h-5 w-7 border border-border-color absolute bottom-0 right-0 flex justify-center items-center translate-x-2 translate-y-2 bg-background-primary"><p class="italic">${shield.stats.defense}</p></aside>`;
        itemSquare.classList = `${shield.name} h-[100px] w-[100px] border border-border-color relative  cursor-pointer`;
        itemSquare.setAttribute("id", `${index}`);
        itemsArea.append(itemSquare);
      });

      emptySquares(items.shields.length);
      break;

    // -------------------------- ARMORS: ---------------------------
    case "armors":
      items.armors.forEach((armor, index) => {
        const itemSquare = document.createElement("div");

        itemSquare.addEventListener("click", (event) => {
          const imgSource = event.target.src;
          const itemCategory = armor.category;
          equipedItems(imgSource, itemCategory);

          const itemSelectedId = event.target.id;
          changeItemBgColor(itemSelectedId);

          itemModalInfo(itemSelectedId, itemCategory);

          arrowAnimation(itemSelectedId);
        });

        itemSquare.innerHTML = `<img id="${armor.name}" src="${armor.icon}"/><aside class="h-5 w-7 border border-border-color absolute bottom-0 right-0 flex justify-center items-center translate-x-2 translate-y-2 bg-background-primary"><p class="italic">${armor.stats.armor}</p></aside>`;
        itemSquare.classList = `${armor.name} h-[100px] w-[100px] border border-border-color relative  cursor-pointer`;
        itemSquare.setAttribute("id", `${index}`);
        itemsArea.append(itemSquare);
      });

      emptySquares(items.armors.length);
    default:
      break;
  }
};

// ---------------------------------------- EMPTY SQUARES FUNCTION -------------------------------------------
const emptySquares = (typeLength) => {
  if (typeLength < 16) {
    for (let index = 0; index < 16 - typeLength; index++) {
      const itemSquare = document.createElement("div");
      itemSquare.classList =
        "h-[100px] w-[100px] border border-border-color bg-secondary-color";
      itemsArea.append(itemSquare);
    }
  }
};

// ---------------------------------------- FIRST ITEMS RENDERING ---------------------------------
renderingItems("weapons");

// -------------------------------------------- ITEMS EQUIPED -----------------------------------------------

const equipedItems = (imgSource, itemCategory) => {
  const bodyPartTop = document.querySelector("#body-top");
  const bodyPartWeapon = document.querySelector("#body-weapon");
  const bodyPartChest = document.querySelector("#body-chest");
  const bodyPartShield = document.querySelector("#body-shield");
  const bodyPartBottom = document.querySelector("#body-bottom");

  const bodyPartImg = document.createElement("img");

  switch (itemCategory) {
    case "weapon":
      const weaponVerification = document.querySelector("#body-weapon img");
      if (weaponVerification) {
        weaponVerification.remove("img");
      }
      bodyPartImg.src = imgSource;
      bodyPartWeapon.append(bodyPartImg);

      break;

    case "shield":
      const shieldVerification = document.querySelector("#body-shield img");
      if (shieldVerification) {
        shieldVerification.remove("img");
      }
      bodyPartImg.src = imgSource;
      bodyPartShield.append(bodyPartImg);
      break;

    case "helm":
      const helmVerification = document.querySelector("#body-top img");
      if (helmVerification) {
        helmVerification.remove("img");
      }
      bodyPartImg.src = imgSource;
      bodyPartTop.append(bodyPartImg);
      break;

    case "armor":
      const armorVerification = document.querySelector("#body-chest img");
      if (armorVerification) {
        armorVerification.remove("img");
      }
      bodyPartImg.src = imgSource;
      bodyPartChest.append(bodyPartImg);
      break;

    case "greave":
      const greaveVerification = document.querySelector("#body-bottom img");
      if (greaveVerification) {
        greaveVerification.remove("img");
      }
      bodyPartImg.src = imgSource;
      bodyPartBottom.append(bodyPartImg);
      break;

    default:
      break;
  }
};

// ---------------------------------------------------- CHANGE ITEM SELECTED BACKGROUND COLOR --------------------------------------

const changeItemBgColor = (itemSelectedId) => {
  const allItemsAreaImg = document.querySelectorAll("#items-area div");

  allItemsAreaImg.forEach((element) => {
    const classArray = element.classList;

    if (
      (classArray[0] === itemSelectedId.split(" ")[0] &&
        classArray[1] === itemSelectedId.split(" ")[1]) ||
      (classArray[0] === "Flameblade" &&
        itemSelectedId.split(" ")[0] === "Flameblade")
    ) {
      element.classList.add("bg-item-selection-color");
      element.classList.add("shadow");
      element.classList.add("shadow-white");
    } else {
      element.classList.remove("bg-item-selection-color");
      element.classList.remove("shadow");
    }
  });
};

// ------------------------------------------------------- MODAL WITH ITEM INFO ----------------------------------------------------

const itemModalInfo = (itemSelectedId, itemCategory) => {
  const descriptionModal = document.querySelector("#description-modal");
  const h2 = document.querySelector("#item-name");
  const divItemStatNumber = document.querySelector("#item-stat-number");
  const pItemDescription = document.querySelector("#item-description");
  const iconInModal = document.querySelector("#item-icon");

  switch (itemCategory) {
    case "weapon":
      const weaponResult = items.weapons.find(
        (item) => item.name === itemSelectedId
      );
      descriptionModal.classList.remove("hidden");
      h2.innerText = `${weaponResult.name}`;
      divItemStatNumber.innerHTML = `${weaponResult.stats.damage}`;
      pItemDescription.innerHTML = `${weaponResult.description}`;

      iconInModal.innerHTML = `<img class="w-5 h-5" src="../assets/sword-icon.svg" />`;

      compareItemStats(weaponResult.stats.damage);

      break;

    case "shield":
      const shieldResult = items.shields.find(
        (item) => item.name === itemSelectedId
      );
      descriptionModal.classList.remove("hidden");
      h2.innerText = `${shieldResult.name}`;
      divItemStatNumber.innerHTML = `${shieldResult.stats.defense}`;

      pItemDescription.innerHTML = `${shieldResult.description}`;

      iconInModal.innerHTML = `<img class="w-5 h-5" src="../assets/shield-icon.svg" />`;

      compareItemStats(shieldResult.stats.defense);
      break;

    case "helm":
      const helmdResult = items.armors.find(
        (item) => item.name === itemSelectedId
      );
      descriptionModal.classList.remove("hidden");
      h2.innerText = `${helmdResult.name}`;
      divItemStatNumber.innerHTML = `${helmdResult.stats.armor}`;

      pItemDescription.innerHTML = `${helmdResult.description}`;

      iconInModal.innerHTML = `<img class="w-5 h-5" src="../assets/armor-icon.svg" />`;

      compareItemStats(helmdResult.stats.armor);
      break;

    case "armor":
      const armorResult = items.armors.find(
        (item) => item.name === itemSelectedId
      );
      descriptionModal.classList.remove("hidden");
      h2.innerText = `${armorResult.name}`;
      divItemStatNumber.innerHTML = `${armorResult.stats.armor}`;

      pItemDescription.innerHTML = `${armorResult.description}`;

      iconInModal.innerHTML = `<img class="w-5 h-5" src="../assets/armor-icon.svg" />`;

      compareItemStats(armorResult.stats.armor);
      break;

    case "greave":
      const greaveResult = items.armors.find(
        (item) => item.name === itemSelectedId
      );
      descriptionModal.classList.remove("hidden");
      h2.innerText = `${greaveResult.name}`;
      divItemStatNumber.innerHTML = `${greaveResult.stats.armor}`;

      pItemDescription.innerHTML = `${greaveResult.description}`;

      iconInModal.innerHTML = `<img class="w-5 h-5" src="../assets/armor-icon.svg" />`;

      compareItemStats(greaveResult.stats.armor);
      break;

    default:
      break;
  }
};

// --------------------------------------------- COMPARE ITEMS STATS -----------------------------------------
const compareItemStats = (itemStat) => {
  const divDefaultStat = document.querySelector("#default-stat");
  const divItemStatNumber = document.querySelector("#item-stat-number");

  if (itemStat > 10) {
    divDefaultStat.classList.remove("border-[#4ADE80]");
    divDefaultStat.classList.add("border-[#FCA5A5]");

    divItemStatNumber.classList.remove("border-[#FCA5A5]");
    divItemStatNumber.classList.add("border-[#4ADE80]");
  } else {
    divDefaultStat.classList.remove("border-[#FCA5A5]");
    divDefaultStat.classList.add("border-[#4ADE80]");

    divItemStatNumber.classList.remove("border-[#4ADE80]");
    divItemStatNumber.classList.add("border-[#FCA5A5]");
  }
};

// --------------------------------------------- ARROWS SELECTION ANIMATION ------------------------------------

const arrowAnimation = (itemId) => {
  // ---------------------------- ARROWS CONTAINER --------------------------------
  const divArrowContainer = document.createElement("div");
  divArrowContainer.classList =
    "arrow-container absolute top-0 w-[100px] h-[100px] animate-expand-animation"; //  animate-expanding
  divArrowContainer.innerHTML = `<div class="absolute bottom-0 right-0  w-0 h-0 border-white border-r-[11px]  border-t-[11px] border-t-transparent  "></div><div class="absolute bottom-0 left-0 rotate-90 w-0 h-0 border-white border-r-[11px]  border-t-[11px] border-t-transparent  "></div><div class="absolute top-0 left-0 rotate-180 w-0 h-0 border-white border-r-[11px]  border-t-[11px] border-t-transparent  "></div><div class="absolute top-0 right-0 -rotate-90 w-0 h-0 border-white border-r-[11px]  border-t-[11px] border-t-transparent  "></div>`;

  const allItemsDivs = document.querySelectorAll("#items-area div");

  const itemClase = itemId.split(" ");

  const resetAnimation = document.querySelector(".arrow-container");

  if (resetAnimation != null) {
    resetAnimation.remove();
  }

  allItemsDivs.forEach((div) => {
    if (
      (div.classList[0] === itemClase[0] &&
        div.classList[1] === itemClase[1]) ||
      (div.classList[0] === "Flameblade" && itemClase[0] === "Flameblade")
    ) {
      div.append(divArrowContainer);
    } else {
    }
  });
};
