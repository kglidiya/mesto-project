import './styles/index.css';
import {enableValidation} from './components/validate.js';
import {creatCard, creatMyCard} from './components/card.js';
import {formSelectorPlace,  formSelectorProfile, formSelectorAvatar, popups, buttonsClose, buttonEdit, buttonAdd,
nameInput, userName, jobInput, userProffesion, profilePopup, cardPopup, avatarPopup, handleProfileFormSubmit, 
handleAvatarFormSubmit, handleCardFormSubmit, buttonEditAvatar, avatarOverlay, avatarImage, cardsContainer} from './components/utils.js';
import {closePopup, openPopup, showAvatarBtn, hideAvatarBtn} from './components/modal.js';
import {api} from './components/api.js';


api.getInitialCards()
.then((result) => {
  result.forEach(function (card) {
    if (card.owner._id !== "72af520b988a7099c9eb20ae") {
      cardsContainer.append(creatCard(card.name, card.link, (card.likes).length))
    } 
    else if (card.owner._id === "72af520b988a7099c9eb20ae") {
      cardsContainer.prepend(creatMyCard(card.name, card.link, (card.likes).length))
    }
  })
})
.catch((err) => {
  console.log(err);
});


api.getUserInfor()
.then((result) => {
  userName.textContent = result.name;
  userProffesion.textContent = result.about;
  avatarImage.style.backgroundImage = `URL(${result.avatar})`;
})
.catch((err) => {
  console.log(err);
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


buttonsClose.forEach(function (btn) {
  btn.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'))
  })
});

popups.forEach(function (popup) {
  popup.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup')) {
      closePopup(event.target.closest('.popup'))
    }
  })
});

buttonEdit.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = userProffesion.textContent;
  openPopup(profilePopup)
});

buttonEditAvatar.addEventListener('click', () => openPopup(avatarPopup));
avatarOverlay.addEventListener('mouseover', showAvatarBtn);
avatarOverlay.addEventListener('mouseout', hideAvatarBtn);

buttonAdd.addEventListener('click', () => openPopup(cardPopup));