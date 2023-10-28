import './municipios.css'
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import CardEdit from '../../components/cardEdit/cardEdit';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading';

function Municipios() {

    const navigate = useNavigate()

    const [cities, setCities] = useState(null)

    useEffect(() => {
        getCities()
    }, [])

    console.log(cities)

    const getCities = async () => {

        try {
            const data = await getDocs(collection(db, "municipios"));
            const citiesData = [];

            data.forEach((doc) => {
                const cityData = {
                    id: doc.id,
                    municipio: doc.data().municipio,
                    descricao: doc.data().descricao,
                    imgCard: doc.data().imgCard
                };

                citiesData.push(cityData);
            });

            setCities(citiesData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    return (
        <>
            {
                cities == null ? (
                    <Loading />
                ) : (
                    <>
                        <div className='title-div'>
                            <div onClick={() => navigate('/')} className='voltar-button'>
                                <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http:www.w3.org/2000/svg">
                                    <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h1 className='title'>Municípios</h1>
                        </div>
                        <div className='card-div'>
                            {
                                cities.map((city, index) => (
                                    <CardEdit
                                        key={index}
                                        url={city.imgCard.url}
                                        id={"editar/"+city.id}
                                        descricao={city.descricao}
                                        nome={city.municipio}
                                    />
                                ))
                            }
                        </div>
                        <button onClick={() => navigate('cadastro')} className='cadastrar-button'>Cadastrar Município</button>
                    </>
                )
            }
        </>

    )
}

export default Municipios