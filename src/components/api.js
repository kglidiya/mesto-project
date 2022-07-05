export {api}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '8f6d1960-4165-4690-8fd7-af73d50cc61b',
    'Content-Type': 'application/json'
  }
}

//Get response status

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  
}

//Fetch  all cards

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then (res => {
    return checkResponse(res)
  }) 
} 




//Upload new card

const uploadNewCard = (placeName, linkName) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: linkName
    })
  })
  .then (res => {
    return checkResponse(res)
  }) 
  }
   



//Upload use info

const getUserInfor = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then (res => {
    return checkResponse(res)
  }) 
   
}


//Edit user info

const editUserInfo = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    })
  })
  .then (res => {
    return checkResponse(res)
  }) 
   
}


//Delete card 

const deleteCard = (card) => {

  return fetch(`${config.baseUrl}/cards/${card}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then (res => {
    return checkResponse(res)
  }) 

}



//Put like

const putLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then (res => {
    return checkResponse(res)
  }) 
  
}


// Delete like
const deleteLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then (res => {
    return checkResponse(res)
  }) 
   
}


//Update avatar 
const editAvatar = (userAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({

      avatar: userAvatar
    })
  })
  .then (res => {
    return checkResponse(res)
  }) 
   
}

const api = {
  getInitialCards,
  uploadNewCard,
  getUserInfor,
  editUserInfo,
  deleteCard,
  putLike,
  deleteLike,
  editAvatar
}

