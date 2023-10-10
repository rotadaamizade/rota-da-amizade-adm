import SubFooter from "../SubFooter/SubFooter";
import "./Footer.css";
import RotaAmizadeIcon from "./rota-da-amizade-desenho.png";
import RotaAmizadeName from "./rota-da-amizade-escrita.png";

function Footer() {
    const emailIcon = (
        <svg
            className="icon"
            fill="#000000"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z"
                fillRule="evenodd"
            />
        </svg>
    );

    const facebookIcon = (
        <svg
            className="icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                fill="#0F0F0F"
            />
        </svg>
    );

    const phoneIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
            <path
                d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    const instagramIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                fill="#0F0F0F"
            />
            <path
                d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                fill="#0F0F0F"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                fill="#0F0F0F"
            />
        </svg>
    );

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
                        <div className="row redFilter mb-1" id="emailBox">
                            {emailIcon}
                            <p className="textWithIcon">
                                <a
                                    id="email"
                                    href="mailto:amizade@rotadaamizade.com.br"
                                >
                                    amizade@rotadaamizade.com.br
                                </a>
                            </p>
                        </div>
                        <div className="row redFilter mb-1" id="phoneBox">
                            {phoneIcon}
                            <p className="textWithIcon">(49) 99930-7834</p>
                        </div>
                    </div>
                    <div>
                        <p className="tittleContact">
                            <b>Redes sociais</b>
                        </p>
                        <div className="row redFilter mb-1" id="facebookBox">
                            {facebookIcon}
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
                        <div className="row redFilter mb-1" id="instagramBox">
                            {instagramIcon}
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
                        <div className="row redFilter mb-1">
                            <p>
                                <a href="#">Política de Privacidade</a>
                            </p>
                        </div>
                        <div className="row redFilter mb-1">
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
