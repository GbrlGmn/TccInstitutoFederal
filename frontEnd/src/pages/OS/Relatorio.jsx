import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import {
  BarraBuscaFiltro,
  FichaCard,
  PainelLateral,
  ModalExclusao,
} from "../../components/Relatorios";
import {
  listarOS,
  atualizarOS,
  deletarOS,
} from "../../services/api/CadastrarOS";

const OPCOES_STATUS = [
  { valor: "ORCAMENTO", rotulo: "Orçamento" },
  { valor: "EM_ANDAMENTO", rotulo: "Em andamento" },
  { valor: "FINALIZADA", rotulo: "Finalizada" },
  { valor: "CANCELADA", rotulo: "Cancelada" },
];

const VARIANTES_STATUS = {
  ORCAMENTO: "text-yellow-700 bg-yellow-100",
  EM_ANDAMENTO: "text-blue-700 bg-blue-100",
  FINALIZADA: "text-green-700 bg-green-100",
  CANCELADA: "text-red-900 bg-red-100",
};

function formatarStatus(status) {
  const opcao = OPCOES_STATUS.find((item) => item.valor === status);

  return opcao ? opcao.rotulo : status;
}

function formatarData(data) {
  if (!data) return "-";

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

function formatarValor(valor) {
  if (valor === null || valor === undefined) return "-";

  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function RelatorioOS() {
  const [ordensServico, setOrdensServico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [painel, setPainel] = useState({
    aberto: false,
    modo: "ver",
    os: null,
  });

  const [osParaExcluir, setOsParaExcluir] = useState(null);

  useEffect(() => {
    async function carregarOS() {
      try {
        setCarregando(true);

        const dados = await listarOS();

        setOrdensServico(dados);
        setErro(null);
      } catch (erro) {
        console.error(erro);
        setErro("Erro ao carregar ordens de serviço.");
      } finally {
        setCarregando(false);
      }
    }

    carregarOS();
  }, []);

  const ordensFiltradas = useMemo(() => {
    const texto = busca.toLowerCase().trim();

    return ordensServico.filter((os) => {
      const correspondeBusca =
        String(os.id).includes(texto) ||
        os.cliente?.nome?.toLowerCase().includes(texto) ||
        os.funcionario?.nome?.toLowerCase().includes(texto);

      const correspondeStatus =
        filtroStatus === "todos" || os.status === filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }, [ordensServico, busca, filtroStatus]);

  function abrirVisualizacao(os) {
    setPainel({
      aberto: true,
      modo: "ver",
      os,
    });
  }

  function abrirEdicao(os) {
    setPainel({
      aberto: true,
      modo: "editar",
      os,
    });
  }

  function fecharPainel() {
    setPainel({
      aberto: false,
      modo: "ver",
      os: null,
    });
  }

  async function salvarAlteracoes(e) {
    e.preventDefault();

    const formulario = new FormData(e.currentTarget);

    const dadosAtualizados = {
      ...painel.os,
      dataAbertura: formulario.get("dataAbertura"),
      dataFechamento: formulario.get("dataFechamento") || null,
      valorOrdemServico: formulario.get("valorOrdemServico"),
      porcentagem: formulario.get("porcentagem"),
      status: formulario.get("status"),
    };

    try {
      const atualizada = await atualizarOS(painel.os.id, dadosAtualizados);

      setOrdensServico((lista) =>
        lista.map((os) => (os.id === painel.os.id ? atualizada : os)),
      );

      fecharPainel();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao atualizar ordem de serviço.");
    }
  }

  async function confirmarExclusao() {
    if (!osParaExcluir) return;

    try {
      await deletarOS(osParaExcluir.id);

      setOrdensServico((lista) =>
        lista.filter((os) => os.id !== osParaExcluir.id),
      );

      setOsParaExcluir(null);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao excluir ordem de serviço.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Ordens de Serviço
            </h1>

            <p className="text-sm text-gray-500">
              Consulte e gerencie as ordens de serviço.
            </p>
          </div>

          <Link
            to="/ordemServico"
            className="flex items-center gap-2 rounded-lg bg-red-900 px-4 py-2 font-bold text-white hover:bg-red-800"
          >
            <Plus size={18} />
            Nova OS
          </Link>
        </div>

        <div className="mb-6">
          <BarraBuscaFiltro
            busca={busca}
            onBuscaChange={setBusca}
            placeholder="Buscar por ID, cliente ou funcionário"
            filtroAtivo={filtroStatus}
            onFiltroChange={setFiltroStatus}
            opcoesFiltro={[
              "todos",
              "ORCAMENTO",
              "EM_ANDAMENTO",
              "FINALIZADA",
              "CANCELADA",
            ]}
          />
        </div>

        {carregando && (
          <p className="text-sm text-gray-500">
            Carregando ordens de serviço...
          </p>
        )}

        {erro && <p className="text-sm text-red-700">{erro}</p>}

        {!carregando && !erro && (
          <div className="space-y-3">
            {ordensFiltradas.length === 0 ? (
              <p className="rounded-lg border bg-white p-6 text-center text-gray-500">
                Nenhuma ordem de serviço encontrada.
              </p>
            ) : (
              ordensFiltradas.map((os) => (
                <FichaCard
                  key={os.id}
                  id={os.id}
                  status={formatarStatus(os.status)}
                  titulo={
                    os.cliente?.nome
                      ? `Cliente: ${os.cliente.nome}`
                      : "Cliente não informado"
                  }
                  subtitulo={
                    os.funcionario?.nome
                      ? `Funcionário: ${os.funcionario.nome}`
                      : "Funcionário não informado"
                  }
                  meta={`Abertura: ${formatarData(
                    os.dataAbertura,
                  )} • Valor: ${formatarValor(os.valorOrdemServico)}`}
                  variantesSelo={{
                    Orçamento: VARIANTES_STATUS.ORCAMENTO,
                    "Em andamento": VARIANTES_STATUS.EM_ANDAMENTO,
                    Finalizada: VARIANTES_STATUS.FINALIZADA,
                    Cancelada: VARIANTES_STATUS.CANCELADA,
                  }}
                  onVer={() => abrirVisualizacao(os)}
                  onEditar={() => abrirEdicao(os)}
                  onExcluir={() => setOsParaExcluir(os)}
                />
              ))
            )}
          </div>
        )}

        <PainelLateral
          aberto={painel.aberto}
          modo={painel.modo}
          idLabel={painel.os ? `OS #${painel.os.id}` : "Ordem de Serviço"}
          titulo={painel.os?.cliente?.nome || "Ordem de Serviço"}
          campos={
            painel.os
              ? [
                  {
                    label: "Cliente",
                    valor: painel.os.cliente?.nome || "-",
                    name: "cliente",
                  },
                  {
                    label: "Funcionário",
                    valor: painel.os.funcionario?.nome || "-",
                    name: "funcionario",
                  },
                  {
                    label: "Data de abertura",
                    valor: painel.os.dataAbertura || "",
                    name: "dataAbertura",
                    obrigatorio: true,
                  },
                  {
                    label: "Data de fechamento",
                    valor: painel.os.dataFechamento || "",
                    name: "dataFechamento",
                  },
                  {
                    label: "Valor da OS",
                    valor: painel.os.valorOrdemServico || "",
                    name: "valorOrdemServico",
                    obrigatorio: true,
                  },
                  {
                    label: "Porcentagem",
                    valor: painel.os.porcentagem || "",
                    name: "porcentagem",
                  },
                ]
              : []
          }
          campoStatus="status"
          valorStatus={painel.os?.status || "ORCAMENTO"}
          opcoesStatus={OPCOES_STATUS}
          variantesSelo={{
            ORCAMENTO: VARIANTES_STATUS.ORCAMENTO,
            EM_ANDAMENTO: VARIANTES_STATUS.EM_ANDAMENTO,
            FINALIZADA: VARIANTES_STATUS.FINALIZADA,
            CANCELADA: VARIANTES_STATUS.CANCELADA,
          }}
          onFechar={fecharPainel}
          onSalvar={salvarAlteracoes}
        />

        <ModalExclusao
          item={osParaExcluir}
          entidade="ordem de serviço"
          nomeExibido={osParaExcluir ? `OS #${osParaExcluir.id}` : ""}
          onCancelar={() => setOsParaExcluir(null)}
          onConfirmar={confirmarExclusao}
        />
      </main>
    </div>
  );
}
