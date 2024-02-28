// const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
// const container = document.querySelector('.pictures');

// const createThumbnails = ({url, description, likes, comments, id }) => {
//   const thumbnail = photoTemplate.cloneNode(true);
//   thumbnail.querySelector('.picture__img').src = url;
//   thumbnail.querySelector('.picture__img').alt = description;
//   thumbnail.querySelector('.picture__likes').textContent = likes;
//   thumbnail.querySelector('.picture__comments').textContent = comments.length;
//   thumbnail.dataset.thumbnailId = id;

//   return thumbnail;
// };

// const renderThumbnails = (pictures) => {
//   const picturesFragment = document.createDocumentFragment();
//   pictures.forEach((picture) => {
//     const thumbnail = createThumbnails(picture);
//     picturesFragment.append(thumbnail);
//   });

//   container.append(picturesFragment);
// };

// export { renderThumbnails };

import { generatePhotos } from './data.js';

const container = document.querySelector('.pictures');
const createThumbnails = () => {
  const picturesFragment = document.createDocumentFragment();
  const photoData = generatePhotos();
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  photoData.forEach(({url,description, likes, comments, id}) => {
    const thumbnail = photoTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.dataset.thumbnailId = id;
    picturesFragment.append(thumbnail);
  });
  return picturesFragment;
};
const renderThumbnails = () => {
  const photos = createThumbnails();
  container.append(photos);
};
export {renderThumbnails};


// const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
// const renderThumbnails = (pictures, container) => {
//   const fragment = document.createDocumentFragment();
//   pictures.forEach((picture) =>{
//     const thumbnail = createThumbnails(picture);
//     fragment.append(thumbnail);
//   });

//   container.append(fragment);
// };

// export { renderThumbnails };
