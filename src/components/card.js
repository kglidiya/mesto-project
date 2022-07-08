export { creatCard, cardToDelete, containerToDelete };
import { cardsTemplate, popupCaption, popupLink, imagePopup, deletePopup} from './utils.js';
import { openPopup } from './modal.js';
import { api } from './api.js';
let cardToDelete;
let containerToDelete;

//Creat cards

function creatCard(caption, image, likesNumber, usersIdAll, cardId, likeOwner, userName, userId) {
  const placesElement = cardsTemplate.cloneNode(true);
  placesElement.querySelector('.places__title').textContent = caption;
  const cardImage = placesElement.querySelector('.places__image');
  cardImage.src = image;
  cardImage.alt = caption;
  const like = placesElement.querySelector('.places__likes');
  like.textContent = likesNumber;
  const likeButton = placesElement.querySelector('.places__likebtn');
  const deleteBtn = placesElement.querySelector('.places__deletebtn');



  //Show previously liked cards
  if (likeOwner === userName) {
    likeButton.classList.add('places__likebtn_active');
  } else likeButton.classList.remove('places__likebtn_active');
 
  //Delete card

  if (usersIdAll === userId) {
    deleteBtn.classList.add('places__deletebtn_visible');
  }

  deleteBtn.addEventListener('click', function (evt) {
    cardToDelete = cardId;
    containerToDelete = evt.target.closest('article');
    openPopup(deletePopup);
  })


  //Like/dislike function
  likeButton.addEventListener('click', function (btn) {
    if (btn.target.classList.contains('places__likebtn_active')) {
      api.deleteLike(cardId)
        .then((result) => {
          like.textContent = (result.likes).length;
          btn.target.classList.remove('places__likebtn_active');
        })
        .catch((err) => {
          console.log(err);
        });
      btn.target.classList.remove('places__likebtn_active');
    }
    else if (!btn.target.classList.contains('places__likebtn_active')) {
      api.putLike(cardId)
        .then((result) => {
          like.textContent = (result.likes).length;
          btn.target.classList.add('places__likebtn_active');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })

  //Open popup with image

  cardImage.addEventListener('click', function openCard() {
    openPopup(imagePopup);
    popupLink.src = this.src;
    popupLink.alt = caption;
    popupCaption.textContent = caption;
  });

  return placesElement;
};

