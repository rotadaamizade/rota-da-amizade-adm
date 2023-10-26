import './categorias.css'
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import CardEdit from '../../components/cardEdit/cardEdit';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import StringToHtml from '../../components/stringToHtml/stringToHtml';

function Categorias() {

    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {

        try {
            const data = await getDocs(collection(db, "categorias"));
            const categoriesData = [];

            data.forEach((doc) => {

                categoriesData.push(doc.data());
            });

            setCategories(categoriesData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    console.log(categories)

    return (
        <>
            <div className='title-div'>
                <div onClick={() => navigate('/')} className='voltar-button'>
                    <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http:www.w3.org/2000/svg">
                        <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h1 className='title'>Categorias</h1>
            </div>
            {categories.map((category, index) => (
                <>
                <h2>{category.nome}</h2>
                <div className='category-container' key={index}>
                    {category.tipos.map((tipo, tipoIndex) => (
                        <>
                            <div className='category-div'>
                                <div style={{backgroundColor: `#${tipo.cor2}`}} className='category-button' key={tipoIndex}>
                                    <StringToHtml
                                        htmlString={tipo.svg}
                                    />
                                </div>
                                <p>{tipo.nome}</p>
                            </div>
                        </>
                    ))}
                </div>
                </>
            ))}
            <button onClick={() => navigate('cadastro')} className='cadastrar-button'>Cadastrar Categoria</button>
        </>
    )

}

export default Categorias