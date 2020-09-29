'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TYPES_TRANSLATE = {
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
const NUMBER_OF_CARD = 0;
const map = document.querySelector(`.map`);
const pinsContainer = map.querySelector(`.map__pins`);
const newPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const cardsContainer = document.querySelector(`.map`);

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
        type: getRandomElement(TYPES),
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
map.classList.remove(`map--faded`);
const createPin = (moks) => {
  const newPin = newPinTemplate.cloneNode(true);
  const newPinImg = newPin.querySelector(`img`);
  newPin.style.cssText = `left: ${moks.location.x - newPinImg.width}px; top: ${moks.location.y - (newPinImg.height) / 2}px`;
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


const createCard = (numberOfMock) => {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(`.popup__title`).textContent = `${mocks[numberOfMock].offer.title}`;
  newCard.querySelector(`.popup__text--address`).textContent = `${mocks[numberOfMock].offer.address}`;
  newCard.querySelector(`.popup__text--price`).textContent = `${mocks[numberOfMock].offer.price}₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = `${TYPES_TRANSLATE[mocks[numberOfMock].offer.type]}`;
  newCard.querySelector(`.popup__text--capacity`).textContent = `${mocks[numberOfMock].offer.rooms} комнаты для ${mocks[0].offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${mocks[numberOfMock].offer.checkin}, выезд до ${mocks[0].offer.checkout}`;
  const popupFeatures = Array.from(newCard.querySelectorAll(`.popup__feature`));
  const popupFeaturesContainer = newCard.querySelector(`.popup__features`);
  const notAvailableFeatures = popupFeatures.filter((elem) => !mocks[numberOfMock].offer.features.some((str) => elem.className.includes(`--${str}`)));
  notAvailableFeatures.forEach((feature) => popupFeaturesContainer.removeChild(feature));
  newCard.querySelector(`.popup__description`).textContent = `${mocks[numberOfMock].offer.description}`;
  const photoContainer = newCard.querySelector(`.popup__photos`);
  const imgPhoto = photoContainer.querySelector(`img`);
  const photos = mocks[numberOfMock].offer.photos;
  photoContainer.innerHTML = ``;
  for (let i = 0; i < photos.length; i++) {
    const newImg = imgPhoto.cloneNode(true);
    newImg.src = `${photos[i]}`;
    photoContainer.appendChild(newImg);
  }
  return newCard;
};
const renderCards = () => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(NUMBER_OF_CARD));
  cardsContainer.insertBefore(fragment, document.querySelector(`.map__filters-container`));
};
renderCards();
