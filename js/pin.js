'use strict';
(() => {
  const SHIFT_WIDTH = 25;
  const SHIFT_HEIGHT = 70;
  const COUNT_OF_MOCK = 8;
  const MAX_COORD_X = 1169;
  const MIN_COORD_X = -31;
  const MAX_COORD_Y = 546;
  const MIN_COORD_Y = 46;
  const mainPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const pinsContainer = map.querySelector(`.map__pins`);
  const newPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const createPin = (moks) => {
    const newPin = newPinTemplate.cloneNode(true);
    const newPinImg = newPin.querySelector(`img`);
    newPin.style.cssText = `left: ${moks.location.x - SHIFT_WIDTH}px; top: ${moks.location.y - SHIFT_HEIGHT}px`;
    newPinImg.src = moks.author.avatar;
    newPinImg.alt = moks.offer.title;
    return newPin;
  };
  const renderPins = (moks) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < COUNT_OF_MOCK; i++) {
      fragment.appendChild(createPin(moks[i]));
    }
    pinsContainer.appendChild(fragment);
  };
  window.pin = {
    render: () => {
      renderPins(window.mocks);
    },
    dragNDropMainPin: (evt) => {
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        const setNewCoords = (coord, maxCoord, minCoord) => {
          if (coord > maxCoord) {
            return maxCoord + `px`;
          } if (coord < minCoord) {
            return minCoord + `px`;
          } else {
            return (coord + `px`);
          }
        };
        mainPin.style.top = setNewCoords((mainPin.offsetTop - shift.y), MAX_COORD_Y, MIN_COORD_Y);
        mainPin.style.left = setNewCoords((mainPin.offsetLeft - shift.x), MAX_COORD_X, MIN_COORD_X);
        window.form.setNewAddress();
      };
      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };
      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };
})();
