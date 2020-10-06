'use strict';
const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const deactivateElements = () => {
  window.form.deactivate();
  window.map.deactivate();
};
deactivateElements();
const activateElements = () => {
  window.form.activate();
  window.map.activate();
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


