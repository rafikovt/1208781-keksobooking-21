'use strict';
const successLoad = (data) => {
  window.data = data.filter((elem) => elem.offer);
};
window.backend.load(successLoad, window.utils.openErrorOnLoad);


