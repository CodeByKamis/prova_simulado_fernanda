import './Styles/main.scss';
// import { Inicial } from './Paginas/Inicial';
import { BrowserRouter } from 'react-router-dom';
import { Rotas } from './Rotas/Rotas';

function App() {
  return (
    <BrowserRouter>
      <Rotas/>
    </BrowserRouter>

  )
}

export default App
