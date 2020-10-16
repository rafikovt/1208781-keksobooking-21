'use strict';
(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const map = document.querySelector(`.map`);
  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };
  const openPopup = (indexOfCard) => {
    const cardPopup = document.querySelector(`.popup`);
    if (cardPopup) {
      cardPopup.remove();
    }
    window.card.renderCard(indexOfCard);
    document.addEventListener(`keydown`, onPopupEscPress);
  };
  const closePopup = () => {
    const cardPopup = map.querySelector(`.popup`);
    cardPopup.remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };
  const deactivateMap = () => {
    map.classList.add(`map--faded`);
    mapFilters.classList.add(`map__filters--disabled`);
    [...mapFilters.children].forEach((elem) => elem.setAttribute(`disabled`, `true`));
    window.pin.removePins();
    window.pin.setMainPinStartCoords();
    const cardPopup = document.querySelector(`.popup`);
    if (cardPopup) {
      closePopup();
    }
  };
  const activateMap = () => {
    map.classList.remove(`map--faded`);
    mapFilters.classList.remove(`map__filters--disabled`);
    [...mapFilters.children].forEach((elem) => elem.removeAttribute(`disabled`, `true`));
    window.pin.renderPins(window.data);
  };
  window.map = {
    openPopup,
    closePopup,
    deactivateMap,
    activateMap
  };
})();
