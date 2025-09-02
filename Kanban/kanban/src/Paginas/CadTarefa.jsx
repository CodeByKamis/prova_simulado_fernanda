import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema de validação Zod alinhado com o backend
const schemaCadTarefa = z.object({
  nome: z.string()
    .trim()
    .min(1, 'Insira ao menos 1 caractere')
    .max(30, 'Insira até 30 caracteres'),
  descricao: z.string()
    .trim()
    .min(1, 'Insira ao menos 1 caractere')
    .max(100, 'Insira até 100 caracteres'),
  nomeSetor: z.string()
    .trim()
    .min(1, 'Insira ao menos 1 caractere')
    .max(30, 'Insira até 30 caracteres')
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Apenas letras são permitidas no setor'),
  prioridade: z.enum(['B', 'M', 'A'], { errorMap: () => ({ message: 'Prioridade inválida' }) }),
  status: z.enum(['A', 'F', 'P'], { errorMap: () => ({ message: 'Status inválido' }) }),
  usuario: z.number().int().positive('ID do usuário inválido'),
});

export function CadTarefa() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(schemaCadTarefa)
  });

  // Bloqueia números e espaços duplos no campo "nomeSetor"
  const handleSetorChange = (e) => {
    let valor = e.target.value;
    valor = valor.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
    valor = valor.replace(/\s{2,}/g, ' ');
    if (valor.length > 30) valor = valor.slice(0, 30);
    setValue('nomeSetor', valor);
  };

  const handleDescricaoChange = (e) => {
    let valor = e.target.value;
    valor = valor.replace(/\s{2,}/g, ' ');
    if (valor.length > 100) valor = valor.slice(0, 100);
    setValue('descricao', valor);
  };

  const handleNomeChange = (e) => {
    let valor = e.target.value;
    valor = valor.replace(/\s{2,}/g, ' ');
    if (valor.length > 100) valor = valor.slice(0, 100);
    setValue('nome', valor);
  };
  async function obterdados(data) {
    console.log('Dados informados:', data);
    try {
      await axios.post('http://127.0.0.1:8000/api/tarefa/', data);
      alert('Tarefa cadastrada com sucesso');
      reset();
    } catch (error) {
      alert('Algo deu errado, tente novamente');
      console.error('Erro:', error);
      console.log('Erro detalhado:', error.response?.data); // 💡 veja a resposta do backend aqui
    }
  }

  return (
    <form className="formularios" onSubmit={handleSubmit(obterdados)}>
      <h2>Cadastro de Tarefa</h2>

      <label>Nome:</label>
      <input type="text" placeholder="Nome da tarefa" {...register('nome')} onChange={handleNomeChange} />
      {errors.nome && <p>{errors.nome.message}</p>}

      <label>Descrição:</label>
      <input type="text" placeholder="Descrição da tarefa" {...register('descricao')} onChange={handleDescricaoChange} />
      {errors.descricao && <p>{errors.descricao.message}</p>}

      <label>Setor:</label>
      <input type="text" placeholder="Nome do setor" {...register('nomeSetor')} onChange={handleSetorChange} />
      {errors.nomeSetor && <p>{errors.nomeSetor.message}</p>}

      <label>Prioridade:</label>
      <select {...register('prioridade')}>
        <option value="B">Baixa</option>
        <option value="M">Média</option>
        <option value="A">Alta</option>
      </select>
      {errors.prioridade && <p>{errors.prioridade.message}</p>}

      <label>Status:</label>
      <select {...register('status')} readonly="readonly">
        <option value="A">A fazer</option>
        <option value="F">Fazendo</option>
        <option value="P">Pronto</option>
      </select>
      {errors.status && <p>{errors.status.message}</p>}

      <label>ID do Usuário:</label>
      <input type="number" placeholder="ID do usuário" {...register('usuario', { valueAsNumber: true })} />
      {errors.usuario && <p>{errors.usuario.message}</p>}

      <button type="submit">Cadastrar</button>
    </form>
  );
}
