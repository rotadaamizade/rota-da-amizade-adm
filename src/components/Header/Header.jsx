import rotaDesenho from "./rota-da-amizade-desenho.png";
import rotaEscrita from "./rota-da-amizade-escrita.png";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../../useContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { page, setPage } = useContext(PageContext);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const linkHome = () => {
    if (isOpen) setIsOpen(!isOpen);
    setPage("home");
    navigate("");
  };
  const linkAboutUs = () => {
    setIsOpen(!isOpen);
    setPage("about");
    navigate("/sobre");
  };
  const linkCities = () => {
    setIsOpen(!isOpen);
    setPage("cities");
    navigate("/cidades");
  };
  const linkAssociates = () => {
    setIsOpen(!isOpen);
    setPage("associates");
    navigate("/associados");
  };

  const linkContact = () => {
    setIsOpen(!isOpen);
    setPage("contact");
    navigate("/contato");
  };

  const dropdownMenuIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const dropdownMenuCloseIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
        fill="#0F0F0F"
      />
    </svg>
  );

  return (
    <header>
      <div id="options" className="container">
        <a onClick={linkHome} href="#paginaInicial" id="icon">
          <img
            src={rotaDesenho}
            alt="Logo da rota da amizade"
            id="rotaDesenho"
          />

          <img src={rotaEscrita} alt="nome Rota da amizade" id="rotaEscrita" />
        </a>
        <ul>
          <a
            className={page == "about" ? "activeLink" : ""}
            onClick={linkAboutUs} href="#sobreNos"
          >
            Quem somos
          </a>
          <a
            className={page == "cities" ? "activeLink" : ""}
            onClick={linkCities} href="#cidades"
          >
            Municipios
          </a>
          <a
            className={page == "associates" ? "activeLink" : ""}
            onClick={linkAssociates} href="#associados"
          >
            Associados
          </a>
          <a
            className={page == "contact" ? "activeLink" : ""}
            onClick={linkContact} href="#contatos"
          >
            Contato
          </a>
        </ul>
        <a href="#" id="baixarApp">
          Baixar o aplicativo
        </a>
        <div id="dropdown-icon">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? dropdownMenuCloseIcon : dropdownMenuIcon}
          </button>
        </div>
      </div>
      <div
        id="dropdown-menu"
        className={"container " + (isOpen ? "show" : "hide")}
      >
        <ul id="dropdown-menu-mobile">
          <li>
            <a onClick={linkAboutUs} href="#sobreNos">Quem somos</a>
          </li>
          <li>
            <a onClick={linkCities} href="#cidades">Municipios</a>
          </li>
          <li>
            <a onClick={linkAssociates} href="#associados">Associados</a>
          </li>
          <li>
            <a onClick={linkContact} href="#contatos">
              Contato
            </a>
          </li>
          <li>
            <a href="#">Baixe o aplicativo</a>
          </li>
        </ul>
        <hr />
      </div>
    </header>
  );
}

export default Header;
