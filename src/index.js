import './styles/index.css';
import {enableValidation} from './components/validate.js';
import {initialCards, renderCard, creatCard} from './components/card.js';
import {formSelectorPlace, cardsContainer, formSelectorProfile, popups, buttonsClose, buttonEdit, buttonAdd,
nameInput, userName, jobInput, userProffesion, profilePopup, cardPopup} from './components/utils.js';
import {handleProfileFormSubmit, closePopup, openPopup} from './components/modal.js';

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__savebtn',
  inactiveButtonClass: 'form__savebtn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error'
}); 

initialCards.forEach(function (item) {
  const card = creatCard(item.name, item.link);
  cardsContainer.append(card);
});

formSelectorPlace.addEventListener('submit', renderCard);

formSelectorProfile.addEventListener('submit', handleProfileFormSubmit);


buttonsClose.forEach(function (btn) {
  btn.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'))
  })
})

popups.forEach(function (popup) {
  popup.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup')) {
      closePopup(event.target.closest('.popup'))
    }
  })
})

buttonEdit.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = userProffesion.textContent;
  openPopup(profilePopup)
});

buttonAdd.addEventListener('click', () => openPopup(cardPopup));