'use strict';
(() => {
  const TIMEOUT_IN_MS = 10000;
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const statusCode = {
    OK: 200
  };
  window.upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
