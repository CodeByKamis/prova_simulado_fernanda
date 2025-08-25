import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//validação de formulário 
const schemaCadUsuario = z.object({
    nome: z.string()
        .min(1,'Insira ao máximo 1 caractere')
        .max(100, 'Insira até 100 caracteres'),
    email: z.string()
        .min(3, 'Insira ao máximo 3 caracteres')
        .max(100, 'Insira ao máximo 100 caracteres')
        .email("Formato de email inválido"),
})

export function CadUsuario(){
    return(
        <form>
            <h2>Cadastro de Usuário</h2>
            <label>Nome: </label>
            <input type="text" placeholder='Escreva o seu nome aqui' required/>


            <label>E-mail: </label>
            <input type="email" placeholder='Escreva o seu email aqui' required/>

            <button type='submit'>Cadastrar</button>
        </form>

        
    )
}