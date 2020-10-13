'use strict';

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const deactivateElements = () => {
  window.map.deactivate();
  window.form.deactivate();
};
deactivateElements();
const activateElements = () => {
  window.map.activate();
  window.form.activate();
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
  window.pin.dragNDropMainPin(`mousedown`);
  evt.preventDefault();
});


