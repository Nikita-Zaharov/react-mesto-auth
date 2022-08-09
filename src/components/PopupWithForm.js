import imageCloseBtn from '../images/CloseIcon.svg'
function PopupWithForm(props){
    return(
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form className="popup__form" noValidate name={`${props.name}form`}>
                    <button onClick={props.onClose} type="button" className="popup__button-close"><img className="popup__photo-close" src={imageCloseBtn} alt="Закрыть" /></button>
                    <h3 className="popup__title">{props.title}</h3>
                    {props.children}
                    <button type="submit" className="popup__button-save">Создать</button>
                </form>
            </div>
        </div>
    )
}
export default PopupWithForm