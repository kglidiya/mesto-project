import './styles/index.css';
import {enableValidation} from './components/validate.js';
import {creatCard, cardToDelete, containerToDelete} from './components/card.js';
import {formSelectorPlace,  formSelectorProfile, formSelectorAvatar, popups, buttonEdit, buttonAdd,
nameInput, userName, jobInput, userProffesion, profilePopup, cardPopup, avatarPopup, handleProfileFormSubmit, 
handleAvatarFormSubmit, handleCardFormSubmit, buttonEditAvatar, avatarOverlay, avatarImage, cardsContainer, 
buttonDeleteCard} from './components/utils.js';
import {closePopup, openPopup, showAvatarBtn, hideAvatarBtn} from './components/modal.js';
import {api} from './components/api.js';
export let userId;

Promise.all([api.getInitialCards(), api.getUserInfor()])
  .then(([cards, userData]) => {
    userId = userData._id;
    cards.forEach(function (card) {
      let likeOwner;
      card.likes.forEach(function(like){
        likeOwner = like.name;
      })
      cardsContainer.append(creatCard(card.name, card.link, (card.likes).length, card.owner._id, 
      card._id, likeOwner, userData.name, userId));
    })
   avatarImage.style.backgroundImage = `URL(${userData.avatar})`;
   userName.textContent = userData.name;
   userProffesion.textContent = userData.about;
  })
  .catch(err => {
    console.log(err)
  });


enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__savebtn',
  inactiveButtonClass: 'form__savebtn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error'
}); 


formSelectorPlace.addEventListener('submit', handleCardFormSubmit)

formSelectorProfile.addEventListener('submit', handleProfileFormSubmit);

formSelectorAvatar.addEventListener('submit', handleAvatarFormSubmit);


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__closebtn')) {
        closePopup(popup)
      }
  })
})

buttonEdit.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = userProffesion.textContent;
  openPopup(profilePopup)
});

buttonEditAvatar.addEventListener('click', function() {
  openPopup(avatarPopup)
});

avatarOverlay.addEventListener('mouseover', showAvatarBtn);
avatarOverlay.addEventListener('mouseout', hideAvatarBtn);

buttonAdd.addEventListener('click', function() {
  openPopup(cardPopup)
})


buttonDeleteCard.addEventListener('click', function() {

  api.deleteCard(cardToDelete)
    .then(() => {
      containerToDelete.remove();
      closePopup()
    })  
    .catch((err) => {
      console.log(err);
    });
  
})