import AssociadoCard from "../../components/AssociadoCard/AssociadoCard";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import "./Associates.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Associates() {
  const randArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const [associadosDiamante, setAssociadosDiamante] = useState([]);
  useEffect(() => {
    axios.get("Data/associadosDiamante.json").then((res) => {
      setAssociadosDiamante(randArray(res.data));
    });
  }, []);

  const [associadosOuro, setAssociadosOuro] = useState([]);
  useEffect(() => {
    axios.get("Data/associadosOuro.json").then((res) => {
      setAssociadosOuro(randArray(res.data));
    });
  }, []);

  const [associadosPrata, setAssociadosPrata] = useState([]);
  useEffect(() => {
    axios.get("Data/associadosPrata.json").then((res) => {
      setAssociadosPrata(randArray(res.data));
    });
  }, []);
  return (
    <>
    <span id="associados" />
    <section id="associates" className="container">
      <h1>Associados</h1>
      <div className="cardGroup">
        {associadosDiamante.length === 0 ? (
          <Loading />
        ) : (
          associadosDiamante.map((associado) => {
            return (
              <AssociadoCard
                key={associado.id}
                instancia={associado}
                path="associados"
              />
            );
          }),
          associadosOuro.map((associado) => {
            return (
              <AssociadoCard
                key={associado.id}
                instancia={associado}
                path="associados"
              />
            );
          }),
          associadosPrata.map((associado) => {
            return (
              <AssociadoCard
                key={associado.id}
                instancia={associado}
                path="associados"
              />
            );
          })

        )}
      </div>
    </section>
    <Footer />
    </>
  );
}

export default Associates;
