'use strict';
const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const deactivatePage = () => {
  window.map.deactivate();
  window.form.deactivate();
};
deactivatePage();
const activatePage = () => {
  window.map.activate();
  window.form.activate();
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
  activatePage,
};


