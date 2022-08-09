function Card(props){

    function handleClick() {
       props.onCardClick(props.card);
    }

    return(
            <div className="cell">
                <img className="cell__photo" src={props.link} alt={props.name} onClick={handleClick}/>
                <button type='button' className="cell__button-delete"></button>
                <div className="cell__info">
                    <h2 className="cell__info-title">{props.name}</h2>
                    <div className="cell__info-like">
                        <button type="button" className="cell__button-like"></button>
                        <p className="cell__number-like">{props.likes}</p>
                    </div>
                </div>
            </div>
    )
}

export default Card