'use strict';
const TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const cardsContainer = document.querySelector(`.map`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const createCardTemplate = (cardData) => {
  const {author: {avatar}, offer: {title, address, price, type, rooms, guests,
    checkin, checkout, description, features, photos}} = cardData;
  const newCard = cardTemplate.cloneNode(true);
  const avatarElement = newCard.querySelector(`.popup__avatar`);
  const titleElement = newCard.querySelector(`.popup__title`);
  const addressElement = newCard.querySelector(`.popup__text--address`);
  const priceElement = newCard.querySelector(`.popup__text--price`);
  const typeElement = newCard.querySelector(`.popup__type`);
  const capacity = newCard.querySelector(`.popup__text--capacity`);
  const time = newCard.querySelector(`.popup__text--time`);
  const popupFeatures = newCard.querySelectorAll(`.popup__feature`);
  const popupFeaturesContainer = newCard.querySelector(`.popup__features`);
  const descriptionElement = newCard.querySelector(`.popup__description`);
  avatarElement.src = avatar ? avatar : avatarElement.remove();
  titleElement.textContent = title ? title : titleElement.remove();
  addressElement.textContent = address ? address : addressElement.remove();
  priceElement.textContent = price ? `${price}₽/ночь` : priceElement.remove();
  typeElement.textContent = type ? TYPES[type] : typeElement.remove();
  capacity.textContent = (rooms && guests) ? `${rooms} комнаты для ${guests} гостей` : capacity.remove();
  time.textContent = (checkin && checkout) ? `Заезд после ${checkin}, выезд до ${checkout}` : time.remove();
  if (cardData.offer.features.length) {
    const notAvailableFeatures = [...popupFeatures].filter((elem) => !features.some((str) => elem.className.includes(`--${str}`)));
    notAvailableFeatures.forEach((feature) => popupFeaturesContainer.removeChild(feature));
  } else {
    popupFeaturesContainer.remove();
  }
  descriptionElement.textContent = description ? description : descriptionElement.remove();
  const photoContainer = newCard.querySelector(`.popup__photos`);
  const imgPhoto = photoContainer.querySelector(`img`);
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

