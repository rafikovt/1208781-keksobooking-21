'use strict';
(() => {
  const MAX_COORD_X = 1169;
  const MIN_COORD_X = -31;
  const MAX_COORD_Y = 546;
  const MIN_COORD_Y = 46;
  const mainPin = document.querySelector(`.map__pin--main`);
  const START_COORD_MAIN_PIN = {
    x: mainPin.style.top,
    y: mainPin.style.left
  };
  const setMainPinStartCoords = () => {
    mainPin.style.top = START_COORD_MAIN_PIN.x;
    mainPin.style.left = START_COORD_MAIN_PIN.y;
  };
  const dragNDropMainPin = (evt) => {
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
      window.form.setActivatedPinAddress();
    };
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };
  window.movepin = {
    dragNDropMainPin,
    setMainPinStartCoords,
    mainPin
  };
})();
