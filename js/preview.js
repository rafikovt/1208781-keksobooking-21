'use strict';
const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const adphotoFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const photoPreviewContainer = document.querySelector(`.ad-form__photo`);
const adphotoPreview = document.createElement(`img`);

const createPreview = (fileChooser, preview) => {
  const reader = new FileReader();
  const file = fileChooser.files[0];
  reader.addEventListener(`load`, () => {
    preview.src = reader.result;
  });
  reader.readAsDataURL(file);
};
const onAvatarChange = () => {
  createPreview(avatarFileChooser, avatarPreview);
};
const onadPhotoChange = () => {
  createPreview(adphotoFileChooser, adphotoPreview);
};
avatarFileChooser.addEventListener(`change`, onAvatarChange);
photoPreviewContainer.appendChild(adphotoPreview);
adphotoFileChooser.addEventListener(`change`, onadPhotoChange);

window.preview = {
  avatarPreview,
  adphotoPreview
};

