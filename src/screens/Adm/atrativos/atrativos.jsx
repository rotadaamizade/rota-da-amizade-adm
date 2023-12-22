import { db } from "../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import CardEdit from '../../../components/Adm/cardEdit/cardEdit';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Adm/loading/loading';

function Atrativos() {

    const navigate = useNavigate()

    const [activeAtrativos, setActiveAtrativos] = useState(null)
    const [desactiveAtrativos, setDesactiveAtrativos] = useState(null)

    useEffect(() => {
        getAtrativos()
    }, [])

    const getAtrativos = async () => {

        try {
            const data = await getDocs(collection(db, "atrativos"));
            const activeAtrativosData = [];
            const desactiveAtrativosData = [];

            data.forEach((doc) => {
                const atrativoData = {
                    id: doc.id,
                    municipio: doc.data().municipio,
                    nome: doc.data().nome,
                    imgCard: doc.data().imgCard
                };

                if(doc.data().ativo){
                    activeAtrativosData.push(atrativoData);
                } else {
                    desactiveAtrativosData.push(atrativoData);
                }
            })
            setDesactiveAtrativos(desactiveAtrativosData)
            setActiveAtrativos(activeAtrativosData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    return (
        <>
            {
                activeAtrativos == null ? (
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
                            <h1 className='title'>Atrativos</h1>
                        </div>
                        <h2 className='home-title'>Atrativos Ativos</h2>
                        <div className='card-div'>
                            {
                                activeAtrativos.map((atrativo, index) => (
                                    <CardEdit
                                        key={index}
                                        url={atrativo.imgCard.url}
                                        id={"editar/"+atrativo.id}
                                        descricao={atrativo.municipio}
                                        nome={atrativo.nome}
                                    />
                                ))
                            }
                        </div>
                        <h2 className='home-title'>Atrativos Não Ativos</h2>
                        <div className='card-div'>
                            {
                                desactiveAtrativos.map((atrativo, index) => (
                                    <CardEdit
                                        key={index}
                                        url={atrativo.imgCard.url}
                                        id={"editar/"+atrativo.id}
                                        descricao={atrativo.municipio}
                                        nome={atrativo.nome}
                                    />
                                ))
                            }
                        </div>
                        <button onClick={() => navigate('cadastro')} className='cadastrar-button'>Cadastrar Atrativo</button>
                    </>
                )
            }
        </>

    )
}

export default Atrativos