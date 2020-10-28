'use strict';
const map = document.querySelector(`.map`);
const mapFilter = map.querySelector(`.map__filters`);
const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopupCard();
  }
};
const removePopupCard = () => {
  const cardPopup = map.querySelector(`.popup`);
  if (cardPopup) {
    cardPopup.remove();
  }
};
const openPopupCard = (index) => {
  removePopupCard();
  window.card.render(index);
  document.addEventListener(`keydown`, onPopupEscPress);
};
const closePopupCard = () => {
  removePopupCard();
  window.pin.deactive();
  document.removeEventListener(`keydown`, onPopupEscPress);
};
const deactivateMap = () => {
  map.classList.add(`map--faded`);
  window.filter.deactivate();
  mapFilter.reset();
  mapFilter.classList.add(`map__filters--disabled`);
  [...mapFilter.children].forEach((elem) => elem.setAttribute(`disabled`, `true`));
  window.pin.remove();
  window.movepin.setMainPinStartCoords();
  const cardPopup = document.querySelector(`.popup`);
  if (cardPopup) {
    closePopupCard();
  }
};
const activateMap = () => {
  map.classList.remove(`map--faded`);
  window.pin.render(window.data);
  window.filter.activate();
};
window.map = {
  openPopupCard,
  closePopupCard,
  deactivate: deactivateMap,
  activate: activateMap,
};

