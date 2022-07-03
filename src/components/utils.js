import {closePopup} from './modal.js';
import {editUserInfo, editAvatar, uploadNewCard} from './api.js';

export const popups = document.querySelectorAll('.popup');
export const imagePopup = document.querySelector('.image-popup');
export const profilePopup = document.querySelector('.profile-popup');
export const cardPopup = document.querySelector('.card-popup');
export const avatarPopup = document.querySelector('.avatar-popup');
export const deletePopup = document.querySelector('.delete-popup');
export const buttonEdit = document.querySelector('.profile__editbtn');
export const buttonsSave = document.querySelectorAll('.form__savebtn');
export const buttonDeleteCard = document.querySelector('.button__delete');
export const buttonsClose = document.querySelectorAll('.popup__closebtn');
export const buttonAdd = document.querySelector('.profile__addbtn');
export const buttonEditAvatar = document.querySelector('.profile__avatar-editbtn');
export const buttonsDelete = document.querySelectorAll('.places__deletebtn')
export const formSelectorProfile = document.querySelector('.edit-profile');
export const formSelectorPlace = document.querySelector('.edit-place');
export const formSelectorAvatar = document.querySelector('.edit-avatar');
export const linkInput = document.querySelector('.form__input_link');
export const nameInput = document.querySelector('.form__input_name');
export const jobInput = document.querySelector('.form__input_job');
export const placeInput = document.querySelector('.form__input_place');
export const avatarInput = document.querySelector('.form__input_avatar');
export const avatarImage = document.querySelector('.profile__avatar');
export const avatarOverlay = document.querySelector('.profile__avatar-overlay');
export const avatarContainer = document.querySelector('.popup__container_avatar');
export const deleteContainer = document.querySelector('.popup__container_delete');
export const userName = document.querySelector('.profile__title');
export const userProffesion = document.querySelector('.profile__subtitle');
export const cardsContainer = document.querySelector('.places');
export const cardsTemplate = document.querySelector('.places-new').content;
export const popupLink = document.querySelector('.image-popup__photolink');
export const popupCaption = document.querySelector('.image-popup__caption');
export const likesBtn = document.querySelector('.places__likebtn');
export const like = document.querySelector('.places__likes');


export function renderLoading(isLoading) {
    if(isLoading) {
      buttonsSave[0].textContent = 'Сохранение...'
    }
    else if (!isLoading) {
      buttonsSave[0].textContent = 'Сохранить'
    }
  };


export function handleCardFormSubmit(evt) {
  disableButtonSubmit(buttonsSave);
  uploadNewCard();
  closePopup(cardPopup);
  evt.target.reset();
};

export function handleProfileFormSubmit() {
    renderLoading(true);
    editUserInfo();
    userName.textContent = nameInput.value;
    userProffesion.textContent = jobInput.value;
    closePopup(profilePopup);
};

export function handleAvatarFormSubmit(evt) {
  disableButtonSubmit(buttonsSave)
  editAvatar();
  avatarImage.style.backgroundImage = `URL(${avatarInput.value})`;
  closePopup(avatarPopup);
  evt.target.reset()
};


avatarContainer.style.minHeight = '272px';
deleteContainer.style.minHeight = '181px';


export function disableButtonSubmit(buttons) {
    buttons.forEach(function(btn) {
      if(btn.classList.contains('button__delete')) {
        return false;
        } else 
        btn.disabled = true;
        btn.classList.add('form__savebtn_inactive');
    })
}