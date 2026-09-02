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
  listarClientes,
  atualizarCliente,
  deletarCliente,
} from "../../services/api/RelatorioCliente.js";

const OPCOES_STATUS = [
  { valor: "ativo", rotulo: "Ativo" },
  { valor: "inativo", rotulo: "Inativo" },
];

function paraUI(clienteBack) {
  return {
    ...clienteBack,
    status: clienteBack.status ? "ativo" : "inativo",
  };
}

function paraBack(clienteUI) {
  return {
    ...clienteUI,
    status: clienteUI.status === "ativo",
  };
}

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [clienteParaExcluir, setClienteParaExcluir] = useState(null);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modoPainel, setModoPainel] = useState(null);

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    try {
      setCarregando(true);
      const dados = await listarClientes();
      setClientes(dados.map(paraUI));
      setErro(null);
    } catch (e) {
      setErro("Não foi possível carregar os clientes.");
    } finally {
      setCarregando(false);
    }
  }

  const listaFiltrada = useMemo(() => {
    return clientes.filter((c) => {
      const combinaBusca =
        c.nome.toLowerCase().includes(busca.toLowerCase()) ||
        (c.email ?? "").toLowerCase().includes(busca.toLowerCase());
      const combinaStatus =
        filtroStatus === "todos" || c.status === filtroStatus;
      return combinaBusca && combinaStatus;
    });
  }, [clientes, busca, filtroStatus]);

  async function confirmarExclusao() {
    const alvo = clienteParaExcluir;
    setClienteParaExcluir(null);
    try {
      await deletarCliente(alvo.id);
      setClientes((prev) => prev.filter((c) => c.id !== alvo.id));
    } catch (e) {
      setErro("Não foi possível excluir o cliente.");
    }
  }

  function abrirPainel(cliente, modo) {
    setClienteSelecionado(cliente);
    setModoPainel(modo);
  }

  function fecharPainel() {
    setModoPainel(null);
    setClienteSelecionado(null);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const atualizadoUI = {
      ...clienteSelecionado,
      nome: form.get("nome"),
      cpf: form.get("cpf"),
      telefone: form.get("telefone"),
      email: form.get("email"),
      endereco: form.get("endereco"),
      cidade: form.get("cidade"),
      uf: form.get("uf"),
      cep: form.get("cep"),
      ncasa: form.get("ncasa"),
      status: form.get("status"),
    };
    try {
      const resposta = await atualizarCliente(
        atualizadoUI.id,
        paraBack(atualizadoUI),
      );
      setClientes((prev) =>
        prev.map((c) => (c.id === resposta.id ? paraUI(resposta) : c)),
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
                Clientes cadastrados
              </h1>

              <Link
                to="/clientes"
                className="flex items-center gap-2 self-start rounded-lg bg-red-900 px-4 py-2 font-bold text-white transition hover:bg-red-800 sm:self-auto"
              >
                <Plus size={16} strokeWidth={2} />
                Novo cliente
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <BarraBuscaFiltro
              busca={busca}
              onBuscaChange={setBusca}
              placeholder="Buscar por nome ou email"
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
                Carregando clientes...
              </p>
            )}

            {!carregando && listaFiltrada.length === 0 && (
              <div className="rounded-lg border border-dashed p-10 text-center">
                <p className="font-bold text-gray-900">
                  Nenhum cliente encontrado
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Ajuste a busca ou o filtro para ver outras fichas.
                </p>
              </div>
            )}

            {listaFiltrada.map((c) => (
              <FichaCard
                key={c.id}
                id={c.id}
                status={c.status}
                titulo={c.nome}
                subtitulo={c.email}
                meta={c.cidade}
                onVer={() => abrirPainel(c, "ver")}
                onEditar={() => abrirPainel(c, "editar")}
                onExcluir={() => setClienteParaExcluir(c)}
              />
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            {listaFiltrada.length} de {clientes.length} clientes exibidos
          </p>
        </div>
      </main>

      <PainelLateral
        aberto={!!modoPainel}
        modo={modoPainel}
        idLabel={`Ficha #${clienteSelecionado?.id}`}
        titulo={modoPainel === "ver" ? "Detalhes do cliente" : "Editar cliente"}
        campos={[
          {
            label: "Nome",
            name: "nome",
            valor: clienteSelecionado?.nome,
          },
           {
            label: "CPF",
            name: "cpf",
            valor: clienteSelecionado?.cpf,
          },
          {
            label: "Email",
            name: "email",
            valor: clienteSelecionado?.email,
          },
          {
            label: "Cidade",
            name: "cidade",
            valor: clienteSelecionado?.cidade,
          },
          {
            label: "Telefone",
            name: "telefone",
            valor: clienteSelecionado?.telefone,
          },
          {
            label: "Endereço",
            name: "endereco",
            valor: clienteSelecionado?.endereco,
          },
          {
            label: "UF",
            name: "uf",
            valor: clienteSelecionado?.uf,
          },
          {
            label: "CEP",
            name: "cep",
            valor: clienteSelecionado?.cep,
          },
          {
            label: "Número da Casa",
            name: "ncasa",
            valor: clienteSelecionado?.ncasa,
          },
        ]}
        campoStatus="status"
        valorStatus={clienteSelecionado?.status}
        opcoesStatus={OPCOES_STATUS}
        onFechar={fecharPainel}
        onSalvar={salvarEdicao}
      />

      <ModalExclusao
        item={clienteParaExcluir}
        entidade="cliente"
        nomeExibido={clienteParaExcluir?.nome}
        onCancelar={() => setClienteParaExcluir(null)}
        onConfirmar={confirmarExclusao}
      />
    </div>
  );
}
