'use strict';
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

const roomForGuestsMap = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`],
};
const mainPin = window.movepin.mainPin;
const adForm = document.querySelector(`.ad-form`);
const address = adForm.querySelector(`#address`);
const guest = adForm.querySelector(`#capacity`);
const room = adForm.querySelector(`#room_number`);
const resetButton = adForm.querySelector(`.ad-form__reset`);
const titleInput = adForm.querySelector(`#title`);
const type = adForm.querySelector(`#type`);
const price = adForm.querySelector(`#price`);
const timein = adForm.querySelector(`#timein`);
const timeout = adForm.querySelector(`#timeout`);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  window.backend.send(new FormData(adForm), window.utils.openSuccessMessage, window.utils.openErrorOnUpload);
};
const onResetButtonClick = () => window.main.deactivatePage();
const onRoomChange = (evt) => changeRoomNumberValue(evt.target.value);
const getAddresValue = (gapX, gapY) => {
  address.value = (parseInt(mainPin.style.left, 10) + gapX) + `, ` + (parseInt(mainPin.style.top, 10) + gapY);
};
const setActivatedPinAddress = () => {
  getAddresValue(GAP, GAP_WITH_ARROW);
};
address.setAttribute(`readonly`, true);
getAddresValue(GAP, GAP);
const changeRoomNumberValue = (value) => {
  [...guest.options].forEach((option) => {
    option.disabled = !roomForGuestsMap[value].includes(option.value);
  });
  guest.value = value > 3 ? 0 : value;
};
const onTitleInput = () => {
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
const onPriceChange = () => {
  price.placeholder = MIN_PRICE[type.value];
  if (parseInt(price.value, 10) < parseInt(price.placeholder, 10)) {
    price.setCustomValidity(`Минимальная цена для данного типа жилья: ` + price.placeholder);
  } else {
    price.setCustomValidity(``);
  }
  price.reportValidity();
};
const deactivateForm = () => {
  window.preview.avatarPreview.src = `img/muffin-grey.svg`;
  window.preview.adphotoPreview.src = ``;
  adForm.classList.add(`ad-form--disabled`);
  adForm.querySelectorAll(`fieldset`).forEach((elem) => elem.setAttribute(`disabled`, `true`));
  adForm.reset();
  changeRoomNumberValue(room.value);
  getAddresValue(GAP, GAP);
  type.removeEventListener(`change`, onPriceChange);
  price.removeEventListener(`input`, onPriceChange);
  titleInput.removeEventListener(`input`, onTitleInput);
  room.removeEventListener(`change`, onRoomChange);
  adForm.removeEventListener(`submit`, onFormSubmit);
  resetButton.addEventListener(`click`, onResetButtonClick);
};
const activateForm = () => {
  getAddresValue(GAP, GAP_WITH_ARROW);
  adForm.classList.remove(`ad-form--disabled`);
  adForm.querySelectorAll(`fieldset`).forEach((elem) => elem.removeAttribute(`disabled`, `true`));
  changeRoomNumberValue(room.value);
  type.addEventListener(`change`, onPriceChange);
  price.addEventListener(`input`, onPriceChange);
  titleInput.addEventListener(`input`, onTitleInput);
  room.addEventListener(`change`, onRoomChange);
  timein.addEventListener(`change`, () => {
    timeout.value = timein.value;
  });
  timeout.addEventListener(`change`, () => {
    timein.value = timeout.value;
  });
  adForm.addEventListener(`submit`, onFormSubmit);
  resetButton.addEventListener(`click`, onResetButtonClick);
};
window.form = {
  deactivateForm,
  activateForm,
  setActivatedPinAddress
};

