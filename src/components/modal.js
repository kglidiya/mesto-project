import { popups, buttonEditAvatar } from './utils.js';
export { closePopup, closePopupEsc, openPopup, showAvatarBtn, hideAvatarBtn };


function openPopup(popup) {
  popup.classList.add('popup_opened');
};


function closePopup(popup) {
  popup.classList.remove('popup_opened');
};


function closePopupEsc(event) {

  if (event.key === 'Escape') {
    popups.forEach(function (popup) {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);

      }
      else if (!popup.classList.contains('popup_opened')) {
        document.removeEventListener('keydown', closePopup(popup));
      }
    })
  }
}

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




