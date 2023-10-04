import "./CidadeCard.css";
import Cards from "../Cards/Cards";

function CidadeCard(props) {
  return (
    <Cards objeto={props.instancia} path={props.path} shadow="lowShadow"> 
      <h3>{props.instancia.nome}</h3>
    </Cards>
  );
}

export default CidadeCard;
