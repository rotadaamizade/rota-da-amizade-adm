import { useEffect, useState } from "react";
import "./AboutUs.css";
import axios from "axios";
import ShortDescribeAboutUs from "../../components/ShortDescribeAboutUs/ShortDescribeAboutUs";
import Footer from "../../components/Footer/Footer";

function AboutUs() {
  const [imgCapa, setImgCapa] = useState([]);
  useEffect(() => {
    axios.get("Data/capas.json").then((res) => {
      setImgCapa(res.data[Math.floor(Math.random() * res.data.length)]);
    });
  }, []);

  return (
    <>
      <span id="sobreNos" />
      <ShortDescribeAboutUs />
      <section id="ourValues">
        <div className="container" id="valuesWrapper">
          <div>
            <h3>Nossa Missão</h3>
            Fomentar e promover o turismo de forma integrada, contribuindo para
            o desenvolvimento sustentável da região do Vale dos Imigrantes
          </div>
          <div>
            <h3>Nossa Visão</h3>
            Ser referência em Santa Catarina até 2020 como entidade promotora de
            integração e fomento do turismo. Através da promoção do destino e
            captação de eventos e recursos
          </div>
          <div>
            <h3>Nossos Valores</h3>
            <p>Integração</p>
            <p>Qualidade</p>
            <p>Sustentabilidade</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AboutUs;
