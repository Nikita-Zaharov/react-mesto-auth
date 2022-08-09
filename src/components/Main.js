import { useState, useEffect } from "react";
import Card from "./Card";
import editButton from "../images/editbutton.svg";
import addButton from "../images/addbutton.svg";
import { api } from "../utils/api";

function Main(props) {
  const [cards, setCards] = useState([]);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    api
      .getInfoUser()
      .then((data) => {
        setUserName(data.name);
        setUserAvatar(data.avatar);
        setUserDescription(data.about);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialsCard()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${userAvatar})` }}
        >
          <div
            onClick={props.onEditAvatar}
            className="profile__button-avatar"
          ></div>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{userName}</h1>
            <button
              onClick={props.onEditProfile}
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
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          onClick={props.onAddPlace}
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
            link={card.link}
            name={card.name}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
