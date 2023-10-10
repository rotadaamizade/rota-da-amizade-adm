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
                    <h1 className='title'>Municípios</h1>
                    <h3>Editar Municípios</h3>
                    <div className='card-div'>
                        {
                            cities.map((city, index) => (
                                <CardEdit
                                    key={index}
                                    url={city.imgCard.url}
                                    id={city.id}
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