import { generatePhotosArray } from './data.js';
import { renderPictures } from './pictures.js';
import { loadPicture } from './form.js';

const usersPictures = generatePhotosArray();

renderPictures(usersPictures);
loadPicture();
