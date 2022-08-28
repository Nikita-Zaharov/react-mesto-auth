import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  
  useEffect(() => {
    setName('');
    setLink(``);
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="add"
      title="Новое место"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="mesto"
        type="text"
        placeholder="Название"
        className="popup__input"
        id="placeInput"
        minLength={2}
        maxLength={30}
        required
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="popup__input-error popup__input-error-placeInput"></span>
      <input
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input"
        id="linkInput"
        required
        value={link || ''}
        onChange={handleLinkChange}
      />
      <span className="popup__input-error popup__input-error-linkInput"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
