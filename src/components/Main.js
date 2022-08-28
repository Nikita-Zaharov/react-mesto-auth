import { useContext } from "react";
import React from "react";
import Card from "./Card";
import editButton from "../images/editbutton.svg";
import addButton from "../images/addbutton.svg";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <div onClick={onEditAvatar} className="profile__button-avatar"></div>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__button-edit"
            >
              <img
                className="profile__edit"
                src={editButton}
                alt="Изменение профиля"
              />
            </button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__button-add"
        >
          <img
            className="profile__add"
            src={addButton}
            alt="Добавление профиля"
          />
        </button>
      </section>
      <section className="photo-grid">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
