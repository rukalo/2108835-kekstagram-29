import { showBigPicture } from './big-picture.js';
import {renderThumbnails} from './thumbnail.js';

const container = document.querySelector('.pictures');

const renderGalary = (pictures) => {
  container.addEventListener('click' , (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find((item) => item.id === +thumbnail.dataset.thumbnailId);

    showBigPicture(picture);
  });
  renderThumbnails();
};

export {renderGalary};

