import { buttonEditAvatar, disableButtonSubmit, buttonsSave} from './utils.js';

export {closePopup, openPopup, showAvatarBtn, hideAvatarBtn};

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  disableButtonSubmit(buttonsSave);
  document.addEventListener('keydown', closeByEscape);
};


function closePopup(popup) {
  popup.classList.remove('popup_opened');
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





 