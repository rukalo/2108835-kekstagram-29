
// import {shuffleArray} from './utils.js';

// const defaultButton = document.querySelector('.img-filters__button--default');
// const discussedButton = document.querySelector('.img-filters__button--discussed');
// const shuffleButton = document.querySelector('.img-filters__button--shuffle');
// const imageFilters = document.querySelector('.img-filters');

// const showFilters = () => {
//   imageFilters.classList.remove('img-filters--inactive');

//   shuffleButton.addEventListener('click', () => {
//     if (defaultButton.classList.contains('img-filters__button--active')) {
//       defaultButton.classList.remove('img-filters__button--active');
//     }

//     shuffleButton.classList.add('img-filters__button--active');

//     shuffleArray();
//   });

//   discussedButton.addEventListener('click', () => {
//     // Здесь можно добавить код для обрабатывания события на обсужденной кнопке
//   });
// };


// export { showFilters };


const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT : 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imageFilters = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (callback) => {
  imageFilters.addEventListener('click', (evt) =>{
    if (evt.target.classList.containts('.img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }
    imageFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFilteredPictures());
  });
};

const init = (loadedPictures, callback) => {
  imageFilters.classList.remove('img-filters--inactive');
  imageFilters.classList.remove('img-filters__button--active');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};

export { init, getFilteredPictures};
