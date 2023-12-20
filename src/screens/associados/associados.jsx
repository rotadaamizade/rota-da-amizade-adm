import './associados.css'
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import CardAssociadoEdit from '../../components/cardAssociadoEdit/cardAssociadoEdit';

function Associados() {
    const navigate = useNavigate()
    const [activeAssociados, setActiveAssociados] = useState(null)
    const [desactiveAssociados, setDesactiveAssociados] = useState(null)

    useEffect(() => {
        getAssociados()
    }, [])

    const getAssociados = async () => {
        try {
            const data = await getDocs(collection(db, "associados"));
            const activeAssociadosData = [];
            const desactiveAssociadosData = [];

            data.forEach((doc) => {
                const associadoData = {
                    id: doc.id,
                    nome: doc.data().nome,
                    descricao: doc.data().descricao,
                    imgCard: doc.data().imgCard,
                    imgLogo: doc.data().imgLogo,
                };

                console.log(doc.data())

                if(doc.data().ativo){
                    activeAssociadosData.push(associadoData);
                } else {
                    desactiveAssociadosData.push(associadoData);
                }
            });

            setActiveAssociados(activeAssociadosData);
            setDesactiveAssociados(desactiveAssociadosData)
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    return (
        <>
            {
                activeAssociados == null ? ( 
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
                            <h1 className='title'>Associados</h1>
                        </div>

                        <h2 className='home-title'>Associados Ativos</h2>
                        <div className='card-div'>
                            {
                                activeAssociados.map((associado, index) => (
                                    <CardAssociadoEdit
                                        key={index}
                                        url={associado.imgCard.url}
                                        id={"editar/"+associado.id}
                                        descricao={associado.descricao}
                                        nome={associado.nome}
                                        logo={associado.imgLogo.url}
                                    />
                                ))
                            }
                        </div>
                        <h2 className='home-title'>Associados Não Ativos</h2>
                        <div className='card-div'>
                            {
                                desactiveAssociados.map((associado, index) => (
                                    <CardAssociadoEdit
                                        key={index}
                                        url={associado.imgCard.url}
                                        id={"editar/"+associado.id}
                                        descricao={associado.descricao}
                                        nome={associado.nome}
                                        logo={associado.imgLogo.url}
                                    />
                                ))
                            }
                        </div>
                        <button onClick={() => navigate('cadastro')} className='cadastrar-button'>Cadastrar Associado</button>
                    </>
                )
            }
        </>
    )
}

export default Associados;
