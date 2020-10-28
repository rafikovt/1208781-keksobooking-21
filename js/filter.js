'use strict';
const PRICE_VALUE = {
  min: 10000,
  max: 50000,
};
const mapFilter = document.querySelector(`.map__filters`);
const houseTypeFilter = mapFilter.querySelector(`#housing-type`);
const housePriceFilter = mapFilter.querySelector(`#housing-price`);
const houseRoomsfilter = mapFilter.querySelector(`#housing-rooms`);
const houseGuestsFilter = mapFilter.querySelector(`#housing-guests`);
const houseFeaturesFilters = mapFilter.querySelectorAll(`.map__checkbox`);

const getValueOfCheckedFeatures = () => {
  return [...mapFilter.querySelectorAll(`.map__checkbox:checked`)].map((elem) => elem.value);
};
const getFilteredFeatures = (pin) => {
  if (getValueOfCheckedFeatures().length) {
    return getValueOfCheckedFeatures().every((elem) => pin.offer.features.includes(elem));
  } else {
    return pin;
  }
};

const getFilteredType = (pin) => {
  return !houseTypeFilter.selectedIndex ? pin : pin.offer.type === houseTypeFilter.value;
};
const getFilteredPrice = (pin) => {
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
const getFilteredRooms = (pin) => {
  return !houseRoomsfilter.selectedIndex ? pin : pin.offer.rooms === Number(houseRoomsfilter.value);
};

const getFilteredGuests = (pin) => {
  return !houseGuestsFilter.selectedIndex ? pin : pin.offer.guests === Number(houseGuestsFilter.value);
};

const filterFuntcions = [getFilteredType, getFilteredPrice, getFilteredRooms, getFilteredGuests, getFilteredFeatures];
const getFilteredData = () => {
  return filterFuntcions.reduce((acc, cur) => acc.filter(cur), window.data);
};
const onFiltersChange = window.debounce(() => {
  window.pin.remove();
  window.map.closePopupCard();
  window.pin.render(getFilteredData());
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
  data: getFilteredData,
  activate: activateFilters,
  deactivate: deactivateFilters,
};

