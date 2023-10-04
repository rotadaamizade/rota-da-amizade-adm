import SubFooter from "../SubFooter/SubFooter";
import "./Footer.css";
import RotaAmizadeIcon from "./rota-da-amizade-desenho.png";
import RotaAmizadeName from "./rota-da-amizade-escrita.png";

function Footer() {
  return (
    <footer>
      <div id="paddingAll">
        <div id="rotaIcon" className="container">
          <img src={RotaAmizadeIcon} alt="" id="rotaDesenho" />
          <img src={RotaAmizadeName} alt="" />
        </div>
        <div id="contact" className="container">
          <div>
            <p className="tittleContact">
              <b>Contato</b>
            </p>
            <div className="row redFilter" id="emailBox">
              <img className="icon" id="emailIcon" src="./Icons/email-icon.svg" alt="" />
              <p className="textWithIcon">
                <a id="email" href="mailto:amizade@rotadaamizade.com.br">
                  amizade@rotadaamizade.com.br
                </a>
              </p>
            </div>
            <div className="row redFilter" id="phoneBox">
              <img className="icon" id="phoneIcon" src="./Icons/phone-icon.svg" alt="" />
              <p className="textWithIcon">(49) 99930-7834</p>
            </div>
          </div>
          <div>
            <p className="tittleContact">
              <b>Redes sociais</b>
            </p>
            <div className="row redFilter" id="facebookBox">
              <img
                className="icon"
                id="facebookIcon"
                src="./Icons/facebook-icon.svg"
                alt=""
              />
              <p className="textWithIcon">
                <a
                  id="email"
                  href="https://www.facebook.com/rotadaamizade"
                  target="_blank"
                >
                  Rota da Amizade
                </a>
              </p>
            </div>
            <div className="row redFilter" id="instagramBox">
              <img
                className="icon"
                id="instagramIcon"
                src="./Icons/instagram-icon.svg"
                alt=""
              />
              <p className="textWithIcon">
                <a
                  id="email"
                  href="https://www.instagram.com/rotadaamizade/"
                  target="_blank"
                >
                  <b>@</b>rotadaamizade
                </a>
              </p>
            </div>
          </div>
          <div>
            <p className="tittleContact">
              <b>Termos de privacidade</b>
            </p>
            <div className="row redFilter">
              <p>
                <a href="#">Política de Privacidade</a>
              </p>
            </div>
            <div className="row redFilter">
              <p>
                <a href="#">Termos de Uso</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <SubFooter />
    </footer>
  );
}

export default Footer;
