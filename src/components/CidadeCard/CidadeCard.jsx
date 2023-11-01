import "./CidadeCard.css";
import Cards from "../Cards/Cards";
import { useNavigate } from "react-router-dom";

function CidadeCard(props) {

    const navigate = useNavigate();

    const linkCity = (cityUrl) => {
        navigate(`/cidades/${cityUrl}`);
    };

    return (
        <a onClick={() => linkCity(props.url)}>
            <Cards
                objeto={props.instancia}
                path={props.path}
                shadow="lowShadow"
                description={true}
            >
                <h3>{props.instancia.nome}</h3>
                <p>{props.instancia.description}</p>
            </Cards>
        </a>
    );
}

export default CidadeCard;
