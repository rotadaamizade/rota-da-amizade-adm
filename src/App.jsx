import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { PageProvider } from "./useContext";
import "./css/Normalize.css";
import "./css/Style.css";
import Home from "./screens/Home/Home";
import AboutUs from "./screens/AboutUs/AboutUs";
import Cities from "./screens/Cities/Cities";
import Contact from "./screens/Contact/Contact";
import Associates from "./screens/Associates/Associates";
import Header from "./components/Header/Header";
import City from "./screens/City/City";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageProvider>
          <Header />
          <main>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/sobre" element={<AboutUs />} />
              <Route path="/cidades" element={<Cities />} />
              <Route path="/associados" element={<Associates />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/cidades/:url" element={<City />} />
              <Route path="*" element={<Navigate to="" />} />
            </Routes>
          </main>
          <Footer />
        </PageProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
