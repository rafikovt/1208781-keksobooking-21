'use strict';
const successLoad = (data) => {
  window.data = data.slice();
};
window.backend.load(successLoad, window.utils.openErrorOnLoad);


