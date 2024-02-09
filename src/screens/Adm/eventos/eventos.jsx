import './eventos.css'
import { db } from "../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import CardEdit from '../../../components/Adm/cardEdit/cardEdit';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Adm/loading/loading';

function Eventos() {

    const navigate = useNavigate()

    const [eventosDesativados, setEventosDesativados] = useState(null)
    const [eventosRealizados, setEventosRealizados] = useState(null)
    const [eventsNaoRealizados, setEventosNaoRealizados] = useState(null)

    useEffect(() => {
        getEventos()
    }, [])


    const getEventos = async () => {
        const dataAtual = new Date();
        const eventosRealizadosData = [];
        const eventosNaoRealizadosData = [];
        const eventosDesativadosData = [];

        try {
            const data = await getDocs(collection(db, "eventos"));

            data.forEach((doc) => {

                let maiorData = new Date('01-01-0000');
                let maiorDataIndex

                doc.data().data.forEach((dataItem, index) => {
                    const dataString = dataItem.data;
                    const date = new Date(dataString);

                    if (date > maiorData) {
                        maiorData = date;
                        maiorDataIndex = index
                    }
                });

                const eventData = {
                    id: doc.id,
                    nome: doc.data().nome,
                    realizador: doc.data().realizador,
                    imgCard: doc.data().imgCard,
                    data: new Date(doc.data().data[maiorDataIndex].data),
                    ativo: doc.data().ativo,
                };


                if (!eventData.ativo) { 
                    eventosDesativadosData.push(eventData)
                } else if (eventData.data <= dataAtual) {
                    eventosRealizadosData.push(eventData);
                } else {
                    eventosNaoRealizadosData.push(eventData);
                }
            });

            setEventosDesativados(eventosDesativadosData)
            setEventosNaoRealizados(eventosNaoRealizadosData)
            setEventosRealizados(eventosRealizadosData)

        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    };


    return (
        <>
            {
                eventosRealizados == null || eventosRealizados == null ? (
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
                            <h1 className='title'>Eventos</h1>
                        </div>
                        <h2 className='home-title'>Eventos a serem realizados</h2>
                        <div className='card-div'>
                            {
                                eventsNaoRealizados.map((event, index) => (
                                    <CardEdit
                                        key={index}
                                        url={event.imgCard.url}
                                        id={"editar/" + event.id}
                                        descricao={event.realizador}
                                        nome={event.nome}
                                    />
                                ))
                            }
                        </div>
                        <h2 className='home-title'>Eventos realizados</h2>
                        <div className='card-div'>
                            {
                                eventosRealizados.map((event, index) => (
                                    <CardEdit
                                        key={index}
                                        url={event.imgCard.url}
                                        id={"editar/" + event.id}
                                        descricao={event.realizador}
                                        nome={event.nome}
                                    />
                                ))
                            }
                        </div>
                        <h2 className='home-title'>Eventos Não Ativos</h2>
                        <div className='card-div'>
                            {
                                eventosDesativados.map((event, index) => (
                                    <CardEdit
                                        key={index}
                                        url={event.imgCard.url}
                                        id={"editar/" + event.id}
                                        descricao={event.realizador}
                                        nome={event.nome}
                                    />
                                ))
                            }
                        </div>

                        <button onClick={() => navigate('cadastro')} className='cadastrar-button'>Cadastrar Eventos</button>
                    </>
                )
            }
        </>

    )
}

export default Eventos