'use strict';
const TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Дворец`
};
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const COUNT_OF_MOCK = 8;
const LOCATION_X_MIN = 10;
const LOCATION_X_MAX = 1000;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const GAP = 31;
const GAP_WITH_ARROW = 84;
const map = document.querySelector(`.map`);
const pinsContainer = map.querySelector(`.map__pins`);
const newPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
// const cardsContainer = document.querySelector(`.map`);
const room = document.querySelector(`#room_number`);
const guest = document.querySelector(`#capacity`);
const rooms = room.querySelectorAll(`option`);
const guests = guest.querySelectorAll(`option`);
const roomsArr = Array.from(rooms);
const guestsArr = Array.from(guests);
const buttonSubmit = document.querySelector(`.ad-form__submit`);
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const address = adForm.querySelector(`#address`);
const mainPin = document.querySelector(`.map__pin--main`);
const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
const getRandomLengthArr = (arr) => {
  const newArr = [];
  for (let i = 0; i < getRandomInt(1, arr.length); i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};
const generateMoks = (countOfMocks) => {
  const moks = [];
  for (let i = 1; i <= countOfMocks; i++) {
    moks.push({
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `Заголовок объявления`,
        address: `${getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX)}, ${getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)}`,
        price: getRandomInt(100, 5000),
        type: getRandomElement(Object.keys(TYPES)),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 6),
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: getRandomLengthArr(FEATURES),
        description: `Великолепная квартира в центре Токио`,
        photos: getRandomLengthArr(PHOTOS)
      },
      location: {
        x: getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX),
        y: getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    });
  }
  return moks;
};
const mocks = generateMoks(COUNT_OF_MOCK);
const createPin = (moks) => {
  const newPin = newPinTemplate.cloneNode(true);
  const newPinImg = newPin.querySelector(`img`);
  newPin.style.cssText = `left: ${moks.location.x + newPinImg.height}px; top: ${moks.location.y + (newPinImg.width) / 2}px`;
  newPinImg.src = `${moks.author.avatar}`;
  newPinImg.alt = `${moks.offer.title}`;
  return newPin;
};
const renderPins = (moks) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < COUNT_OF_MOCK; i++) {
    fragment.appendChild(createPin(moks[i]));
  }
  pinsContainer.appendChild(fragment);
};
renderPins(mocks);

// module3-task2


// const createCard = (mock) => {
//   const newCard = cardTemplate.cloneNode(true);
//   newCard.querySelector(`.popup__title`).textContent = `${mock.offer.title}`;
//   newCard.querySelector(`.popup__text--address`).textContent = `${mock.offer.address}`;
//   newCard.querySelector(`.popup__text--price`).textContent = `${mock.offer.price}₽/ночь`;
//   newCard.querySelector(`.popup__type`).textContent = `${TYPES[mock.offer.type]}`;
//   newCard.querySelector(`.popup__text--capacity`).textContent = `${mock.offer.rooms} комнаты для ${mocks[0].offer.guests} гостей`;
//   newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${mock.offer.checkin}, выезд до ${mocks[0].offer.checkout}`;
//   const popupFeatures = Array.from(newCard.querySelectorAll(`.popup__feature`));
//   const popupFeaturesContainer = newCard.querySelector(`.popup__features`);
//   const notAvailableFeatures = popupFeatures.filter((elem) => !mock.offer.features.some((str) => elem.className.includes(`--${str}`)));
//   notAvailableFeatures.forEach((feature) => popupFeaturesContainer.removeChild(feature));
//   newCard.querySelector(`.popup__description`).textContent = `${mock.offer.description}`;
//   const photoContainer = newCard.querySelector(`.popup__photos`);
//   const imgPhoto = photoContainer.querySelector(`img`);
//   const photos = mock.offer.photos;
//   photoContainer.innerHTML = ``;
//   for (let i = 0; i < photos.length; i++) {
//     const newImg = imgPhoto.cloneNode(true);
//     newImg.src = `${photos[i]}`;
//     photoContainer.appendChild(newImg);
//   }
//   return newCard;
// };
// const renderCards = () => {
//   const fragment = document.createDocumentFragment();
//   fragment.appendChild(createCard(mocks[0]));
//   cardsContainer.insertBefore(fragment, document.querySelector(`.map__filters-container`));
// };
// renderCards();


// module4-task1


const deactivateElements = () => {
  Array.from(adForm.querySelectorAll(`fieldset`)).forEach((e) => e.setAttribute(`disabled`, `true`));
  mapFilters.classList.add(`map__filters--disabled`);
  Array.from(mapFilters.querySelectorAll(`select`)).forEach((e) => e.setAttribute(`disabled`, `true`));
  mapFilters.querySelector(`fieldset`).setAttribute(`disabled`, `true`);
};
deactivateElements();
const activateElements = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  Array.from(adForm.querySelectorAll(`fieldset`)).forEach((e) => e.removeAttribute(`disabled`, `true`));
  mapFilters.classList.remove(`map__filters--disabled`);
  Array.from(mapFilters.querySelectorAll(`select`)).forEach((e) => e.removeAttribute(`disabled`, `true`));
  mapFilters.querySelector(`fieldset`).removeAttribute(`disabled`, `true`);
};
address.setAttribute(`readonly`, true);
const getAddresValue = (gapX, gapY) => {
  address.value = (parseInt(mainPin.style.left, 10) + gapX) + `, ` + (parseInt(mainPin.style.top, 10) + gapY);
};
getAddresValue(GAP, GAP);
mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activateElements();
    getAddresValue(GAP, GAP_WITH_ARROW);
  }
});
mainPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activateElements();
    getAddresValue(GAP, GAP_WITH_ARROW);
  }
});
const valueSelected = (arr) => parseInt(arr.find((elem) => elem.selected).value, 10);
const checkGuestsValue = () => {
  if ((valueSelected(guestsArr) > valueSelected(roomsArr))) {
    room.setCustomValidity(`Выберите побольше комнат`);
  } else if (valueSelected(guestsArr) === 0 && valueSelected(roomsArr) !== 100) {
    room.setCustomValidity(`Выберите 100 комнат`);
  } else if (valueSelected(guestsArr) !== 0 && valueSelected(roomsArr) === 100) {
    room.setCustomValidity(`Не для гостей`);
  } else {
    room.setCustomValidity(``);
  }
  room.reportValidity();
};
guest.addEventListener(`change`, () => {
  checkGuestsValue();
});
room.addEventListener(`change`, () => {
  checkGuestsValue();
});
buttonSubmit.addEventListener(`click`, () => {
  checkGuestsValue();
});

