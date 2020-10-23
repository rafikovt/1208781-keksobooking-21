'use strict';
const map = document.querySelector(`.map`);
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
  window.card.renderCard(index);
  document.addEventListener(`keydown`, onPopupEscPress);
};
const closePopupCard = () => {
  removePopupCard();
  window.pin.setDeactivePins();
  document.removeEventListener(`keydown`, onPopupEscPress);
};
const deactivateMap = () => {
  map.classList.add(`map--faded`);
  window.filter.deactivateFilters();
  window.filter.mapFilters.reset();
  window.filter.mapFilters.classList.add(`map__filters--disabled`);
  [...window.filter.mapFilters.children].forEach((elem) => elem.setAttribute(`disabled`, `true`));
  window.pin.removePins();
  window.movepin.setMainPinStartCoords();
  const cardPopup = document.querySelector(`.popup`);
  if (cardPopup) {
    closePopupCard();
  }
};
const activateMap = () => {
  map.classList.remove(`map--faded`);
  window.pin.renderPins(window.data);
  window.filter.activateFilters();
};
window.map = {
  openPopupCard,
  closePopupCard,
  deactivateMap,
  activateMap,
  map
};

