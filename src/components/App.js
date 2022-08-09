import React from 'react';
import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

const [selectedCard, setSelectedCard] = useState(null)

function handleCardClick(card){
    setSelectedCard(card)
    setIsImagePopupOpen(true)
}

function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
}

function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
}

function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
}

function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false)
    setSelectedCard(null)
}

return (
        <div className="body">
            <div className="page">
                <Header />
                <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                 />
                <Footer />
                <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                name={'edit'}
                title={'Редактировать профиль'}
                onClose={closeAllPopups}
                children={
                    <>
                    <input name="name" type="text" placeholder="Имя" className="popup__input" id="nameInput" minLength={2} maxLength={40} required value="" />
                    <span className="popup__input-error popup__input-error-nameInput"></span>
                    <input name="job" type="text" placeholder="О себе" className="popup__input" id="jobInput" minLength={2} maxLength={200} required value="" />
                    <span className="popup__input-error popup__input-error-jobInput"></span>
                    </>
                }
                />
                <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                name={'avatar'}
                title={'Обновить аватар'}
                onClose={closeAllPopups}
                children={
                    <>
                    <input name="linkAvatar" type="url" placeholder="Ссылка на картинку" className="popup__input" id="linkInputAvatar" value="" required />
                    <span className="popup__input-error popup__input-error-linkInputAvatar"></span>
                    </>
                }
                />
                <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                name={'add'}
                title={'Новое место'}
                onClose={closeAllPopups}
                children={
                    <>
                    <input name="mesto" type="text" placeholder="Название" className="popup__input" id="placeInput" minLength={2} maxLength={30} required value="" />
                    <span className="popup__input-error popup__input-error-placeInput"></span>
                    <input name="link" type="url" placeholder="Ссылка на картинку" className="popup__input" id="linkInput" required value="" />
                    <span className="popup__input-error popup__input-error-linkInput"></span>
                    </>
                }
                />
                <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
                />
            </div>
        </div>
    
);
}

export default App;
