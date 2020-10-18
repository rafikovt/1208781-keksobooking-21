'use strict';
(() => {
  const mainPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const deactivatePage = () => {
    window.map.deactivateMap();
    window.form.deactivateForm();
  };
  deactivatePage();
  const activatePage = () => {
    window.map.activateMap();
    window.form.activateForm();
  };
  mainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && map.classList.contains(`map--faded`)) {
      activatePage();
    }
  });
  mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0 && map.classList.contains(`map--faded`)) {
      activatePage();
    }
    window.movepin.dragNDropMainPin(`mousedown`);
    evt.preventDefault();
  });
  window.main = {
    deactivatePage,
    activatePage
  };
})();

