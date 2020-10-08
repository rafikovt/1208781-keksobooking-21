
'use strict';

(() => {
  const TYPES = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Дворец`
  };
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const LOCATION_X_MIN = 0;
  const LOCATION_X_MAX = 1200;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;
  const COUNT_OF_MOCK = 8;
  const getRandomInt = (min, max) => (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min));
  const getRandomElement = (arr) => (arr[getRandomInt(0, arr.length - 1)]);
  const getRandomLengthArr = (arr) => {
    const newArr = [];
    for (let i = 0; i < getRandomInt(1, arr.length); i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  };
  const generateMoks = (countOfMocks) => {
    const moks = [];
    for (let i = 1; i <= countOfMocks; i++) {
      moks.push({
        author: {
          avatar: `img/avatars/user0${i}.png`
        },
        offer: {
          title: `Заголовок объявления`,
          address: `${getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX)}, ${getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)}`,
          price: getRandomInt(100, 5000),
          type: getRandomElement(Object.keys(TYPES)),
          rooms: getRandomInt(1, 5),
          guests: getRandomInt(1, 6),
          checkin: getRandomElement(TIMES),
          checkout: getRandomElement(TIMES),
          features: getRandomLengthArr(FEATURES),
          description: `Великолепная квартира в центре Токио`,
          photos: getRandomLengthArr(PHOTOS)
        },
        location: {
          x: getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX),
          y: getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
        }
      });
    }
    return moks;
  };
  window.mocks = generateMoks(COUNT_OF_MOCK);
})();
