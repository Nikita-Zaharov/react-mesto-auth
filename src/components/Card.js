import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
    console.log(card._id);
  }

  return (
    <div className="cell">
      <img
        className="cell__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        type="button"
        className={`cell__button-delete ${
          isOwn ? "" : "cell__button-delete_hidden"
        }`}
        onClick={handleDeleteClick}
      />
      <div className="cell__info">
        <h2 className="cell__info-title">{card.name}</h2>
        <div className="cell__info-like">
          <button
            onClick={handleLikeClick}
            type="button"
            className={`cell__button-like ${
              isLiked ? "cell__button-like_active" : ""
            }`}
          />
          <p className="cell__number-like">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
