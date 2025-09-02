import axios from 'axios'; //é o hook que faz a comunicação com a internet (http)
//são hooks que permite a validação de interação com o usuário... Nunca dúvide da capacidade do usuário :)
//ZOD É DO REACT - é comum usar ele no react
import { useForm } from 'react-hook-form'; //hook (use) aqui permite a validação de formulário
import { z } from 'zod'; //zod é uma validação de como eu vou valida, quais seriam as regras
import { zodResolver } from '@hookform/resolvers/zod'; //é o que liga o hook form com o zod
//validação de formulário

//validação de formulário - estou usando as regras do zod que pode ser consultada na web
const schemaCadUsuario = z.object({
    nome: z.string()
        .min(1,'Insira ao menos 1 caractere')
        .max(30, 'Insira até 30 caracteres')
        .regex(
            /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
            "Digite nome completo (nome e sobrenome), sem números ou símbolos, sem espaços no início/fim"
        ),
    email:z.string()
        .min(1, 'Insira seu email')
        .max(30, 'Insira um endereço de email com até 30 carateres')
        .email("Formato de email invalido")
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Formato de email inválido"
        ),
})
 
 
export function CadUsuario(){

    const{
        register, //registra o que o usuário faz
        handleSubmit, //no momento em que ele der um submit (botão), 
        formState:{ errors }, //no formulário, se der ruim, guarda os erros na variável errors
        reset,
        setValue
    }=useForm({
        resolver: zodResolver(schemaCadUsuario) //ele vai validar as coisas que estão acontecendo e entrando
    });
     // Tratamento para o campo nome (apenas para prevenir entrada inválida antes do submit)
    const handleNomeChange = (e) => {
        let valor = e.target.value;
        valor = valor.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]+/g, ""); // só letras e espaço
        valor = valor.replace(/\s{2,}/g, " "); // evita espaços duplos
        if (valor.length > 30) valor = valor.slice(0, 30); // máximo 30 chars
        setValue("nome", valor);
    };


    // Tratamento para o campo email
    const handleEmailChange = (e) => {
        let valor = e.target.value.trim();
        if (valor.length > 50) valor = valor.slice(0, 50); // máximo 50 chars
        setValue("email", valor);
    };


    //para grande parte das interações com outra plataforma é necessário usar o try
    async function obterdados(data){
        console.log('dados informados pelo user: ', data) //ele serve para ver se as coisas que o usuário inseriu estão rodando bem
    
        try{
            await axios.post("http://127.0.0.1:8000/api/usuario/", data);
            alert("Usuário cadastrado com sucesso");
            reset();//limpar o formulário depois do cadastro
        }catch(error){//mostra a mensagem de erro e guarda o erro
            alert("Algo deu errado, tente novamente");
            console.log("Erros", error);
        }
    }

    return(
        <form className="formularios" onSubmit={handleSubmit(obterdados)}>
            <h2>Cadastro do Usuário</h2>
 
            <label>Nome:</label>
            <input type='text' placeholder='Jose da Silva' {...register("nome")}onChange={handleNomeChange}/>
            {/* usa "required" se quiser nos dois campos de input depois do '' */}
            {/* vvvv aqui eu vejo a variavel errors no campo nome e exibo a mensagem para o usuário vvvv */}
            {errors.nome && <p>{errors.nome.message}</p>}

            

            <label>E-mail</label>
            <input type='email' placeholder='email@email.com' {...register("email")} onChange={handleEmailChange}/>
            {/* vvvv aqui eu vejo a variavel errors no campo email e exibo a mensagem para o usuário vvvv */}
            {errors.email && <p>{errors.email.message}</p>}
 
            <button type='submit'>Cadastrar</button>
 
        </form>
    )
}