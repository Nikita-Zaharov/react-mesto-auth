import imageCloseBtn from "../images/CloseIcon.svg";
import acces from "../images/acces.png";
import error from "../images/error.png";

function InfoToolTip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup popup__info-tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container-tooltip">
        <button className="popup__button-close" type="button">
          <img
            className="popup__photo-close"
            src={imageCloseBtn}
            alt="Закрыть"
            onClick={onClose}
          />
        </button>
        <img
          className="popup__image-tooltip"
          src={isSuccess ? acces : error}
          alt="suclogo"
        />
        <h2 className="popup__title-tooltip">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoToolTip;
