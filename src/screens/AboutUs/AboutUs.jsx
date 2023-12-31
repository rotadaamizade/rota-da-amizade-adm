import { useContext, useEffect, useState } from "react";
import "./AboutUs.css";
import axios from "axios";
import ShortDescribeAboutUs from "../../components/ShortDescribeAboutUs/ShortDescribeAboutUs";
import OurHistory from "../../components/OurHistory/OurHistory";
import { PageContext } from "../../useContext";
import MotionMain from "../../components/MotionMain/MotionMain";

function AboutUs() {
    const [imgCapa, setImgCapa] = useState([]);

    const { page, setPage } = useContext(PageContext);

    useEffect(() => {
        axios.get("Data/capas.json").then((res) => {
            setImgCapa(res.data[Math.floor(Math.random() * res.data.length)]);
        });
    }, []);

    return (
        <MotionMain>
            <section
                className={
                    page == "about" ? "mainSection active" : "mainSection"
                }
            >
                <span id="sobreNos" />
                <section id="ourValues">
                    <div className="container" id="valuesWrapper">
                        <div>
                            <h3>Nossa Missão</h3>
                            Fomentar e promover o turismo de forma integrada,
                            contribuindo para o desenvolvimento sustentável da
                            região do Vale dos Imigrantes
                        </div>
                        <div>
                            <h3>Nossa Visão</h3>
                            Ser referência em Santa Catarina até 2020 como
                            entidade promotora de integração e fomento do
                            turismo. Através da promoção do destino e captação
                            de eventos e recursos
                        </div>
                        <div>
                            <h3>Nossos Valores</h3>
                            <p>Integração</p>
                            <p>Qualidade</p>
                            <p>Sustentabilidade</p>
                        </div>
                    </div>
                </section>
                <OurHistory />
                <ShortDescribeAboutUs />
            </section>
        </MotionMain>
    );
}

export default AboutUs;
