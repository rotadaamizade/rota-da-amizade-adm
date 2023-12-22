import { useNavigate } from "react-router-dom"
import './homeCards.css'

function HomeCards(props){

    const navigate = useNavigate()

    return(
        <div style={{backgroundColor: props.color}} className="homeCard" onClick={() => navigate("/"+props.navigate)}>
            <div  className='homeCard-text'>
                <h1>{props.name}</h1>
            </div>
        </div>
    )
}

export default HomeCards