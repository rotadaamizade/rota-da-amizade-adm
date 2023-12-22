import { useNavigate } from 'react-router-dom'
import './cardAssociadoEdit.css'

function CardAssociadoEdit(props){

    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`${props.id}`)} className='cardEdit-div'>
            <div className='card-gradient' />
            <div className='card-text'>
                <h1>{props.nome}</h1>
                <h2>{props.descricao}</h2>
            </div>
            
            <div className='img-logo'>
                <img src={props.logo} alt="" />
            </div>
            <img src={props.url} alt="" />
        </div>
    )
}

export default CardAssociadoEdit