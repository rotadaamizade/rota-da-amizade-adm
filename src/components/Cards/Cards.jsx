import "./Cards.css";

function Cards(props) {
  return (
    <div className="card">
      <div className="cardContainer">
        <img
          src={`./${props.path}/${props.objeto.imagem}`}
          alt={`imagem de ${props.objeto.nome} faltando`}
          className="cardImg"
        />
      </div>
      <div className={`shadow ${props.shadow}`} />
      <div className="cardOverlay">{props.children}</div>
    </div>
  );
}

export default Cards;
