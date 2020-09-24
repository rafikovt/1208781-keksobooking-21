'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const COUNT_OF_MOCK = 8;
const LOCATION_X_MIN = 10;
const LOCATION_X_MAX = 1000;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const map = document.querySelector(`.map`);
const pinsContainer = document.querySelector(`.map__pins`);
const newPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - min)) + min;
};
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomLengthArr = (arr) => {
  const newArr = [];
  for (let i = 0; i < getRandomInt(1, arr.length); i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};
const generateMoks = (countOfMocks) => {
  const moks = [];
  for (let i = 0; i < countOfMocks; i++) {
    moks[i] = {
      author: {
        avatar: `img/avatars/user0${getRandomInt(1, 8)}.png`
      },
      offer: {
        title: `Заголовок объявления`,
        address: `${getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX)}, ${getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)}`,
        price: null,
        type: getRandomElement(TYPES),
        rooms: null,
        guests: null,
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: getRandomLengthArr(FEATURES),
        description: ``,
        photos: getRandomLengthArr(PHOTOS)
      },
      location: {
        x: getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX),
        y: getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    };
  }
  return moks;
};
const mocks = generateMoks(COUNT_OF_MOCK);
map.classList.remove(`map--faded`);
const createPins = (moks) => {
  const newPin = newPinTemplate.cloneNode(true);
  const newPinImg = newPin.querySelector(`img`);
  newPin.style = `left: ${moks.location.x - newPinImg.width}px; 
                    top: ${moks.location.y - (newPinImg.height) / 2}px`;
  newPinImg.src = `${moks.author.avatar}`;
  newPinImg.alt = `${moks.offer.title}`;
  return newPin;
};
const renderPins = (moks) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < COUNT_OF_MOCK; i++) {
    fragment.appendChild(createPins(moks[i]));
  }
  pinsContainer.appendChild(fragment);
};
renderPins(mocks);
