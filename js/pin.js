'use strict';
const SHIFT_WIDTH = 25;
const SHIFT_HEIGHT = 70;
const MAX_PINS = 5;

const pinsContainer = document.querySelector(`.map__pins`);
const newPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapFilter = document.querySelector(`.map__filters`);
const setDeactivePins = () => {
  const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((elem) => elem.classList.remove(`map__pin--active`));
};

const setActivePin = (pin) => {
  pin.classList.add(`map__pin--active`);
};

const createPin = (moks) => {
  const newPin = newPinTemplate.cloneNode(true);
  const newPinImg = newPin.querySelector(`img`);
  newPin.style.cssText = `left: ${moks.location.x - SHIFT_WIDTH}px; top: ${moks.location.y - SHIFT_HEIGHT}px`;
  newPinImg.src = moks.author.avatar;
  newPinImg.alt = moks.offer.title;
  return newPin;
};

const renderPins = (moks) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; (i < moks.length && i < MAX_PINS); i++) {
    if (moks[i].offer) {
      fragment.appendChild(createPin(moks[i]));
    }
  }
  pinsContainer.appendChild(fragment);
  mapFilter.classList.remove(`map__filters--disabled`);
  [...mapFilter.children].forEach((elem) => elem.removeAttribute(`disabled`, `true`));
  const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((elem, index) => elem.addEventListener(`click`, () => {
    setDeactivePins();
    setActivePin(elem);
    window.map.openPopupCard(index);
  }));
};

const removePins = () => {
  const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((elem) => {
    elem.remove();
  });
};

window.pin = {
  render: renderPins,
  remove: removePins,
  deactive: setDeactivePins,
};

