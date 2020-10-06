'use strict';
(() => {
  const COUNT_OF_MOCK = 8;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const map = document.querySelector(`.map`);
  const pinsContainer = map.querySelector(`.map__pins`);
  const newPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const createPin = (moks) => {
    const newPin = newPinTemplate.cloneNode(true);
    const newPinImg = newPin.querySelector(`img`);
    newPin.style.cssText = `left: ${moks.location.x + PIN_WIDTH / 2}px; top: ${moks.location.y + PIN_HEIGHT}px`;
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
  };
})();
