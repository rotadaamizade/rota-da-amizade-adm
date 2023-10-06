import './App.css'
import Header from './components/header/header'
import MunicipiosCasdastro from './screens/municipiosCadastro/municipiosCadastro'
import Municipios from './screens/municipios/municipios'
import MunicipiosEditar from './screens/municipiosEditar/municipiosEditar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const maintenance = false

  if(maintenance){
    return (
      <div className="App">
        <h1>Site is under maintenance</h1>
        <p>Please come back later</p>
      </div>
    )
  }

  return (
    <div className="App">
      
    <BrowserRouter>
      <Header/>
      <main>
      <Routes>
        <Route path='/municipios/cadastro' element={<MunicipiosCasdastro/>}/>
        <Route path='/municipios' element={<Municipios/>}/>
        <Route path='/municipios/editar/:id' element={<MunicipiosEditar/>}/>
      </Routes>
      </main>
    </BrowserRouter>
    </div>
  )
}

export default App