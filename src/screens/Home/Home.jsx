import { useContext } from "react";
import ShortDescribeHome from "../../components/ShortDescribeHome/ShortDescribeHome";
import "./Home.css";
import { PageContext } from "../../useContext";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function Home() {
  const { page, setPage } = useContext(PageContext);

  const navigate = useNavigate();

  const linkContact = () => {
    setPage("contact");
    navigate("/contato");
  };
  return (
    <>
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
              <a href="#contatos">
                <button onClick={linkContact}>Nos Contate</button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
