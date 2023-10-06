import { useNavigate } from 'react-router-dom'
import './cardEdit.css'

function CardEdit(props){

    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`editar/${props.id}`)} className='cardEdit-div'>
            <div className='card-gradient' />
            <div className='card-text'>
                <h1>{props.nome}</h1>
                <h2>{props.descricao}</h2>
            </div>

            <img src={props.url} alt="" />
        </div>
    )
}

export default CardEdit