import {getRandomNumber, createRandomIdGenerator, getRandomArrayElement} from './util.js';

const COUNT_PHOTOS = 25;
const USER_NAMES = [
  'Антон',
  'Игорь',
  'Олег',
  'Станислав',
  'Владимир',
  'Александр'
];
const PHOTO_DESCRIPTIONS = [
  'Мы в горах',
  'Отдыхаем на море',
  'В походе',
  'Яркий зимний день'
];
const PHOTO_COMMENTS = [
  'Классная фотка',
  'Ух, сейчас бы на море',
  'Горизонт завален...',
  'Снимок переэкспонирован!'
];
const generatePhotoId = createRandomIdGenerator(1, 25);

const generateCommentId = createRandomIdGenerator(1, 1000);

const generateDescription = () => getRandomArrayElement(PHOTO_DESCRIPTIONS);

const generateUrl = (photoId) => `photos/${photoId}.jpg`;

const generateLikes = () => getRandomNumber(15, 200);

const generateAvatarUrl = () => `img/avatar-${getRandomNumber(1, 200)}.svg`;

const generateComment = () => ({
  id: generateCommentId(),
  avatar: generateAvatarUrl(),
  message: getRandomArrayElement(PHOTO_COMMENTS),
  name: getRandomArrayElement(USER_NAMES)
});

const generateComments = () => Array.from({length: getRandomNumber(0, 30)}, generateComment);

const generatePhoto = () => {
  const id = generatePhotoId();

  return {
    id: id,
    url: generateUrl(id),
    description: generateDescription(),
    likes: generateLikes(),
    comments: generateComments()
  };
};

const generatePhotos = () => Array.from({length: COUNT_PHOTOS}, generatePhoto);

export {generatePhotos};

