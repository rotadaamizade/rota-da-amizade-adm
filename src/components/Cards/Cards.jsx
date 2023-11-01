import "./Cards.css";

function Cards(props) {
    return (
        <>
                <div className={props.description==true ?
                        `card hoverUp` : "card"}>
                    <div className="cardContainer">
                        <img
                            src={`./${props.path}/${props.objeto.imagem}`}
                            alt={`imagem de ${props.objeto.nome} faltando`}
                            className="cardImg"
                        />
                    </div>
                    <div className={
                        props.description==true ?
                        `shadow ${props.shadow} sHoverUp` : `shadow ${props.shadow}`} />
                    <div className={
                        props.description==true ?
                        `cardOverlay tHoverUp` :
                        "cardOverlay"}>{props.children}</div>
                </div>
        </>
    );
}

export default Cards;
