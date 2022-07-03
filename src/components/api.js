import {linkInput, nameInput, jobInput, placeInput, cardsContainer, userName, userProffesion,
  avatarImage, avatarInput, renderLoading} from './utils.js';
import { creatCard, creatMyCard} from './card.js';

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '8f6d1960-4165-4690-8fd7-af73d50cc61b',
    'Content-Type': 'application/json'
  }
}

//Get-request 
export const getRequest = fetch(`${config.baseUrl}/cards`, {
  headers: {
    authorization: '8f6d1960-4165-4690-8fd7-af73d50cc61b',
    'Content-Type': 'application/json'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })


//Fetch  all cards

export const getInitialCards = () => {
  return getRequest
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
    })
}


//Upload new card

export const uploadNewCard = () => {
  const placeName = placeInput.value;
  const linkName = linkInput.value;

  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: '8f6d1960-4165-4690-8fd7-af73d50cc61b',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: placeName,
      link: linkName
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((card) => {
      return cardsContainer.prepend(creatMyCard(card.name, card.link, (card.likes).length));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      window.location.reload()
    })
}


//Upload use info

export const getUserInfor = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((result) => {
      userName.textContent = result.name;
      userProffesion.textContent = result.about;
      avatarImage.style.backgroundImage = `URL(${result.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
   
}


//Edit user info

export const editUserInfo = () => {
  const userName = nameInput.value;
  const userAbout = jobInput.value;

  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false)
    }); 
}


//Delete card 

export const deleteCard = (card) => {

  return fetch(`${config.baseUrl}/cards/${card}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(err);
    })
}



//Put like

export const putLike = (card, likes) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'PUT',
    headers: {
      authorization: '8f6d1960-4165-4690-8fd7-af73d50cc61b',
      'Content-Type': 'application/json'
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((result) => {
    return likes.textContent = (result.likes).length;
    })
    .catch((err) => {
      console.log(err);
    })
}


// Delete like
export const deleteLike = (card, likes) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'DELETE',
    headers: {
      authorization: '8f6d1960-4165-4690-8fd7-af73d50cc61b',
      'Content-Type': 'application/json'
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((result) => {
      return likes.textContent = (result.likes).length;
   
    })
    .catch((err) => {
      console.log(err);
    })
}


//Update avatar 
export const editAvatar = () => {

  const userAvatar = avatarInput.value;

  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({

      avatar: userAvatar
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(err);
    })
}
