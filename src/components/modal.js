import {nameInput, userName, jobInput, userProffesion, profilePopup} from './utils.js';
export {closePopup, formSubmitHandler, openPopup};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};


function closePopup(popup) {
  popup.classList.remove('popup_opened');
};


function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userProffesion.textContent = jobInput.value;
  closePopup(profilePopup);
};

