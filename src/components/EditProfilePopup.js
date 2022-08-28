import { useEffect, useContext, useState } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="edit"
      title={"Редактировать профиль"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        placeholder="Имя"
        className="popup__input"
        id="nameInput"
        minLength={2}
        maxLength={40}
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__input-error popup__input-error-nameInput"></span>
      <input
        name="job"
        type="text"
        placeholder="О себе"
        className="popup__input"
        id="jobInput"
        minLength={2}
        maxLength={200}
        required
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error popup__input-error-jobInput"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
