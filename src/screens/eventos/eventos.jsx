import './eventos.css'
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import CardEdit from '../../components/cardEdit/cardEdit';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading';

function Eventos() {

    const navigate = useNavigate()

    const [events, setEvents] = useState(null)

    useEffect(() => {
        getEventos()
    }, [])


    const getEventos = async () => {

        try {
            const data = await getDocs(collection(db, "eventos"));
            const eventsData = [];

            data.forEach((doc) => {
                const eventData = {
                    id: doc.id,
                    nome: doc.data().nome,
                    realizador: doc.data().realizador,
                    imgCard: doc.data().imgCard
                };

                eventsData.push(eventData);
            });

            setEvents(eventsData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    return (
        <>
            {
                events == null ? (
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
                        <div className='card-div'>
                            {
                                events.map((event, index) => (
                                    <CardEdit
                                        key={index}
                                        url={event.imgCard.url}
                                        id={"editar/"+event.id}
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