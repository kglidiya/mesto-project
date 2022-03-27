const imagePopup = document.querySelector('.image-popup');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const buttonEdit = document.querySelector('.profile__editbtn');
const buttonsSave = document.querySelectorAll('.form__savebtn');
const buttonsClose = document.querySelectorAll('.popup__closebtn');
const buttonAdd = document.querySelector('.profile__addbtn');
const formElementProfile = document.querySelector('.edit-profile');
const formElementPlace = document.querySelector('.edit-place');
const linkInput = document.querySelector('.form__input_link');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');
const placeInput = document.querySelector('.form__input_place');
const userName = document.querySelector('.profile__title');
const userProffesion = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.places');
const cardsTemplate = document.querySelector('.places-new').content;


//Открытие попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

buttonEdit.addEventListener('click', () => openPopup(profilePopup));
buttonAdd.addEventListener('click', () => openPopup(cardPopup));

//Попап с фото открывается отдельно, т.к. там идет привязка к ссылке на фото 


//Закрытие всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

buttonsClose.forEach(function (btn) {
  btn.addEventListener('click', () => closePopup(profilePopup));
  btn.addEventListener('click', () => closePopup(cardPopup));
  btn.addEventListener('click', () => closePopup(imagePopup));
});


//Заполение формы профиля

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userProffesion.textContent = jobInput.value;
  closePopup(profilePopup);
};
formElementProfile.addEventListener('submit', formSubmitHandler);


//Создание  новой карточки из формы клонированием template

function addNewPhoto() {
  const placesElement = cardsTemplate.cloneNode(true);
  placesElement.querySelector('.places__title').textContent = placeInput.value;
  placesElement.querySelector('.places__image').src = linkInput.value;

  //Добавление кнопок лайка и удаления карточки
  placesElement.querySelector('.places__likebtn').addEventListener('click', function (btn) {
    btn.target.classList.toggle('places__likebtn_active');
  });

  placesElement.querySelector('.places__deletebtn').addEventListener('click', function (btn) {
    const placeContainer = btn.target.closest('.places__container');
    placeContainer.remove();
  });

  cardsContainer.prepend(placesElement);

  //Открытие попапа с новой карточкой
  const cardContainer = document.querySelector('.places__container');
  const image = document.querySelector('.places__image');

  image.addEventListener('click', function open() {
    imagePopup.classList.add('popup_opened');
    document.querySelector('.image-popup__photolink').src = this.src;
  });

  cardContainer.addEventListener('click', function showImage() {
    document.querySelector('.image-popup__caption').textContent = this.textContent;
  });

};


//Добавление карточки из формы

function renderCard(evt) {
  evt.preventDefault();
  addNewPhoto();
  closePopup(cardPopup);
  placeInput.value = '';
  linkInput.value = '';
};
formElementPlace.addEventListener('submit', renderCard);



//Клонирование template

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function uploadInitialCards() {

  initialCards.forEach(function (element) {
    const placesElement = cardsTemplate.cloneNode(true);
    placesElement.querySelector('.places__title').textContent = element.name;
    placesElement.querySelector('.places__image').src = element.link;

    //Добавление кнопок лайков и удаления
    placesElement.querySelector('.places__likebtn').addEventListener('click', function (btn) {
      btn.target.classList.toggle('places__likebtn_active');
    });

    placesElement.querySelector('.places__deletebtn').addEventListener('click', function (btn) {
      const placeContainer = btn.target.closest('.places__container');
      placeContainer.remove();
    })

    const initialCardsImage = document.querySelectorAll('.places__image');
    const initialCardsImageContainer = document.querySelectorAll('.places__container');

    //Извините, я не соовсем поняла комментарий "Все слушатели устанавливаются в момент создания карточки"
    //Ведь вся эта фукция - загрузка массива с фото. 
    initialCardsImage.forEach(function open(item) {
      item.addEventListener('click', function openPopup() {
        imagePopup.classList.add('popup_opened');
        document.querySelector('.image-popup__photolink').src = this.src;

        initialCardsImageContainer.forEach(function showCaption(elem) {
          elem.addEventListener('click', function () {
            document.querySelector('.image-popup__caption').textContent = this.textContent;
          });
        });
      });
    });

    cardsContainer.append(placesElement)
  });

};

uploadInitialCards();