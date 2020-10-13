'use strict';
(() => {
  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };
  const closePopup = () => {
    const successPopup = document.querySelector(`.success`);
    // successPopup ? successPopup.remove() : document.querySelector(`.error`).remove();
    if (successPopup) {
      successPopup.remove();
    } else {
      document.querySelector(`.error`).remove();
    }
    document.removeEventListener(`click`, closePopup);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };
  window.utils = {
    openErrorOnLoad: (errorMessage) => {
      const node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;
      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    },
    openSuccessMessage: () => {
      window.main.deactivateElements();
      const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
      const successPopup = successTemplate.cloneNode(true);
      document.body.appendChild(successPopup);
      document.addEventListener(`click`, closePopup);
      document.addEventListener(`keydown`, onPopupEscPress);
    },
    openErrorOnUpload: () => {
      const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
      const errorPopup = errorTemplate.cloneNode(true);
      document.body.appendChild(errorPopup);
      const errorButton = document.querySelector(`.error__button`);
      errorButton.addEventListener(`click`, closePopup);
      document.addEventListener(`click`, closePopup);
      document.addEventListener(`keydown`, onPopupEscPress);
    }

  };
})();
