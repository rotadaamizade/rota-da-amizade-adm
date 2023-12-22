import { useContext } from "react";
import ShortDescribeHome from "../../../components/Institucional/ShortDescribeHome/ShortDescribeHome";
import "./Home.css";
import { PageContext } from "../../../useContext";
import { useNavigate } from "react-router-dom";
import MotionMain from "../../../components/Institucional/MotionMain/MotionMain";

function Home() {
    const { page, setPage } = useContext(PageContext);

    const navigate = useNavigate();

    const linkContact = () => {
        setPage("contact");
        navigate("/contato");
    };
    return (
        <MotionMain>
            <span id="paginaInicial" />
            <ShortDescribeHome />

            <section id="app">
                <div id="appContainer" className="container">
                    <div id="appText">
                        <h1>Venha conhecer nosso App!</h1>
                        <ul>
                            <li>
                                <h2>- Eventos da regiao</h2>
                            </li>
                            <li>
                                <h2>- Principais pontos turísticos</h2>
                            </li>
                            <li>
                                <h2>- Melhores estabelecimentos</h2>
                            </li>
                            <li>
                                <h2>- Simples e fácil</h2>
                            </li>
                            <li>
                                <h2>- Gratuito para download</h2>
                            </li>
                        </ul>
                        <div className="appBadges">
                            <div className="appBadge">
                                <a href="#" target="_blank">
                                    <img
                                        src="./App/googlePlayBadge.png"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="appBadge">
                                <a href="#" target="_blank">
                                    <img src="./App/iosStoreBadge.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="appImgContainer">
                        <img src={`./App/screenMockup.webp`} alt="" />
                    </div>
                    <div className="appBadges appMobile">
                        <div className="appBadge">
                            <a href="#" target="_blank">
                                <img src="./App/googlePlayBadge.png" alt="" />
                            </a>
                        </div>
                        <div className="appBadge">
                            <a href="#" target="_blank">
                                <img src="./App/iosStoreBadge.svg" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="wannaBeAssociate">
                <div id="wbaContainer" className="container">
                    <div id="wbaBackground">
                        <img src="/wbaImage.webp" alt="" />
                    </div>
                    <div id="wbaText">
                        <div>
                            <h2>Faça parte da Rota da Amizade</h2>
                            <p>
                                Conheça o nosso Plano Comercial e as vantagens
                                em ser colaborador do Turismo Regional{" "}
                            </p>
                            <a href="#contatos">
                                <button onClick={linkContact}>
                                    PLANO COMERCIAL
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </MotionMain>
    );
}

export default Home;
