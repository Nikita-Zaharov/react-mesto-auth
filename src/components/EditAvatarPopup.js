import React from "react";
import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef("");

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="avatar"
      title="Обновить аватар"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="linkAvatar"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input"
        id="linkInputAvatar"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error popup__input-error-linkInputAvatar"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
