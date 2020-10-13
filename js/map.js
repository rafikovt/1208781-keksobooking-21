'use strict';
(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const map = document.querySelector(`.map`);
  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.map.closePopup();
    }
  };
  window.map = {
    openPopup: (indexOfMock) => {
      const cardPopup = document.querySelector(`.popup`);
      if (cardPopup) {
        cardPopup.remove();
      }
      window.renderCard(indexOfMock);
      document.addEventListener(`keydown`, onPopupEscPress);
    },
    closePopup: () => {
      const cardPopup = map.querySelector(`.popup`);
      cardPopup.remove();
      document.removeEventListener(`keydown`, onPopupEscPress);
    },
    deactivate: () => {
      map.classList.add(`map--faded`);
      mapFilters.classList.add(`map__filters--disabled`);
      [...mapFilters.children].forEach((elem) => elem.setAttribute(`disabled`, `true`));
      window.pin.remove();
      window.pin.setMainPinStartCoords();
      const cardPopup = document.querySelector(`.popup`);
      if (cardPopup) {
        cardPopup.remove();
      }
    },
    activate: () => {
      map.classList.remove(`map--faded`);
      mapFilters.classList.remove(`map__filters--disabled`);
      [...mapFilters.children].forEach((elem) => elem.removeAttribute(`disabled`, `true`));
      window.pin.render();
    }
  };
})();
