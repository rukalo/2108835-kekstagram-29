// const PicturesContrainer = document.querySelector('.pictures');

// const PictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// const createThumbnail = ({url, description, likes, comments}) => {
// const thumbnail = PictureTemplate.cloneNode(true);
// thumbnail.querySelector('.picture__img').src = url;
// thumbnail.querySelector('.picture__img').alt = description;
// thumbnail.querySelector('.picture__likes').textContent = likes;
// thumbnail.querySelector('.picture__comments').textContent = comments.length;

//   return thumbnail;
// };

// const renderThumbnails = (pictures) => {
//   const fragment = document.createDocumentFragment();
//   pictures.forEach((picture) => {
//     const thumbnail = createThumbnail(picture);
//     fragment.append(thumbnail);
//   });

//   PicturesContrainer.append(fragment);
// };
import { generatePhotos } from './data.js';

const container = document.querySelector('.pictures');
const preparePhotos = () => {
  const picturesFragment = document.createDocumentFragment();
  const photoData = generatePhotos();
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  photoData.forEach(({url,description, likes, comments}) => {
    const thumbnail = photoTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.append(thumbnail);
  });

  return picturesFragment;
};

/**
 * Insert user photos to page
 */
const renderThumbnails = () => {
  const photos = preparePhotos();
  container.append(photos);
};

export {renderThumbnails};
