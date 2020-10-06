'use strict';
const TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Дворец`
};
const MIN_PRICE = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0
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
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const map = document.querySelector(`.map`);
const pinsContainer = map.querySelector(`.map__pins`);
const newPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const cardsContainer = document.querySelector(`.map`);
const room = document.querySelector(`#room_number`);
const guest = document.querySelector(`#capacity`);
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const address = adForm.querySelector(`#address`);
const mainPin = document.querySelector(`.map__pin--main`);
const getRandomInt = (min, max) => (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min));
const getRandomElement = (arr) => (arr[getRandomInt(0, arr.length - 1)]);
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
  newPin.style.cssText = `left: ${moks.location.x + PIN_WIDTH / 2}px; top: ${moks.location.y + PIN_HEIGHT}px`;
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


// module3-task2


const createCard = (mock) => {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(`.popup__avatar`).src = mock.author.avatar;
  newCard.querySelector(`.popup__title`).textContent = mock.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = mock.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${mock.offer.price}₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = TYPES[mock.offer.type];
  newCard.querySelector(`.popup__text--capacity`).textContent = `${mock.offer.rooms} комнаты для ${mocks[0].offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${mock.offer.checkin}, выезд до ${mocks[0].offer.checkout}`;
  const popupFeatures = Array.from(newCard.querySelectorAll(`.popup__feature`));
  const popupFeaturesContainer = newCard.querySelector(`.popup__features`);
  const notAvailableFeatures = popupFeatures.filter((elem) => !mock.offer.features.some((str) => elem.className.includes(`--${str}`)));
  notAvailableFeatures.forEach((feature) => popupFeaturesContainer.removeChild(feature));
  newCard.querySelector(`.popup__description`).textContent = mock.offer.description;
  const photoContainer = newCard.querySelector(`.popup__photos`);
  const imgPhoto = photoContainer.querySelector(`img`);
  const photos = mock.offer.photos;
  photoContainer.innerHTML = ``;
  for (let i = 0; i < photos.length; i++) {
    const newImg = imgPhoto.cloneNode(true);
    newImg.src = photos[i];
    photoContainer.appendChild(newImg);
  }
  return newCard;
};
const renderCard = (indexOfMock) => {
  const card = createCard(mocks[indexOfMock]);
  cardsContainer.insertBefore(card, cardsContainer.lastElementChild);
};


// module4-task1


const deactivateElements = () => {
  adForm.querySelectorAll(`fieldset`).forEach((elem) => elem.setAttribute(`disabled`, `true`));
  mapFilters.classList.add(`map__filters--disabled`);
  [...mapFilters.children].forEach((elem) => elem.setAttribute(`disabled`, `true`));
};
deactivateElements();
address.setAttribute(`readonly`, true);
const getAddresValue = (gapX, gapY) => {
  address.value = (parseInt(mainPin.style.left, 10) + gapX) + `, ` + (parseInt(mainPin.style.top, 10) + gapY);
};
getAddresValue(GAP, GAP);
const roomForGuestsMap = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`],
};
const changeRoomNumberValue = (value) => {
  [...guest.options].forEach((option) => {
    option.disabled = !roomForGuestsMap[value].includes(option.value);
  });
  guest.value = value > 3 ? 0 : value;
};
changeRoomNumberValue(room.value);

// module4-task2


const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = (indexOfMock) => {
  const cardPopup = map.querySelector(`.popup`);
  if (cardPopup) {
    cardPopup.remove();
  }
  renderCard(indexOfMock);

  const closePopupButton = map.querySelector(`.popup__close`);
  document.addEventListener(`keydown`, onPopupEscPress);
  closePopupButton.addEventListener(`click`, () => {
    closePopup();
  });
};
const closePopup = () => {
  const cardPopup = map.querySelector(`.popup`);
  cardPopup.remove();
  document.removeEventListener(`keydown`, onPopupEscPress);
};
const titleInput = adForm.querySelector(`#title`);
const checkTitleLength = () => {
  const valueLength = titleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Еще ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
  } else {
    titleInput.setCustomValidity(``);
  }
  titleInput.reportValidity();
};
const type = adForm.querySelector(`#type`);
const price = adForm.querySelector(`#price`);
const checkPrice = () => {
  price.placeholder = MIN_PRICE[type.value];
  if (price.value < price.placeholder) {
    price.setCustomValidity(`Минимальная цена для данного типа жилья: ` + price.placeholder);
  } else {
    price.setCustomValidity(``);
  }
  price.reportValidity();
};
const timein = adForm.querySelector(`#timein`);
const timeout = adForm.querySelector(`#timeout`);
const activateElements = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  adForm.querySelectorAll(`fieldset`).forEach((elem) => elem.removeAttribute(`disabled`, `true`));
  mapFilters.classList.remove(`map__filters--disabled`);
  renderPins(mocks);
  [...mapFilters.children].forEach((elem) => elem.removeAttribute(`disabled`, `true`));
  const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((elem, index) => {
    elem.addEventListener(`click`, () => {
      openPopup(index);
    });
  });
  getAddresValue(GAP, GAP_WITH_ARROW);
  type.addEventListener(`change`, () => {
    checkPrice();
  });
  price.addEventListener(`input`, () => {
    checkPrice();
  });
  titleInput.addEventListener(`input`, () => {
    checkTitleLength();
  });
  room.addEventListener(`change`, (evt) => {
    changeRoomNumberValue(evt.target.value);
  });
  timein.addEventListener(`change`, () => {
    timeout.value = timein.value;
  });
  timeout.addEventListener(`change`, () => {
    timein.value = timeout.value;
  });
};
mainPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter` && map.classList.contains(`map--faded`)) {
    activateElements();
  }
});
mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0 && map.classList.contains(`map--faded`)) {
    activateElements();
  }
});


