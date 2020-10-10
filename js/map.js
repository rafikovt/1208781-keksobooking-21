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
  const closePopup = () => {
    const cardPopup = map.querySelector(`.map__card`);
    cardPopup.remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
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
      const cardPopup = map.querySelector(`.map__card`);
      cardPopup.remove();
      document.removeEventListener(`keydown`, onPopupEscPress);
    },
    deactivate: () => {
      mapFilters.classList.add(`map__filters--disabled`);
      [...mapFilters.children].forEach((elem) => elem.setAttribute(`disabled`, `true`));
    },
    activate: () => {
      map.classList.remove(`map--faded`);
      mapFilters.classList.remove(`map__filters--disabled`);
      [...mapFilters.children].forEach((elem) => elem.removeAttribute(`disabled`, `true`));
      window.pin.render();
    }
  };
})();
