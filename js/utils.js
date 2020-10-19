'use strict';
(() => {
  const main = document.querySelector(`main`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const successPopup = successTemplate.cloneNode(true);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorPopup = errorTemplate.cloneNode(true);
  const errorButton = errorPopup.querySelector(`.error__button`);
  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };
  const closePopup = () => {
    if (main.contains(successPopup)) {
      successPopup.remove();
    } else {
      errorPopup.remove();
    }
    document.removeEventListener(`click`, closePopup);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };
  const openErrorOnLoad = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  const openSuccessMessage = () => {
    window.main.deactivatePage();
    main.appendChild(successPopup);
    document.addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onPopupEscPress);
  };
  const openErrorOnUpload = () => {
    main.appendChild(errorPopup);
    errorButton.addEventListener(`click`, closePopup);
    document.addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onPopupEscPress);
  };
  window.utils = {
    openErrorOnLoad,
    openSuccessMessage,
    openErrorOnUpload,
    onPopupEscPress
  };
})();
