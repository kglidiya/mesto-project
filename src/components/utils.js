import {editUserInfo, editAvatar, uploadCards} from './api.js';
import {closePopup} from './modal.js';

export const popups = document.querySelectorAll('.popup');
export const imagePopup = document.querySelector('.image-popup');
export const profilePopup = document.querySelector('.profile-popup');
export const cardPopup = document.querySelector('.card-popup');
export const avatarPopup = document.querySelector('.avatar-popup');
export const buttonEdit = document.querySelector('.profile__editbtn');
export const buttonsSave = document.querySelectorAll('.form__savebtn');
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
export const userName = document.querySelector('.profile__title');
export const userProffesion = document.querySelector('.profile__subtitle');
export const cardsContainer = document.querySelector('.places');
export const cardsTemplate = document.querySelector('.places-new').content;
export const popupLink = document.querySelector('.image-popup__photolink');
export const popupCaption = document.querySelector('.image-popup__caption');
export const likesBtn = document.querySelector('.places__likebtn');

export function renderLoading(isLoading) {
    if(isLoading) {
      buttonsSave[0].textContent = 'Сохранение...'
    }
    else if (!isLoading) {
      buttonsSave[0].textContent = 'Сохранить'
    }
  };


export function formCardHandler() {
    uploadCards();
    closePopup(cardPopup);
    placeInput.value = '';
    linkInput.value = '';
};

export function formProfileHandler() {
    renderLoading(true);
    editUserInfo();
    userName.textContent = nameInput.value;
    userProffesion.textContent = jobInput.value;
    closePopup(profilePopup);
};

export function formAvatarHandler() {
  editAvatar();
  avatarImage.style.backgroundImage = `URL(${avatarInput.value})`;
  closePopup(avatarPopup);
  avatarInput.value = ''
}