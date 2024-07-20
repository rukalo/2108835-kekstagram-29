import { resetScale, ScaleControl } from './scale.js';

// const form = document.querySelector('.img-upload__form');
// const uploadInput = document.querySelector('.img-upload__input');
// const overlay = document.querySelector('.img-upload__overlay');
// const closeButton = document.querySelector('.img-upload__cancel');
// const hashtagField = document.querySelector('.text__hashtags');
// const commentField = document.querySelector('.text__description');


// const CLASS_HIDDEN = 'hidden';
// const CLASS_MODAL_OPEN = 'modal-open';

// const MAX_HASHTAG_COUNT = 5;
// const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
// const ErrorText = {
//   INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов` ,
//   NOT_UNIQUE: 'Хэштеги должны быть уникальны',
//   INVALID_PATTERN: 'Неправильный хэштег',

// };

// const pristine = new Pristine(form, {
//   classTo: 'img-upload__field-wrapper',
//   errorTextParent: 'img-upload__field-wrapper',
//   errorTextClass: 'img-upload__field-wrapper--error',
// }, false);

// const textFieldFocused = () =>
//   document.activeElement === hashtagField ||
//   document.activeElement === commentField;

// const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.lenght));

// const hasValidCount = (value) => normalizeTags(value).lenght <= MAX_HASHTAG_COUNT;

// const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

// const hasUniqueTags = (value) => {
//   const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
//   return lowerCaseTags.lenght === new Set(lowerCaseTags).size;
// };

// pristine.addValidator(
//   hashtagField,
//   hasValidCount,
//   ErrorText.INVALID_COUNT,
//   1,
//   true
// );

// pristine.addValidator(
//   hashtagField,
//   hasValidTags,
//   ErrorText.INVALID_PATTERN,
//   true
// );

// pristine.addValidator(
//   hashtagField,
//   hasUniqueTags,
//   ErrorText.NOT_UNIQUE,
//   true
// );

// const onDocumentKeydown = (evt) => {
//   if (evt.key === 'Espace' && !textFieldFocused()) {
//     evt.preventDefault();
//     closeModal();
//   }
// };

// const onCloseBtnClick = (evt) => {
//   evt.preventDefault();
//   closeModal();
// };

// const showModal = () => {
//   overlay.classList.remove(CLASS_HIDDEN);
//   document.body.classList.add(CLASS_MODAL_OPEN);
//   document.addEventListener('keydown', onDocumentKeydown);
//   closeButton.addEventListener('click', onCloseBtnClick);
// };

// function closeModal() {
//   form.reset();
//   resetScale();
//   resetEffect();
//   overlay.classList.add(CLASS_HIDDEN);
//   document.body.classList.remove(CLASS_MODAL_OPEN);
//   document.removeEventListener('keydown', onDocumentKeydown);
//   closeButton.removeEventListener('click', onCloseBtnClick);
//   uploadInput.value = '';
// }

// const loadPicture = () => {
//   uploadInput.onchange = () => {
//     showModal();
//     ScaleControl();
//   };
// };

// export { loadPicture };

//// ЗДЕСЬ НАЧИНАЕТСЯ ДРУГОЙ КОД

import { isEscapeKey } from './utils.js';

const imgUploadForm = document.getElementById('upload-select-image');
const uploadInput = imgUploadForm.querySelector('.img-upload__input');
const uploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtag = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');

const preview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');


// const effectsPreviews = imgUploadForm.querySelectorAll('.effects__preview');

const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const imgUploadEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectItems = imgUploadForm.querySelectorAll('.effects__radio');

const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';

const HASHTAGS_AMOUNT = 5;

let currentEffect = 'none';
imgUploadEffectLevel.classList.add(CLASS_HIDDEN);

const resetEffects = () => {
  changeEffect(0);
  effectLevelSlider.noUiSlider.reset();
};

noUiSlider.create(effectLevelSlider, {
  start: [0],
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
  step: 1
});

/**
 * @param {number} max
 */

const switchSliderMax = (max) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      'min': 0,
      'max': max
    }
  });
};

for (const item of effectItems) {
  item.onchange = () => {
    currentEffect = item.value;
    resetEffects();
    if (item.value !== 'none') {
      imgUploadEffectLevel.classList.remove(CLASS_HIDDEN);
    } else {
      imgUploadEffectLevel.classList.add(CLASS_HIDDEN);
    }
    switch (currentEffect) {
      case 'phobos':
        switchSliderMax(300);
        break;
      case 'heat':
        switchSliderMax(200);
        break;
      default:
        switchSliderMax(100);
    }
  };
}

function changeEffect(level) {
  switch (currentEffect) {
    case 'chrome':
      preview.style.filter = `grayscale(${level / 100})`;
      break;
    case 'sepia':
      preview.style.filter = `sepia(${level / 100})`;
      break;
    case 'marvin':
      preview.style.filter = `invert(${level}%)`;
      break;
    case 'phobos':
      preview.style.filter = `blur(${level / 100}px)`;
      break;
    case 'heat':
      preview.style.filter = `brightness(${1 + level / 100})`;
      break;
    case 'none':
      preview.style.filter = '';
      break;
  }
}

effectLevelSlider.noUiSlider.on('update', () => {
  const effectLevel = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = effectLevel;
  changeEffect(effectLevel);
});

// Валидация

const validationErrors = {
  pattern: 'Хэштег не соответствует шаблону',
  amount: 'Максимум 5 хэштегов',
  dublicate: 'Хэштеги не могут повторяться',
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error-text'
});

/**
 * @param {string} hashtag
 */

const checkHashtag = (hashtag) => {
  const lowerCaseHashtag = hashtag.toLowerCase().trim();
  const splitHashtags = lowerCaseHashtag.split(' ');
  const reg = /^#[a-zа-яё0-9]{1,19}$/i;
  const isNormalLength = splitHashtags.length <= HASHTAGS_AMOUNT;
  let noDublicates = true;
  let regTest = true;
  for (const hashtagItem of splitHashtags) {
    if (!reg.test(hashtagItem)) {
      regTest = false;
    }
    const dublicateHashtags = splitHashtags.filter((el) => el === hashtagItem);
    if (dublicateHashtags.length > 1) {
      noDublicates = false;
    }
  }
  return { isNormalLength, noDublicates, regTest };
};

pristine.addValidator(textHashtag, (value) => {
  if (value === '') {
    return true;
  }
  const test = checkHashtag(value);
  return test.regTest;
}, validationErrors.pattern, 1, false);

pristine.addValidator(textHashtag, (value) => {
  const test = checkHashtag(value);
  return test.isNormalLength;
}, validationErrors.amount, 2, true);

pristine.addValidator(textHashtag, (value) => {
  const test = checkHashtag(value);
  return test.noDublicates;
}, validationErrors.dublicate, 3, true);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    imgUploadForm.submit();
  }
});

// Подстановка загружаемого изображения, масштабирование

// const createImageUrl = () => {
//   const file = uploadInput.files[0];
//   if (file) {
//     return URL.createObjectURL(file);
//   }
//   return undefined;
// };

// const fillPreview = () => {
//   const imageUrl = createImageUrl();
//   preview.src = imageUrl;
//   for (const effectsPreviewItem of effectsPreviews) {
//     effectsPreviewItem.style.backgroundImage = `url(${imageUrl})`;
//   }
// };

// Открытие-закрытие модалки

const onDocumentKeydown = (evt) => {
  if (document.activeElement !== textHashtag && document.activeElement !== textDescription) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }
};

const onCloseBtnClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

function closeModal() {
  uploadOverlay.classList.add(CLASS_HIDDEN);
  document.body.classList.remove(CLASS_MODAL_OPEN);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', onCloseBtnClick);
  uploadInput.value = '';
  resetScale();
  resetEffects();
  currentEffect = 'none';
  effectItems[0].checked = true;
  imgUploadEffectLevel.classList.add(CLASS_HIDDEN);
}

const showModal = () => {
  uploadOverlay.classList.remove(CLASS_HIDDEN);
  document.body.classList.add(CLASS_MODAL_OPEN);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancel.addEventListener('click', onCloseBtnClick);
};


const loadPicture = () => {
  uploadInput.addEventListener('change', () => {
    showModal();
    ScaleControl();
  });
};

export { loadPicture };
