import Footer from "../../components/Footer/Footer";
import "./Contact.css";

function Contact() {
  return (
    <>
      <span id="contatos" />
      <section id="contactUs">
        <div className="container">
          <h1>Contatos</h1>
          <div id="basicInfo">
            <div>
              <h2>Whatsapp e E-mail</h2>
              <div className="row">
                <img
                  src="./Icons/whatsapp1.svg"
                  className="icon"
                  alt="whatsapp logo"
                />
                <p>(49) 99930-7834</p>
              </div>
              <div className="row">
                <img
                  src="./Icons/email-icon.svg"
                  className="icon"
                  alt="whatsapp logo"
                />
                <p>amizade@rotadaamizade.com.br</p>
              </div>
            </div>
            <div>
              <h2>Redes Sociais</h2>
              <div className="row">
                <img src="./Icons/facebook-icon.svg" className="icon" alt="" />
                <p>Rota da Amizade</p>
              </div>
              <div className="row">
                <img src="./Icons/instagram-icon.svg" className="icon" alt="" />
                <p>@rotadaamizade</p>
              </div>
            </div>
          </div>
          <div id="localization">
            <h2>Localização Geográfica</h2>
            <p>
              Rota da Amizade Convention & Visitors Bureau - Rua XV de Novembro
              - Centro, Videira - SC
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d576.2369212752822!2d-51.156265775203735!3d-27.00756222968269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e3faaa5b097c31%3A0xba02532094b8038e!2sRota%20da%20Amizade%20Convention%20%26%20Visitors%20Bureau!5e0!3m2!1spt-BR!2sbr!4v1695926480342!5m2!1spt-BR!2sbr"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
