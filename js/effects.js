const preview = document.querySelector('.img-upload__preview').querySelector('img');
const EffectSlider = document.querySelector('.effect-level__slider');
const EffectSliderValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectItems = document.querySelectorAll('.effects__radio');

// const UploadEffects = document.querySelector('.img-upload__effects');
// const EffectNone = document.querySelector('.effect-none');
// const EffectChrome = document.querySelector('.effect-chrome');
// const EffectSepia = document.querySelector('.effect-sepia');
// const EffectMarvin = document.querySelector('.effect-marvin');
// const EffectPhobos = document.querySelector('.effect-phobos');
// const EffectHeat = document.querySelector('.effect-heat');

let currentEffect = 'none';
imgUploadEffectLevel.classList.add('hidden');

const resetEffects = () => {
  changeEffect(0);
  EffectSlider.noUiSlider.reset();
};

noUiSlider.create(EffectSlider, {
  start: [0],
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
  step: 1
});

const switchSliderMax = (max) => {
  EffectSlider.noUiSlider.updateOptions({
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
      imgUploadEffectLevel.classList.remove('hidden');
    } else {
      imgUploadEffectLevel.classList.add('hidden');
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

EffectSlider.noUiSlider.on('update', () => {
  const effectLevel = EffectSlider.noUiSlider.get();
  EffectSliderValue.value = effectLevel;
  changeEffect(effectLevel);
});

export { resetEffects, changeEffect};

// UploadEffects.addEventListener('change', (evt) => {
//   if (EffectNone) {
//     EffectSlider.classList.add(CLASS_HIDDEN);
//   }
//   else if (EffectChrome) {
//     EffectSlider.noUiSlider.updateOptions({
//       range: {
//         min: 0,
//         max: 1,
//       },
//       step: 0.1,
//       start: 100,
//     })
//     EffectChrome.style.filter()
//   }
// })
