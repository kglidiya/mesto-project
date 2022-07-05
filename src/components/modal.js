import { buttonEditAvatar, disableButtonSubmit} from './utils.js';

export {closePopup, openPopup, showAvatarBtn, hideAvatarBtn};

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  const buttonSubmit = popup.querySelector('.form__savebtn');
  if(popup.classList.contains('card-popup') || popup.classList.contains('avatar-popup')) {
    disableButtonSubmit(buttonSubmit);
  }
  document.addEventListener('keydown', closeByEscape);
};


function closePopup() {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};


function showAvatarBtn() {
  buttonEditAvatar.style.visibility = 'visible';
  buttonEditAvatar.style.opacity = '1';
  buttonEditAvatar.style.transition = `all 1s ease`;
};

function hideAvatarBtn() {
  buttonEditAvatar.style.visibility = 'hidden';
  buttonEditAvatar.style.opacity = '0';
  buttonEditAvatar.style.transition = `all 1s ease`;
};





 