'use strict';
const TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const cardsContainer = document.querySelector(`.map`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const createCardTemplate = (mock) => {
  const newCard = cardTemplate.cloneNode(true);
  const avatar = newCard.querySelector(`.popup__avatar`);
  const title = newCard.querySelector(`.popup__title`);
  const address = newCard.querySelector(`.popup__text--address`);
  const price = newCard.querySelector(`.popup__text--price`);
  const type = newCard.querySelector(`.popup__type`);
  const capacity = newCard.querySelector(`.popup__text--capacity`);
  const time = newCard.querySelector(`.popup__text--time`);
  const popupFeatures = newCard.querySelectorAll(`.popup__feature`);
  const popupFeaturesContainer = newCard.querySelector(`.popup__features`);
  const description = newCard.querySelector(`.popup__description`);
  avatar.src = mock.author.avatar ? mock.author.avatar : avatar.remove();
  title.textContent = mock.offer.title ? mock.offer.title : title.remove();
  address.textContent = mock.offer.address ? mock.offer.address : address.remove();
  price.textContent = mock.offer.price ? `${mock.offer.price}₽/ночь` : price.remove();
  type.textContent = mock.offer.type ? TYPES[mock.offer.type] : type.remove();
  capacity.textContent = (mock.offer.rooms && mock.offer.guests) !== undefined ? `${mock.offer.rooms} комнаты для ${mock.offer.guests} гостей` : capacity.remove();
  time.textContent = (mock.offer.checkin && mock.offer.checkout) ? `Заезд после ${mock.offer.checkin}, выезд до ${mock.offer.checkout}` : time.remove();
  if (mock.offer.features.length) {
    const notAvailableFeatures = [...popupFeatures].filter((elem) => !mock.offer.features.some((str) => elem.className.includes(`--${str}`)));
    notAvailableFeatures.forEach((feature) => popupFeaturesContainer.removeChild(feature));
  } else {
    popupFeaturesContainer.remove();
  }
  description.textContent = mock.offer.description ? mock.offer.description : description.remove();
  const photoContainer = newCard.querySelector(`.popup__photos`);
  const imgPhoto = photoContainer.querySelector(`img`);
  const photos = mock.offer.photos;
  photoContainer.innerHTML = ``;
  if (photos.length) {
    for (let i = 0; i < photos.length; i++) {
      const newImg = imgPhoto.cloneNode(true);
      newImg.src = photos[i];
      photoContainer.appendChild(newImg);
    }
  } else {
    photoContainer.remove();
  }
  return newCard;
};

const renderCard = (index) => {
  const card = createCardTemplate(window.filter.data()[index]);
  cardsContainer.insertBefore(card, cardsContainer.lastElementChild);
  const closePopupButton = card.querySelector(`.popup__close`);
  closePopupButton.addEventListener(`click`, window.map.closePopupCard);
};

window.card = {
  render: renderCard,
};

