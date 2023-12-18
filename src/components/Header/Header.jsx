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

    const viewHome = () => {
        setIsOpen(false);
        setPage("");
        if (!document.startViewTransition) {
            navigate("/");
        } else {
            document.startViewTransition(() => {
                navigate("/");
            });
        }
    };
    const viewNavigate = (newPage, newUrl) => {
        // Navigate to the new route
        setIsOpen(!isOpen);
        setPage(newPage);
        if (!document.startViewTransition) {
            navigate(newUrl);
        } else {
            document.startViewTransition(() => {
                navigate(newUrl);
            });
        }
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

    const playStoreIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 333333 332779"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
        >
            <path d="M67387 0h198558c37064 0 67388 30324 67388 67387v198004c0 37064-30324 67387-67388 67387H67387C30324 332778 0 302454 0 265391V67387C0 30324 30324 0 67387 0zm15161 77982c544-1762 1288-3270 2204-4534l92974 93102-92483 93392c-611-724-1146-1525-1608-2393-2958-5568-2128-14137-2128-20421V94564c0-5183-476-11665 1041-16581zm11848-9565c176-11 354-19 532-24 7635-216 11624 3209 17880 6896l98805 57040-26584 26845-90633-90758zm126511 69279l21120 12192c4202 2426 7842 4206 11003 8085 5147 6319 4476 13561-2940 19659-3277 2695-7702 4932-11402 7078l-17833 10340-28491-28529 28544-28824zm-9343 62741l-104389 60530c-3445 1998-5119 2837-9255 3298-859 96-1686 138-2480 130l89619-90499 26505 26541z" />
        </svg>
    );

    const appStoreIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 333334 332780"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
        >
            <path d="M67387 0h198559c37063 0 67387 30324 67387 67387v198005c0 37063-30324 67387-67387 67387H67387C30324 332779 0 302455 0 265392V67387C0 30324 30324 0 67387 0zm192804 188911c8471 0 15339 6868 15339 15339 0 8472-6868 15339-15339 15339h-13707l12369 21361c4186 7375 1601 16748-5774 20934-7376 4186-16748 1600-20933-5775l-21148-36520h-292l-18180-30679h707l-17948-30995 17460-31129 35974 62123h31472zM137016 91830c-4186-7376-1601-16748 5775-20934 7375-4186 16748-1601 20933 5774l3533 6102 3041-5232c4186-7375 13559-9960 20934-5774s9960 13559 5775 20933l-12043 20650 35 60-9218 15688-34881 59815h36634l17798 30678-71907 1-19809 34780c-4186 7375-13559 9960-20933 5774-7375-4186-9961-13558-5774-20934l11175-19619H73143c-8471 0-15339-6868-15339-15340 0-8471 6868-15339 15339-15339h32415l43922-75559-12464-21524z" />
        </svg>
    );

    return (
        <header>
            <div id="options" className="container">
                <a
                    onClick={() => {
                        viewHome();
                    }}
                    href="#top"
                    id="icon"
                >
                    <img
                        src={rotaDesenho}
                        alt="Logo da rota da amizade"
                        id="rotaDesenho"
                    />

                    <img
                        src={rotaEscrita}
                        alt="nome Rota da amizade"
                        id="rotaEscrita"
                    />
                </a>
                <ul>
                    <a
                        className={page == "about" ? "activeLink" : ""}
                        onClick={() => {
                            viewNavigate("about", "/sobre");
                        }}
                        href="#top"
                    >
                        Quem somos
                    </a>
                    <a
                        className={page == "cities" ? "activeLink" : ""}
                        onClick={() => {
                            viewNavigate("cities", "/cidades");
                        }}
                        href="#top"
                    >
                        Municipios
                    </a>
                    <a
                        className={page == "associates" ? "activeLink" : ""}
                        onClick={() => {
                            viewNavigate("associates", "/associados");
                        }}
                        href="#top"
                    >
                        Associados
                    </a>
                    <a
                        className={page == "contact" ? "activeLink" : ""}
                        onClick={() => {
                            viewNavigate("contact", "/contato");
                        }}
                        href="#top"
                    >
                        Contato
                    </a>
                </ul>
                <div id="shopIconContainer">
                    <a href="#">
                        <div className="shopsIconContainer">
                            {playStoreIcon}
                        </div>
                    </a>
                    <a href="#">
                        <div className="shopsIconContainer">{appStoreIcon}</div>
                    </a>
                </div>
                {/* <a href="#" id="baixarApp">
                    Baixar o aplicativo
                </a> */}
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
                        <a
                            onClick={() => {
                                viewNavigate("about", "/sobre");
                            }}
                            href="#top"
                        >
                            Quem somos
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                viewNavigate("cities", "/cidades");
                            }}
                            href="#top"
                        >
                            Municipios
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                viewNavigate("associates", "/associados");
                            }}
                            href="#top"
                        >
                            Associados
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                viewNavigate("contact", "/contato");
                            }}
                            href="#top"
                        >
                            Contato
                        </a>
                    </li>
                </ul>
                <hr />
                <div id="shopIconContainerMobile">
                    <a href="#">
                        <div className="shopsIconContainerMobile">
                            {playStoreIcon}
                        </div>
                    </a>
                    <a href="#">
                        <div className="shopsIconContainerMobile">
                            {appStoreIcon}
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
