const ScaleSmaller = document.querySelector('.scale__control--smaller');
const ScaleBigger = document.querySelector('.scale__control--bigger');
const ScaleValue = document.querySelector('.scale__control--value');
const ImagePreview = document.querySelector('.img-upload__preview');

const DEFAULT_SCALE = 100;

const ScaleControl = () => {
  let currentScale = 100;

  ScaleSmaller.addEventListener('click', () => {
    if (currentScale > 25) {
      currentScale -= 25;
      ScaleValue.value = `${currentScale}%`;
      ImagePreview.style.transform = `scale(${currentScale / 100})`;
    }
  });

  ScaleBigger.addEventListener('click', () => {
    if (currentScale < 100) {
      currentScale += 25;
      ScaleValue.value = `${currentScale}%`;
      ImagePreview.style.transform = `scale(${currentScale / 100})`;
    }
  });
};

const resetScale = () => ScaleValue(DEFAULT_SCALE);

export { resetScale , ScaleControl };
