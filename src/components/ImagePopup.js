import imageCloseBtn from "../images/CloseIcon.svg";

function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container-image">
        <div className="popup__image-info">
          <img
            className="popup__photo"
            src={props.card?.link}
            alt={props.name}
          />
          <h3 className="popup__title-photo">{props.card?.name}</h3>
          <button
            onClick={props.onClose}
            type="button"
            className="popup__button-close popup__button-close_image"
          >
            <img
              className="popup__photo-close"
              src={imageCloseBtn}
              alt="Закрыть"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ImagePopup;
