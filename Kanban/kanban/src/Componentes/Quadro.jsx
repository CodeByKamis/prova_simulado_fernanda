import React, {useState, useEffect} from "react";
import axios from "axios";
import { Coluna } from "./Coluna";

export function Quadro(){
    const [tarefas, setTarefas] = useState([]);
    //o effect é o hook que permite a renderização de alguma coisa na tela
    //ele é o fofoqueiro do react, ele conta para todo mundo o que o state está armazenando
    //useEffect(() =>{},[]) - parametros, script (algorimot) e por ultimo as dependências = (() =>{},[]) = (parametros =>script,dependências)
    
    useEffect(() =>{
        //construo uma variavel com o endereço da API
        const apiURL = 'http://127.0.0.1:8000/api/tarefa/';
        //AXIOS permite a chamada do enderço 
        axios.get(apiURL)
            //then é se a resposta der bom
            .then(response => {setTarefas(response.data)})
            //catch se de algum problema
            .catch(error => { console.error("Deu ruim hein", error)});

    },[])
    //estou armazenando em variaveis o resultsdo de uma função callback (map, filter e find)que procua com certo status 
    //tarefas é um obj com todas as info armazenadas da tarefa em questao
    const tarefasAfazer = tarefas.filter(tarefas => tarefas.status === 'A fazer' );
    const tarefasFazendo = tarefas.filter(tarefas => tarefas.status === 'Fazendo' );
    const tarefasPronto = tarefas.filter(tarefas => tarefas.status === 'Pronto' );

    return(
        <main className="conteiner">
            <h1>MEU QUADRO</h1>
            <Coluna titulo = "A fazer" tarefas ={tarefasAfazer}/>
             <Coluna titulo = "Fazendo" tarefas ={tarefasFazendo}/>
              <Coluna titulo = "Pronto" tarefas ={tarefasPronto}/>
        </main>
    );
}