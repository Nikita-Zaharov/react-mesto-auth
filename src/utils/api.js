class Api {
    constructor(options){
        this._url = options.url;
        this._headers = options.headers
    }

    _checkAnswer(res){
        if (res.ok){
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInfoUser(){
         return fetch(this._url+'users/me', {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkAnswer)
    }

    getInitialsCard(){
         return fetch(this._url+'cards', {
            method: 'GET',
            headers: this._headers
            
        })
        .then(this._checkAnswer)
    }

    editProfile(data){
        return fetch(this._url+'users/me',{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkAnswer)
    }
    
    addCard(data){
        return fetch(this._url+'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkAnswer)
    }
    
    changeLikeCardStatus(id, isLiked) {
        return fetch(this._url+`cards/${id}/likes`, {
          method: isLiked ? 'PUT' : 'DELETE',
          headers: this._headers,
        })
        .then(this._checkAnswer)
      }

    deleteCard(id){
        return fetch(this._url+`cards/${id}`,{
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkAnswer)
    }

    editAvatar(data){
        return fetch(this._url+'users/me/avatar',{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkAnswer)
    }

   

}
export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-45/',
  headers: {
    authorization: '605bf577-7118-46c0-9109-b867a7033a44',
    'Content-Type': 'application/json'
  }
})