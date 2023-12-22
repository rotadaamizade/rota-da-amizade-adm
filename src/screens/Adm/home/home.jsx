import { Link } from 'react-router-dom'
import './home.css'
import HomeCards from '../../../components/Adm/homeCards/homeCards'

function Home(){
    return(
        <>
            <h2 className='home-title'>Gerenciamento de dados:</h2>
            <div className='homeCards-container'>
                <HomeCards
                    name={'Municípios'}
                    navigate={'municipios'}
                    color={'#96B025'}
                />
                <HomeCards
                    name={'Categorias'}
                    navigate={'categorias'}
                    color={'#BFE31E'}
                />
                <HomeCards
                    name={'Eventos'}
                    navigate={'eventos'}
                    color={'#E3121D'}
                />
                <HomeCards
                    name={'Associados'}
                    navigate={'associados'}
                    color={'#1B8296'}
                />
                <HomeCards
                    name={'Atrativos'}
                    navigate={'atrativos'}
                    color={'#07BEE3'}
                />
            </div>

        </>
    )
}

export default Home