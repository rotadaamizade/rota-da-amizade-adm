import AssociadoCard from "../../components/AssociadoCard/AssociadoCard";
import Loading from "../../components/Loading/Loading";
import MotionMain from "../../components/MotionMain/MotionMain";
import "./Associates.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Associates() {
    const [associadosDiamante, setAssociadosDiamante] = useState([]);
    useEffect(() => {
        axios.get("Data/associadosDiamante.json").then((res) => {
            setAssociadosDiamante(res.data);
        });
    }, []);

    const [associadosOuro, setAssociadosOuro] = useState([]);
    useEffect(() => {
        axios.get("Data/associadosOuro.json").then((res) => {
            setAssociadosOuro(res.data);
        });
    }, []);

    const [associadosPrata, setAssociadosPrata] = useState([]);
    useEffect(() => {
        axios.get("Data/associadosPrata.json").then((res) => {
            setAssociadosPrata(res.data);
        });
    }, []);
    return (
        <MotionMain>
            <span id="associados" />
            <section id="associates" className="container">
                <h1>Associados</h1>
                <div className="cardGroup">
                    {associadosDiamante.length === 0 ? (
                        <Loading />
                    ) : (
                        (associadosDiamante.map((associado) => {
                            return (
                                <AssociadoCard
                                    key={associado.id}
                                    instancia={associado}
                                    path="associados"
                                    description={false}
                                />
                            );
                        }),
                        associadosOuro.map((associado) => {
                            return (
                                <AssociadoCard
                                    key={associado.id}
                                    instancia={associado}
                                    path="associados"
                                    description={false}
                                />
                            );
                        }),
                        associadosPrata.map((associado) => {
                            return (
                                <AssociadoCard
                                    key={associado.id}
                                    instancia={associado}
                                    path="associados"
                                    description={false}
                                />
                            );
                        }))
                    )}
                </div>
            </section>
        </MotionMain>
    );
}

export default Associates;
