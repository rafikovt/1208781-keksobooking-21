'use strict';
(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const map = document.querySelector(`.map`);
  const pinsContainer = map.querySelector(`.map__pins`);
  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };
  const openPopup = (indexOfMock) => {
    const cardPopup = document.querySelector(`.popup`);
    if (cardPopup) {
      cardPopup.remove();
    }
    window.renderCard(indexOfMock);
    const closePopupButton = map.querySelector(`.popup__close`);
    document.addEventListener(`keydown`, onPopupEscPress);
    closePopupButton.addEventListener(`click`, () => {
      closePopup();
    });
  };
  const closePopup = () => {
    const cardPopup = map.querySelector(`.map__card`);
    cardPopup.remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };
  window.map = {
    deactivate: () => {
      mapFilters.classList.add(`map__filters--disabled`);
      [...mapFilters.children].forEach((elem) => elem.setAttribute(`disabled`, `true`));
    },
    activate: () => {
      map.classList.remove(`map--faded`);
      mapFilters.classList.remove(`map__filters--disabled`);
      [...mapFilters.children].forEach((elem) => elem.removeAttribute(`disabled`, `true`));
      window.pin.render();
      const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      pins.forEach((elem, index) => {
        elem.addEventListener(`click`, () => {
          openPopup(index);
        });
      });
    }
  };
})();
