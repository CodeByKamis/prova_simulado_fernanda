import { Routes, Route} from 'react-router-dom';
import { Inicial } from '../Paginas/Inicial';
import { Quadro } from '../Componentes/Quadro';
import { CadUsuario } from '../Paginas/CadUsuario';
import { CadTarefa } from '../Paginas/CadTarefa.jsx';
export function Rotas(){
    return(
        <Routes>
            <Route path = '/' element={<Inicial/>}>
                <Route index element={<Quadro/>}/>
                <Route path='cadUsuario' element={<CadUsuario/>}/>
                <Route path='cadTarefas' element={<CadTarefa/>}/>
            </Route>
        </Routes>
    )
}