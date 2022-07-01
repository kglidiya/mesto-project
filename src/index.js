import './styles/index.css';
import {enableValidation} from './components/validate.js';
import {formSelectorPlace, formSelectorAvatar, formSelectorProfile, popups, buttonsClose, buttonEdit, buttonAdd,
nameInput, userName, jobInput, userProffesion, profilePopup, cardPopup, avatarPopup, buttonEditAvatar, avatarOverlay,
formCardHandler, formProfileHandler, formAvatarHandler} from './components/utils.js';
import { closePopup, closePopupEsc, openPopup, showAvatarBtn, hideAvatarBtn} from './components/modal.js';
import {getInitialCards, getUserInfor} from './components/api.js'

//Download initial cards

getInitialCards()

//Get user infor

getUserInfor()

//Open popups

buttonAdd.addEventListener('click', () => openPopup(cardPopup));

buttonEditAvatar.addEventListener('click', () => openPopup(avatarPopup));
avatarOverlay.addEventListener('mouseover', showAvatarBtn);
avatarOverlay.addEventListener('mouseout', hideAvatarBtn);

buttonEdit.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = userProffesion.textContent;
  openPopup(profilePopup)
});


//Close popups with escape key

document.addEventListener('keydown', closePopupEsc);

//Close popups with button 

buttonsClose.forEach(function (btn) {
  btn.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'))
  })
});

//Close popups by clicking on overlay

popups.forEach(function (popup) {
  popup.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup')) {
      closePopup(event.target.closest('.popup'))
    }
  })
});

//Add info from forms

formSelectorPlace.addEventListener('submit', formCardHandler);


formSelectorProfile.addEventListener('submit', formProfileHandler);


formSelectorAvatar.addEventListener('submit', formAvatarHandler);



//Forms validation
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__savebtn',
  inactiveButtonClass: 'form__savebtn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error'
}); 

