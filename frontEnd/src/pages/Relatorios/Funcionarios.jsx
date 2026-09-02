import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarraBuscaFiltro,
  FichaCard,
  PainelLateral,
  ModalExclusao,
} from "../../components/Relatorios";
import {
  listarFuncionarios,
  patchFuncionario,
  deletarFuncionario,
} from "../../services/api/RelatorioFuncionario";

const OPCOES_STATUS = [
  { valor: "ativo", rotulo: "Ativo" },
  { valor: "inativo", rotulo: "Inativo" },
];

function paraUI(funcionarioBack) {
  return {
    ...funcionarioBack,
    status: funcionarioBack.status ? "ativo" : "inativo",
  };
}
function paraBack(funcionarioUI) {
  return {
    nome: funcionarioUI.nome,
    endereco: funcionarioUI.endereco,
    dataNasc: funcionarioUI.dataNasc,
    telefone: funcionarioUI.telefone,
    cargo: funcionarioUI.cargo,
    dataAdmissao: funcionarioUI.dataAdmissao,
    dataDemicao: funcionarioUI.dataDemissao,
    salario: funcionarioUI.salario,
    status: funcionarioUI.status === "ativo",
  };
}

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [funcionarioParaExcluir, setFuncionarioParaExcluir] = useState(null);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [modoPainel, setModoPainel] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  async function carregarFuncionarios() {
    try {
      setCarregando(true);
      const dados = await listarFuncionarios();
      setFuncionarios(dados.map(paraUI));
      setErro(null);
    } catch (e) {
      setErro("Não foi possível carregar os funcionários.");
    } finally {
      setCarregando(false);
    }
  }

  const listaFiltrada = useMemo(() => {
    return funcionarios.filter((f) => {
      const combinaBusca =
        f.nome.toLowerCase().includes(busca.toLowerCase()) ||
        (f.cargo ?? "").toLowerCase().includes(busca.toLowerCase());
      const combinaStatus =
        filtroStatus === "todos" || f.status === filtroStatus;
      return combinaBusca && combinaStatus;
    });
  }, [funcionarios, busca, filtroStatus]);

  async function confirmarExclusao() {
    const alvo = funcionarioParaExcluir;
    setFuncionarioParaExcluir(null);
    try {
      await deletarFuncionario(alvo.id);
      setFuncionarios((prev) => prev.filter((f) => f.id !== alvo.id));
    } catch (e) {
      setErro("Não foi possível excluir o funcionário.");
    }
  }

  function abrirPainel(funcionario, modo) {
    setFuncionarioSelecionado(funcionario);
    setModoPainel(modo);
  }

  function fecharPainel() {
    setModoPainel(null);
    setFuncionarioSelecionado(null);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const atualizadoUI = {
      ...funcionarioSelecionado,
      nome: form.get("nome"),
      endereco: form.get("endereco"),
      dataNasc: form.get("dataNascimento"),
      telefone: form.get("telefone"),
      cargo: form.get("cargo"),
      dataAdmissao: form.get("dataAdmissao"),
      dataDemissao: form.get("dataDemissao") || null,
      salario: form.get("salario"),
      status: form.get("status"),
    };
    try {
      const resposta = await patchFuncionario(
        atualizadoUI.id,
        paraBack(atualizadoUI),
      );
      setFuncionarios((prev) =>
        prev.map((f) => (f.id === resposta.id ? paraUI(resposta) : f)),
      );
      fecharPainel();
    } catch (e) {
      setErro("Não foi possível salvar as alterações.");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-white p-8 shadow">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="text-2xl font-bold text-red-900">
                Funcionários cadastrados
              </h1>

              <Link
                to="/funcionarios"
                className="flex items-center gap-2 self-start rounded-lg bg-red-900 px-4 py-2 font-bold text-white transition hover:bg-red-800 sm:self-auto"
              >
                <Plus size={16} strokeWidth={2} />
                Novo funcionário
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <BarraBuscaFiltro
              busca={busca}
              onBuscaChange={setBusca}
              placeholder="Buscar por nome ou cargo"
              filtroAtivo={filtroStatus}
              onFiltroChange={setFiltroStatus}
              opcoesFiltro={["todos", "ativo", "inativo"]}
            />
          </div>

          {erro && (
            <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-900">
              {erro}
            </p>
          )}

          <div className="mt-6 space-y-2">
            {carregando && (
              <p className="text-center text-sm text-gray-400">
                Carregando funcionários...
              </p>
            )}

            {!carregando && listaFiltrada.length === 0 && (
              <div className="rounded-lg border border-dashed p-10 text-center">
                <p className="font-bold text-gray-900">
                  Nenhum funcionário encontrado
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Ajuste a busca ou o filtro para ver outras fichas.
                </p>
              </div>
            )}

            {listaFiltrada.map((f) => (
              <FichaCard
                key={f.id}
                id={f.id}
                status={f.status}
                titulo={f.nome}
                subtitulo={f.cargo}
                meta={f.telefone}
                onVer={() => abrirPainel(f, "ver")}
                onEditar={() => abrirPainel(f, "editar")}
                onExcluir={() => setFuncionarioParaExcluir(f)}
              />
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            {listaFiltrada.length} de {funcionarios.length} funcionários
            exibidos
          </p>
        </div>
      </main>

      <PainelLateral
        aberto={!!modoPainel}
        modo={modoPainel}
        idLabel={`Ficha #${funcionarioSelecionado?.id}`}
        titulo={
          modoPainel === "ver"
            ? "Detalhes do funcionário"
            : "Editar funcionário"
        }
        campos={[
          {
            label: "Nome",
            name: "nome",
            valor: funcionarioSelecionado?.nome,
          },
          {
            label: "Endereço",
            name: "endereco",
            valor: funcionarioSelecionado?.endereco,
          },
          {
            label: "Data de Nascimento",
            name: "dataNascimento",
            valor: funcionarioSelecionado?.dataNasc,
          },
          {
            label: "Telefone",
            name: "telefone",
            valor: funcionarioSelecionado?.telefone,
          },
          {
            label: "Cargo",
            name: "cargo",
            valor: funcionarioSelecionado?.cargo,
          },
          {
            label: "Data de Admissão",
            name: "dataAdmissao",
            valor: funcionarioSelecionado?.dataAdmissao,
          },
          {
            label: "Data de Demissão",
            name: "dataDemissao",
            valor: funcionarioSelecionado?.dataDemissao,
          },
          {
            label: "Salário",
            name: "salario",
            valor: funcionarioSelecionado?.salario,
          },
        ]}
        campoStatus="status"
        valorStatus={funcionarioSelecionado?.status}
        opcoesStatus={OPCOES_STATUS}
        onFechar={fecharPainel}
        onSalvar={salvarEdicao}
      />

      <ModalExclusao
        item={funcionarioParaExcluir}
        entidade="funcionário"
        nomeExibido={funcionarioParaExcluir?.nome}
        onCancelar={() => setFuncionarioParaExcluir(null)}
        onConfirmar={confirmarExclusao}
      />
    </div>
  );
}
