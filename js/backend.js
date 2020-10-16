'use strict';
(() => {
  const TIMEOUT_IN_MS = 10000;
  const POST_URL = `https://21.javascript.pages.academy/keksobooking`;
  const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const RequestMethod = {
    POST: `POST`,
    GET: `GET`
  };
  const statusCode = {
    OK: 200
  };
  const xhrSend = new XMLHttpRequest();
  const xhrLoad = new XMLHttpRequest();
  const xhrOnLoad = (onSuccess, onError, xhr) => {
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
    xhr.timeout = TIMEOUT_IN_MS;
  };
  const send = (data, onSuccess, onError) => {
    xhrSend.open(RequestMethod.POST, POST_URL);
    xhrOnLoad(onSuccess, onError, xhrSend);
    xhrSend.send(data);
  };
  const load = (onSuccess, onError) => {
    xhrLoad.open(RequestMethod.GET, GET_URL);
    xhrOnLoad(onSuccess, onError, xhrLoad);
    xhrLoad.send();
  };
  window.backend = {
    send,
    load
  };
})();
