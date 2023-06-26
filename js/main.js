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

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdGenerator = (minId, maxId) => {
  const getRandomId = [];

  return function () {
    let currentIdValue = getRandomNumber(minId, maxId);

    if (getRandomId.length >= (maxId - minId + 1)) {
      return null;
    }

    while (getRandomId.includes(currentIdValue)) {
      currentIdValue = getRandomNumber(minId, maxId);
    }

    getRandomId.push(currentIdValue);

    return currentIdValue;
  };
};


const generatePhotoId = createRandomIdGenerator(1, 25);

const generateCommentId = createRandomIdGenerator(1, 1000);


const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];


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

generatePhotos();
