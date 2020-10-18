'use strict';
(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const houseTypeFilter = mapFilters.querySelector(`#housing-type`);

  const updatePins = (pinsData) => {
    if (houseTypeFilter.selectedIndex > 0) {
      window.filteredPins = pinsData.filter((pin) => pin.offer.type === houseTypeFilter.value);
    } else {
      window.filteredPins = pinsData;
    }
    window.pin.renderPins(window.filteredPins);
  };

  houseTypeFilter.addEventListener(`change`, () => {
    window.pin.removePins();
    window.map.closePopupCard();
    updatePins(window.data);
  });
  window.filter = {
    updatePins,
    mapFilters
  };
})();
