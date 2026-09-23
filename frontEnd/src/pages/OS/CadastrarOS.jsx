import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Formularios from "../../components/Formularios";
import { cadastrarOS } from "../../services/api/CadastrarOS";
import { listarClientesAtivos } from "../../services/api/RelatorioCliente";
import { listarFuncionariosAtivos } from "../../services/api/RelatorioFuncionario";
import { listarServicos } from "../../services/api/Servico";

export default function CadastrarOS() {
  const [cliente, setCliente] = useState("");
  const [clientes, setClientes] = useState([]);
  const [funcionario, setFuncionario] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const [servico, setServico] = useState("");
  const [servicos, setServicos] = useState([]);
  const [dataAbertura, setDataAbertura] = useState("");
  const [dataPrevistaTermino, setDataPrevistaTermino] = useState("");
  const [valorOrdemServico, setValorOrdemServico] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosClientes = await listarClientesAtivos();
        setClientes(dadosClientes);

        const dadosFuncionarios = await listarFuncionariosAtivos();
        setFuncionarios(dadosFuncionarios);

        const dadosServicos = await listarServicos();
        setServicos(dadosServicos);
      } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar dados");
      }
    }

    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await cadastrarOS({
      cliente,
      funcionario,
      servico,
      dataAbertura,
      dataPrevistaTermino: dataPrevistaTermino || null,
      valorOrdemServico,
      status,
    });

    if (resultado.ok) {
      alert("Ordem de serviço cadastrada com sucesso!");

      setCliente("");
      setFuncionario("");
      setServico("");
      setDataAbertura("");
      setDataPrevistaTermino("");
      setValorOrdemServico("");
      setStatus("");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex justify-center items-center p-6">
        <Formularios
          titulo="Cadastro de Ordem de Serviço"
          onSubmit={handleSubmit}
          tituloClassName="text-red-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Cliente</label>

              <select
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              >
                <option value="">Selecione um cliente</option>

                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Funcionário responsável</label>

              <select
                value={funcionario}
                onChange={(e) => setFuncionario(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              >
                <option value="">Selecione um funcionário</option>

                {funcionarios.map((funcionario) => (
                  <option key={funcionario.id} value={funcionario.id}>
                    {funcionario.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              {" "}
              <label>Serviço</label>{" "}
              <select
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              >
                {" "}
                <option value=""> Selecione um serviço </option>{" "}
                {servicos.map((servico) => (
                  <option key={servico.id} value={servico.id}>
                    {" "}
                    {servico.nome}{" "}
                  </option>
                ))}{" "}
              </select>{" "}
            </div>

            <div>
              <label>Data de abertura</label>

              <input
                type="date"
                value={dataAbertura}
                onChange={(e) => setDataAbertura(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label>Data prevista de término</label>

              <input
                type="date"
                value={dataPrevistaTermino}
                onChange={(e) => setDataPrevistaTermino(e.target.value)}
                className="w-full border rounded-lg p-2"
                obrigatorio:false
              />
            </div>

            <div>
              <label>Valor total da OS</label>

              <input
                type="number"
                step="0.01"
                value={valorOrdemServico}
                onChange={(e) => setValorOrdemServico(e.target.value)}
                className="w-full border rounded-lg p-2"
                placeholder="Ex.: 1500.00"
                required
              />
            </div>

            <div>
              <label>Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              >
                <option value="">Selecione o status</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="CONCLUIDO">Concluído</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
            </div>
          </div>
        </Formularios>
      </div>
    </div>
  );
}
