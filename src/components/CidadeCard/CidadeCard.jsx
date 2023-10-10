import "./CidadeCard.css";
import Cards from "../Cards/Cards";
import { useNavigate } from "react-router-dom";

function CidadeCard(props) {

    const navigate = useNavigate();

    const linkCity = (cityUrl) => {
        console.log(cityUrl);
        navigate(`/cidades/${cityUrl}`);
    };

    const cLog = (name) => {
        console.log(`hello ${name}`);
    }
    return (
        <a onClick={() => linkCity(props.url)}>
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
