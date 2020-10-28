'use strict';
const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatar = document.querySelector(`.ad-form-header__preview img`);
const adphotoFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const photoPreviewContainer = document.querySelector(`.ad-form__photo`);
const adphoto = document.createElement(`img`);

const createPreview = (fileChooser, preview) => {
  const reader = new FileReader();
  const file = fileChooser.files[0];
  reader.addEventListener(`load`, () => {
    preview.src = reader.result;
  });
  reader.readAsDataURL(file);
};
const onAvatarChange = () => {
  createPreview(avatarFileChooser, avatar);
};
const onadPhotoChange = () => {
  createPreview(adphotoFileChooser, adphoto);
};
avatarFileChooser.addEventListener(`change`, onAvatarChange);
photoPreviewContainer.appendChild(adphoto);
adphotoFileChooser.addEventListener(`change`, onadPhotoChange);

window.preview = {
  avatar,
  adphoto,
};

