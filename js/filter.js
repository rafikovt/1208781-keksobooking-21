'use strict';
(() => {
  const PRICE_VALUE = {
    min: 10000,
    max: 50000
  };
  const mapFilters = document.querySelector(`.map__filters`);
  const houseTypeFilter = mapFilters.querySelector(`#housing-type`);
  const housePriceFilter = mapFilters.querySelector(`#housing-price`);
  const houseRoomsfilter = mapFilters.querySelector(`#housing-rooms`);
  const houseGuestsFilter = mapFilters.querySelector(`#housing-guests`);
  const houseFeaturesFilters = mapFilters.querySelectorAll(`.map__checkbox`);

  const getValueOfCheckedFeatures = () => [...mapFilters.querySelectorAll(`.map__checkbox:checked`)].map((cb) => cb.value);
  const pinsFeaturesFilter = (pin) => {
    if (getValueOfCheckedFeatures().length) {
      return getValueOfCheckedFeatures().every((elem) => pin.offer.features.includes(elem));
    } else {
      return pin;
    }
  };

  const pinsTypeFilter = (pin) => {
    switch (houseTypeFilter.selectedIndex) {
      case 0:
        return pin;
      default:
        return pin.offer.type === houseTypeFilter.value;
    }
  };
  const pinsPriceFilter = (pin) => {
    switch (housePriceFilter.selectedIndex) {
      case 1:
        return (pin.offer.price < PRICE_VALUE.max) && (pin.offer.price > PRICE_VALUE.min);
      case 2:
        return pin.offer.price < PRICE_VALUE.min;
      case 3:
        return pin.offer.price > PRICE_VALUE.max;
      default:
        return pin;
    }
  };
  const pinsRoomsFilter = (pin) => {
    switch (houseRoomsfilter.selectedIndex) {
      case 0:
        return pin;
      default:
        return pin.offer.rooms === parseInt(houseRoomsfilter.value, 10);
    }
  };
  const pinsGuestsFilter = (pin) => {
    switch (houseGuestsFilter.selectedIndex) {
      case 0:
        return pin;
      default:
        return pin.offer.guests === parseInt(houseGuestsFilter.value, 10);
    }
  };

  const filterFuntcions = [pinsTypeFilter, pinsPriceFilter, pinsRoomsFilter, pinsGuestsFilter, pinsFeaturesFilter];
  const getFilteredData = () => filterFuntcions.reduce((acc, cur) => acc.filter(cur), window.data);
  // const onFiltersChange = () => {
  //   window.pin.removePins();
  //   window.map.closePopupCard();
  //   window.pin.renderPins(getFilteredData());
  // };
  const onFiltersChange = window.debounce(() => {
    window.pin.removePins();
    window.map.closePopupCard();
    window.pin.renderPins(getFilteredData());
  });
  const activateFilters = () => {
    houseTypeFilter.addEventListener(`change`, onFiltersChange);
    housePriceFilter.addEventListener(`change`, onFiltersChange);
    houseRoomsfilter.addEventListener(`change`, onFiltersChange);
    houseGuestsFilter.addEventListener(`change`, onFiltersChange);
    houseFeaturesFilters.forEach((elem) => elem.addEventListener(`change`, onFiltersChange));
  };
  const deactivateFilters = () => {
    houseTypeFilter.removeEventListener(`change`, onFiltersChange);
    housePriceFilter.removeEventListener(`change`, onFiltersChange);
    houseRoomsfilter.removeEventListener(`change`, onFiltersChange);
    houseGuestsFilter.removeEventListener(`change`, onFiltersChange);
    houseFeaturesFilters.forEach((elem) => elem.removeEventListener(`change`, onFiltersChange));
  };
  window.filter = {
    mapFilters,
    getFilteredData,
    activateFilters,
    deactivateFilters
  };
})();
