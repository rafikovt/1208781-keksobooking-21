'use strict';
(() => {
  const MIN_PRICE = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0
  };
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const GAP = 31;
  const GAP_WITH_ARROW = 84;
  const room = document.querySelector(`#room_number`);
  const guest = document.querySelector(`#capacity`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const address = adForm.querySelector(`#address`);
  const resetButton = adForm.querySelector(`.ad-form__reset`);
  const filter = document.querySelector(`.map__filters`);
  address.setAttribute(`readonly`, true);
  const getAddresValue = (gapX, gapY) => {
    address.value = (parseInt(mainPin.style.left, 10) + gapX) + `, ` + (parseInt(mainPin.style.top, 10) + gapY);
  };
  getAddresValue(GAP, GAP);
  const roomForGuestsMap = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`],
  };
  const changeRoomNumberValue = (value) => {
    [...guest.options].forEach((option) => {
      option.disabled = !roomForGuestsMap[value].includes(option.value);
    });
    guest.value = value > 3 ? 0 : value;
  };
  const titleInput = adForm.querySelector(`#title`);
  const checkTitleLength = () => {
    const valueLength = titleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Еще ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  };
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const checkPrice = () => {
    price.placeholder = MIN_PRICE[type.value];
    if (price.value < price.placeholder) {
      price.setCustomValidity(`Минимальная цена для данного типа жилья: ` + price.placeholder);
    } else {
      price.setCustomValidity(``);
    }
    price.reportValidity();
  };
  const timein = adForm.querySelector(`#timein`);
  const timeout = adForm.querySelector(`#timeout`);
  const deactivateForm = () => {
    adForm.classList.add(`ad-form--disabled`);
    adForm.querySelectorAll(`fieldset`).forEach((elem) => elem.setAttribute(`disabled`, `true`));
    adForm.reset();
    changeRoomNumberValue(room.value);
    getAddresValue(GAP, GAP);
  };
  const activateForm = () => {
    getAddresValue(GAP, GAP_WITH_ARROW);
    adForm.classList.remove(`ad-form--disabled`);
    adForm.querySelectorAll(`fieldset`).forEach((elem) => elem.removeAttribute(`disabled`, `true`));
    changeRoomNumberValue(room.value);
    // удалять или нет обработчики при деактивации страницы
    type.addEventListener(`change`, () => {
      checkPrice();
    });
    price.addEventListener(`input`, () => {
      checkPrice();
    });
    titleInput.addEventListener(`input`, () => {
      checkTitleLength();
    });
    room.addEventListener(`change`, (evt) => {
      changeRoomNumberValue(evt.target.value);
    });
    timein.addEventListener(`change`, () => {
      timeout.value = timein.value;
    });
    timeout.addEventListener(`change`, () => {
      timein.value = timeout.value;
    });
    adForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      window.upload(new FormData(adForm), window.utils.openSuccessMessage, window.utils.openErrorOnUpload);
    });
    resetButton.addEventListener(`click`, () => {
      window.main.deactivatePage();
      filter.reset();
    });
  };
  const setActivatedPinAddress = () => {
    getAddresValue(GAP, GAP_WITH_ARROW);
  };
  window.form = {
    deactivateForm,
    activateForm,
    setActivatedPinAddress
  };
})();
