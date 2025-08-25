import { Link } from 'react-router-dom';
export function BarraNavegacao(){
    return(
        <nav className="barra">
            <ul className="link">
                <Link to ='cadUsuario'>
                    <li>Cadastro de Usuário</li>
                </Link>
                <Link to="/cadTarefas">
                    <li>Cadastro de Tarefa</li>
                </Link>
                <Link to="/" >
                    <li>Gerenciamento de Tarefas</li>
                </Link>
            </ul>
        </nav>
    )
}