
'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const map = document.querySelector(`.map`);
const pins = document.querySelector(`.map__pins`);
const newPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - min)) + min;
};
const getRandomElement = (arr) => {
  const randomElement = arr[Math.floor(Math.random() * arr.length)];
  return randomElement;
};
const getRandomLengthArr = (arr) => {
  const newArr = [];
  for (let i = 0; i < getRandomInt(1, arr.length); i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};
const generateMoks = () => {
  const moks = [];
  for (let i = 0; i < 8; i++) {
    moks[i] = {};
    moks[i].author = {};
    moks[i].author.avatar = `img/avatars/user0${getRandomInt(1, 8)}.png`;
    moks[i].offer = {};
    moks[i].offer.title = `заголовок объявления`;
    moks[i].offer.address = `600, 350`;
    moks[i].offer.price = Number;
    moks[i].offer.type = getRandomElement(TYPES);
    moks[i].offer.rooms = Number;
    moks[i].offer.guests = Number;
    moks[i].offer.checkin = getRandomElement(TIMES);
    moks[i].offer.checkout = getRandomElement(TIMES);
    moks[i].offer.features = getRandomLengthArr(FEATURES);
    moks[i].offer.description = ``;
    moks[i].offer.photos = getRandomLengthArr(PHOTOS);
    moks[i].location = {};
    moks[i].location.x = getRandomInt(1, 1000);
    moks[i].location.y = getRandomInt(130, 630);
  }
  return moks;
};
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
  for (let i = 0; i < 8; i++) {
    fragment.appendChild(createPins(moks[i]));
  }
  pins.appendChild(fragment);
};
renderPins(generateMoks());
