import "./CidadeCard.css";
import Cards from "../Cards/Cards";

function CidadeCard(props) {
    return (
        <a href={props.url != undefined && `cidades/${props.url}`}>
            <Cards
                objeto={props.instancia}
                path={props.path}
                shadow="lowShadow"
            >
                <h3>{props.instancia.nome}</h3>
            </Cards>
        </a>
    );
}

export default CidadeCard;
