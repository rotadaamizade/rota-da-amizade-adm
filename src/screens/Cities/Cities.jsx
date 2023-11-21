import CidadeCard from "../../components/CidadeCard/CidadeCard";
import Loading from "../../components/Loading/Loading";
import MotionMain from "../../components/MotionMain/MotionMain";
import "./Cities.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Cities() {
    const randArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const [municipios, setMunicipios] = useState([]);
    useEffect(() => {
        axios.get("Data/municipios.json").then((res) => {
            setMunicipios(randArray(res.data));
        });
    }, []);

    return (
        <MotionMain>
            <span id="cidades" />
            <section id="cities" className="container">
                <h1>Municípios</h1>
                <div className="cardGroup">
                    {municipios.length === 0 ? (
                        <Loading />
                    ) : (
                        municipios.map((municipio) => {
                            return (
                                <CidadeCard
                                    key={municipio.id}
                                    instancia={municipio}
                                    path="cidades"
                                    url={municipio.url}
                                />
                            );
                        })
                    )}
                </div>
            </section>
        </MotionMain>
    );
}
export default Cities;
