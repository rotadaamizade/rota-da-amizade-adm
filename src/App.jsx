import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { PageContext, PageProvider } from "./useContext";
import "./css/Normalize.css";
import "./css/Style.css";
import whatsAvatarIcon from "./assets/rota-da-amizade-logo-title.png";
import Home from "./screens/Home/Home";
import AboutUs from "./screens/AboutUs/AboutUs";
import Cities from "./screens/Cities/Cities";
import Contact from "./screens/Contact/Contact";
import Associates from "./screens/Associates/Associates";
import Header from "./components/Header/Header";
import City from "./screens/City/City";
import Footer from "./components/Footer/Footer";
import { useContext, useEffect } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { StrictMode } from "react";
import { AnimatePresence } from "framer-motion";

function App() {
  const openWhatsapp = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
    return (
        <>
            <StrictMode>
                <BrowserRouter>
                    <PageProvider>
                        <Header />
                        <AnimatePresence>
                            <main>
                                <Routes>
                                    <Route index element={<Home />} />
                                    <Route
                                        path="/sobre"
                                        element={<AboutUs />}
                                    />
                                    <Route
                                        path="/cidades"
                                        element={<Cities />}
                                    />
                                    <Route
                                        path="/associados"
                                        element={<Associates />}
                                    />
                                    <Route
                                        path="/contato"
                                        element={<Contact />}
                                    />
                                    <Route
                                        path="/cidades/:url"
                                        element={<City />}
                                    />
                                    <Route
                                        path="*"
                                        element={<Navigate to="" />}
                                    />
                                </Routes>
                                <FloatingWhatsApp
                                    // onClick={() => {openWhatsapp("https://api.whatsapp.com/send?phone=1234567890")}}
                                    allowClickAway={true}
                                    avatar={whatsAvatarIcon}
                                    accountName="Rota da Amizade"
                                    chatMessage="Olá como podemos ajudar hoje?"
                                    phoneNumber="1234567890"
                                    statusMessage=""
                                />
                            </main>
                        </AnimatePresence>
                        <Footer />
                    </PageProvider>
                </BrowserRouter>
            </StrictMode>
        </>
    );
}

export default App;
