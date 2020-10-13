'use strict';
(() => {
  const mainPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  window.main = {
    deactivateElements: () => {
      window.map.deactivate();
      window.form.deactivate();
    },
    activateElements: () => {
      window.map.activate();
      window.form.activate();
    }};
  mainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && map.classList.contains(`map--faded`)) {
      window.main.activateElements();
    }
  });
  mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0 && map.classList.contains(`map--faded`)) {
      window.main.activateElements();
    }
    window.pin.dragNDropMainPin(`mousedown`);
    evt.preventDefault();
  });
  window.main.deactivateElements();
})();

