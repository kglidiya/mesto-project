export {renderCard, creatCard};
import {cardsTemplate, cardsContainer, popupCaption, popupLink, placeInput, linkInput, cardPopup, imagePopup} from './utils.js';
import {closePopup, openPopup} from './modal.js';


export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
  
  function creatCard(caption, image) {
    const placesElement = cardsTemplate.cloneNode(true);
    placesElement.querySelector('.places__title').textContent = caption;
    placesElement.querySelector('.places__image').src = image;
    const cardOpen = placesElement.querySelector('.places__image');
    cardOpen.alt = caption;
  
    placesElement.querySelector('.places__likebtn').addEventListener('click', function (btn) {
      btn.target.classList.toggle('places__likebtn_active');
    });
  
    placesElement.querySelector('.places__deletebtn').addEventListener('click', function (btn) {
      const placeContainer = btn.target.closest('.places__container');
      placeContainer.remove();
    });
  
    const deleteBtn = placesElement.querySelector('.places__deletebtn');
  deleteBtn.classList.add('places__deletebtn_visible');

  deleteBtn.addEventListener('click', function (btn) {
    const placeContainer = btn.target.closest('.places__container');
    placeContainer.remove();
    return getRequest
      .then((result) => {
        result.forEach(function (card) {
          if (caption === card.name) {
            deleteCard(card._id);
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  })
  
    cardOpen.addEventListener('click', function openCard() {
      openPopup(imagePopup);
      popupLink.src = this.src;
      popupLink.alt = caption;
      popupCaption.textContent = caption;
  
    });
  
    return placesElement;
  };
  

  function renderCard(evt) {
 
    evt.preventDefault();
    cardsContainer.prepend(creatCard(placeInput.value, linkInput.value));
    closePopup(cardPopup);
    placeInput.value = '';
    linkInput.value = '';
  };
  
  