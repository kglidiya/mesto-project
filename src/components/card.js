export { creatCard };
import { cardsTemplate, popupCaption, popupLink, imagePopup, userId} from './utils.js';
import { openPopup } from './modal.js';
import { api } from './api.js';


//Creat cards

function creatCard(caption, image, likesNumber, usersIdAll, cardId, likeOwner, userName) {
  const placesElement = cardsTemplate.cloneNode(true);
  placesElement.querySelector('.places__title').textContent = caption;
  placesElement.querySelector('.places__image').src = image;
  const cardOpen = placesElement.querySelector('.places__image');
  cardOpen.alt = caption;
  const like = placesElement.querySelector('.places__likes');
  like.textContent = likesNumber;
  const likeButton = placesElement.querySelector('.places__likebtn');
  const deleteBtn = placesElement.querySelector('.places__deletebtn');
  const placeContainer = deleteBtn.closest('.places__container');

  //Show previously liked cards
  if (likeOwner === userName) {
    likeButton.classList.add('places__likebtn_active');
  } else likeButton.classList.remove('places__likebtn_active');

  //Delete card
  if (usersIdAll === userId) {
    deleteBtn.classList.add('places__deletebtn_visible');
  }
  deleteBtn.addEventListener('click', function () {
    api.deleteCard(cardId)
      .catch((err) => {
        console.log(err);
      });
    placeContainer.remove();
  })


  //Like/dislike function
  likeButton.addEventListener('click', function (btn) {
    if (btn.target.classList.contains('places__likebtn_active')) {
      api.deleteLike(cardId)
        .then((result) => {
          return like.textContent = (result.likes).length;
        })
        .catch((err) => {
          console.log(err);
        });
      btn.target.classList.remove('places__likebtn_active');
    }
    else if (!btn.target.classList.contains('places__likebtn_active')) {
      api.putLike(cardId)
        .then((result) => {
          return like.textContent = (result.likes).length;
        })
        .catch((err) => {
          console.log(err);
        });
      btn.target.classList.add('places__likebtn_active');
    }
  })

  //Open popup with image

  cardOpen.addEventListener('click', function openCard() {
    openPopup(imagePopup);
    popupLink.src = this.src;
    popupLink.alt = caption;
    popupCaption.textContent = caption;
  });

  return placesElement;
};
