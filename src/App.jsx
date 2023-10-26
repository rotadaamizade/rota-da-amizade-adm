import './App.css';
import Header from './components/header/header';
import MunicipiosCadastro from './screens/municipiosCadastro/municipiosCadastro';
import Municipios from './screens/municipios/municipios';
import MunicipiosEditar from './screens/municipiosEditar/municipiosEditar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './UserContext';
import Login from './screens/login/login';
import { useContext } from 'react';
import RedirectToLogin from './redirects/redirectToLogin';
import RedirectToHome from './redirects/redirectToHome';
import Home from './screens/home/home';
import Categorias from './screens/categorias/categorias';
import CategoriasCadastro from './screens/categoriasCadastro/categoriasCadastro';

function App() {
  const { logged } = useContext(UserContext);
  const maintenance = false;
  console.log(logged);

  if (maintenance) {
    return (
      <div className="App">
        <h1>Site is under maintenance</h1>
        <p>Please come back later</p>
      </div>
    );
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              {logged.status ? (
                <>
                <Route path="/" element={<Home />} />
              <Route path="/municipios/cadastro" element={<MunicipiosCadastro />} />
              <Route path="/municipios" element={<Municipios />} />
              <Route path="/municipios/editar/:id" element={<MunicipiosEditar />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/categorias/cadastro" element={<CategoriasCadastro />} />
              <Route path="*" element={<RedirectToHome />} />
              </>
              ) : (
                <>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<RedirectToLogin />} />
                </>
              )}

            </Routes>
          </main>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
