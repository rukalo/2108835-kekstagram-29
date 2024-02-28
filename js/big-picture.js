const bigPictureElement = document.querySelector('.big-picture');
const commentCounterElement = bigPictureElement.querySelector('.social-comment-count');
// const commentListElement = bigPictureElement.querySelector('.social-comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('.body');
// const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
// const commentElement = document.querySelector('.social__comment');
// const commentField = bigPictureElement.querySelector('.social__footer');

const renderPictureDetails = ({url, likes, description, comments}) => {
  bigPictureElement.querySelector('.big-picture__img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.lenght;
  bigPictureElement.querySelector('.social__caption').alt = description;
};

const showBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  commentCounterElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  bodyElement.classList.add('modal-open');

  renderPictureDetails(picture);
};

export {showBigPicture};


// classOpen.addEventListener('click', () => {
//   classOpen.classList.remove('hidden');
// });

// classClose.addEventListener('click' , () => {
//   classClose.classList.add('hidden');
// });

// document.addEventListener('keydown' , (evt) =>{
//   if(evt.key === 'Escape') {
//     evt.preventDefault();
//     classClose.classList.add('hidden');
//   }

// });
