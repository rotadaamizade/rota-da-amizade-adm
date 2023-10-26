import { Link } from 'react-router-dom'
import './home.css'

function Home(){
    return(
        <>
            <Link to={'/municipios'}>Municipios</Link>
            <Link to={'/categorias'}>Categorias</Link>
        </>
    )
}

export default Home