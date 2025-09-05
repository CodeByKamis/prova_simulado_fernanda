export function Tarefa({tarefa}){
    return(
        //artigo - codigo html que serve ´para detalhamento sobre alguma coisa
        <article>
            <h3 id={`tarefa: ${Tarefa.id}`}>{tarefa.descricao}</h3>
            {/* DL É UMA LISTA DE DETALHES/ DT É O TITULO DE DETALHES/ DD É O DETALHE DO DETALHE */}
            <dl>
                <dt>Setor: </dt>
                <dd>{tarefa.setor}</dd>

                <dt>Prioridades:</dt>
                <dd>{tarefa.prioridade}</dd>
            </dl>
            <button>Editar</button>
            <button>Excluir</button>
            <form>
                <label>Status:</label>
                <select id={tarefa.id} name="status">
                    <option value="">Selecione </option>
                    <option value="A Fazer">A Fazer </option>
                    <option value="Fazendo">Fazendo </option>
                    <option value="Pronto">Pronto </option>
                </select>
                <button>Alterar Status</button>
            </form>
        </article>
    )

}