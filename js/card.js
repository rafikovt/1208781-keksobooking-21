'use strict';
(() => {
  const TYPES = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Дворец`
  };
  const cardsContainer = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const createCard = (mock) => {
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector(`.popup__avatar`).src = mock.author.avatar;
    newCard.querySelector(`.popup__title`).textContent = mock.offer.title;
    newCard.querySelector(`.popup__text--address`).textContent = mock.offer.address;
    newCard.querySelector(`.popup__text--price`).textContent = `${mock.offer.price}₽/ночь`;
    newCard.querySelector(`.popup__type`).textContent = TYPES[mock.offer.type];
    newCard.querySelector(`.popup__text--capacity`).textContent = `${mock.offer.rooms} комнаты для ${window.mocks[0].offer.guests} гостей`;
    newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${mock.offer.checkin}, выезд до ${window.mocks[0].offer.checkout}`;
    const popupFeatures = Array.from(newCard.querySelectorAll(`.popup__feature`));
    const popupFeaturesContainer = newCard.querySelector(`.popup__features`);
    const notAvailableFeatures = popupFeatures.filter((elem) => !mock.offer.features.some((str) => elem.className.includes(`--${str}`)));
    notAvailableFeatures.forEach((feature) => popupFeaturesContainer.removeChild(feature));
    newCard.querySelector(`.popup__description`).textContent = mock.offer.description;
    const photoContainer = newCard.querySelector(`.popup__photos`);
    const imgPhoto = photoContainer.querySelector(`img`);
    const photos = mock.offer.photos;
    photoContainer.innerHTML = ``;
    for (let i = 0; i < photos.length; i++) {
      const newImg = imgPhoto.cloneNode(true);
      newImg.src = photos[i];
      photoContainer.appendChild(newImg);
    }
    return newCard;
  };
  window.renderCard = (indexOfMock) => {
    const card = createCard(window.mocks[indexOfMock]);
    cardsContainer.insertBefore(card, cardsContainer.lastElementChild);
  };
})();
