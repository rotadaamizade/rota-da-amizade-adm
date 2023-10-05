import './App.css'
import Header from './components/header/header'
import Municipios from './screens/municipios/municipios'
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
        <Route path='/municipios' element={<Municipios/>}/>
      </Routes>
      </main>
    </BrowserRouter>
    </div>
  )
}

export default App