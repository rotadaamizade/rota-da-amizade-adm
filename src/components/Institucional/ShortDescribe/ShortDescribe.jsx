import { useContext } from "react";
import "./ShortDescribe.css";
import { useNavigate } from "react-router-dom";
import { PageContext } from "../../../useContext";

function ShortDescribe(props) {

  const { page, setPage } = useContext(PageContext);

  const navigate = useNavigate();

  const linkContact = () => {
    setPage("contact");
    navigate("/contato");
  };

    return (
        <section id="aboutUs">
            <div className="container">
                <div id="contentMiddle">
                    <h1>ROTA DA AMIZADE</h1>
                    {props.children}
                    <div id="contactUsButton">
                        <a href="#contatos" >
                            <button onClick={linkContact}>FALE CONOSCO</button>
                        </a>
                    </div>
                </div>
                <div id="galleryImages">
                    <div className="gallery">
                        <img
                            src={"./Gallery/arroioTrinta.jpg"}
                            alt="a forest after an apocalypse"
                        />
                        <img
                            src={"./Gallery/fraiburgo.jpg"}
                            alt="a waterfall and many rocks"
                        />
                        <img
                            src={"./Gallery/fraiburgoMacas.jpg"}
                            alt="a house on a mountain"
                        />
                        <img
                            src={"./Gallery/iomere.jpg"}
                            alt="sime pink flowers"
                        />
                        <img
                            src={"./Gallery/rioDasAntasMoinho.jpg"}
                            alt="big rocks with some trees"
                        />
                        <img
                            src={"./Gallery/saltoVeloso.jpg"}
                            alt="a waterfall, a lot of tree and a great view from the sky"
                        />
                        <img
                            src={"./Gallery/trezeTiliasMarco.webp"}
                            alt="a cool landscape"
                        />
                        <img
                            src={"./Gallery/videira.jpg"}
                            alt="inside a town between two big buildings"
                        />
                        <img
                            src={"./Gallery/videiraMatriz.jpeg"}
                            alt="a great view of the sea above the mountain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShortDescribe;
