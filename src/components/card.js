export { creatCard, creatMyCard };
import { cardsTemplate, popupCaption, popupLink, imagePopup, userName} from './utils.js';
import { openPopup } from './modal.js';
import {api} from './api.js';


//Creat other users' cards

function creatCard(caption, image, likes) {
  const placesElement = cardsTemplate.cloneNode(true);
  placesElement.querySelector('.places__title').textContent = caption;
  placesElement.querySelector('.places__image').src = image;
  const cardOpen = placesElement.querySelector('.places__image');
  cardOpen.alt = caption;
  const like = placesElement.querySelector('.places__likes');
  like.textContent = likes;
  const likeBtns = document.querySelectorAll('.places__likebtn');

  //Show previously liked cards
  const updateBtns = (buttonElements) => {
    api.getInitialCards()
      .then((result) => {
        return result.filter(function (card) {
          let likes = card.likes
          return likes.filter(function (like) {
            if (userName.textContent == like.name) {
              buttonElements.forEach(function (btn) {
                if (card.name == btn.closest('.places__title-container').firstElementChild.textContent) {
                  btn.classList.add('places__likebtn_active');
                }
              })
            }
          })
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  updateBtns(likeBtns);
 
  //Like/dislike functions
  let count = 0;
  placesElement.querySelector('.places__likebtn').addEventListener('click', function (btn) {
    count++
    if (count % 2 !== 0) {
      api.getInitialCards()
        .then((result) => {
          result.forEach(function (card) {
            if (caption === card.name) {
              api.putLike(card._id)
              .then((result) => {
                return like.textContent = (result.likes).length;
                })
                .catch((err) => {
                  console.log(err);
                });
              btn.target.classList.add('places__likebtn_active');
            }
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }

    else if (count % 2 === 0) {
      api.getInitialCards()
        .then((result) => {
          result.forEach(function (card) {
            if (caption === card.name) {
              api.deleteLike(card._id)
              .then((result) => {
                return like.textContent = (result.likes).length;
             
              })
              .catch((err) => {
                console.log(err);
              });
              btn.target.classList.remove('places__likebtn_active');
            }
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }
  });

  //Open popup with image

  cardOpen.addEventListener('click', function openCard() {
    openPopup(imagePopup);
    popupLink.src = this.src;
    popupLink.alt = caption;
    popupCaption.textContent = caption;
  });

  return placesElement;
};



//Creat my card (with delete button)

function creatMyCard(caption, image, likes) {
  const placesElement = cardsTemplate.cloneNode(true);
  placesElement.querySelector('.places__title').textContent = caption;
  placesElement.querySelector('.places__image').src = image;
  const cardOpen = placesElement.querySelector('.places__image');
  const like = placesElement.querySelector('.places__likes');
  const likeBtns = document.querySelectorAll('.places__likebtn');
  like.textContent = likes;
  cardOpen.alt = caption;


  //Show previously liked cards
  const updateBtns = (buttonElements) => {
    api.getInitialCards()
      .then((result) => {
        return result.filter(function (card) {
          let likes = card.likes
          return likes.filter(function (like) {
            if (userName.textContent == like.name) {

              buttonElements.forEach(function (btn) {
                if (userName.textContent == like.name
                  && card.name == btn.closest('.places__title-container').firstElementChild.textContent) {
                  btn.classList.add('places__likebtn_active');
                }
              })
            }
          })
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  updateBtns(likeBtns)

  //Like/dislike function

  let count = 0;
  placesElement.querySelector('.places__likebtn').addEventListener('click', function (btn) {

    count++
    if (count % 2 !== 0) {
      api.getInitialCards()
        .then((result) => {
          result.forEach(function (card) {
            if (caption === card.name) {
              api.putLike(card._id)
              .then((result) => {
                return like.textContent = (result.likes).length;
                })
                .catch((err) => {
                  console.log(err);
                });
              btn.target.classList.add('places__likebtn_active');
            }
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }

    else if (count % 2 === 0) {
      api.getInitialCards()
        .then((result) => {
          result.forEach(function (card) {
            if (caption === card.name) {
              api.deleteLike(card._id)
              .then((result) => {
                return like.textContent = (result.likes).length;
                })
                .catch((err) => {
                  console.log(err);
                });
              btn.target.classList.remove('places__likebtn_active');
            }
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }
  });

  //Delete card
  const deleteBtn = placesElement.querySelector('.places__deletebtn');
  deleteBtn.classList.add('places__deletebtn_visible');

  deleteBtn.addEventListener('click', function (evt) {
    const placeContainer = evt.target.closest('.places__container');
    placeContainer.remove();
    api.getInitialCards()
      .then((result) => {
        result.forEach(function (card) {
          if (caption === card.name) {
              api.deleteCard(card._id)
              .catch((err) => {
                console.log(err);
              });
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
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


