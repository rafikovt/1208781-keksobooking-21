'use strict';
(() => {
  const successLoad = (data) => {
    window.data = data;
  };
  window.backend.load(successLoad, window.utils.openErrorOnLoad);
}
)();
