'use strict';
const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const adphotoFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const photoPreviewContainer = document.querySelector(`.ad-form__photo`);
const adphotoPreview = document.createElement(`img`);

avatarFileChooser.addEventListener(`change`, () => {
  const reader = new FileReader();
  const file = avatarFileChooser.files[0];
  reader.addEventListener(`load`, () => {
    avatarPreview.src = reader.result;
  });
  reader.readAsDataURL(file);
});

photoPreviewContainer.appendChild(adphotoPreview);
adphotoFileChooser.addEventListener(`change`, () => {
  const reader = new FileReader();
  const file = adphotoFileChooser.files[0];
  reader.addEventListener(`load`, () => {
    adphotoPreview.src = reader.result;
  });
  reader.readAsDataURL(file);
});
window.preview = {
  avatarPreview,
  adphotoPreview
};

