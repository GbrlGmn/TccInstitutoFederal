import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import MateriaisOrcamento from "../components/MateriaisOrcamento";
import ResumoOrcamento from "../components/ResumoOrcamento";
import Formularios from "../components/Formularios";
import {
  listarClientesAtivos,
  listarFuncionariosAtivos,
  cadastrarOrcamento,
} from "../services/api/Orcamento";

export default function Orcamentos() {
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [cliente, setCliente] = useState("");
  const [funcionario, setFuncionario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [medidas, setMedidas] = useState("");
  const [materiais, setMateriais] = useState([]);
  const [valorServico, setValorServico] = useState("");
  const [status, setStatus] = useState("PENDENTE");
  const [enviando, setEnviando] = useState(false);

  const [buscaCliente, setBuscaCliente] = useState("");
  const [mostrarListaCliente, setMostrarListaCliente] = useState(false);
  const clienteWrapperRef = useRef(null);
  
  const [buscaFuncionario, setBuscaFuncionario] = useState("");
  const [mostrarListaFuncionario, setMostrarListaFuncionario] = useState(false);
  const funcionarioWrapperRef = useRef(null);

  useEffect(() => {
    listarClientesAtivos()
      .then(setClientes)
      .catch(() => setClientes([]));

    listarFuncionariosAtivos()
      .then(setFuncionarios)
      .catch(() => setFuncionarios([]));
  }, []);

  // fecha as listas ao clicar fora
  useEffect(() => {
    function handleClickFora(e) {
      if (
        clienteWrapperRef.current &&
        !clienteWrapperRef.current.contains(e.target)
      ) {
        setMostrarListaCliente(false);
      }
      if (
        funcionarioWrapperRef.current &&
        !funcionarioWrapperRef.current.contains(e.target)
      ) {
        setMostrarListaFuncionario(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const clientesFiltrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(buscaCliente.toLowerCase()),
  );

  const funcionariosFiltrados = funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(buscaFuncionario.toLowerCase()),
  );

  function selecionarCliente(c) {
    setCliente(String(c.id));
    setBuscaCliente(c.nome);
    setMostrarListaCliente(false);
  }

  function limparCliente() {
    setCliente("");
    setBuscaCliente("");
  }

  function selecionarFuncionario(f) {
    setFuncionario(String(f.id));
    setBuscaFuncionario(f.nome);
    setMostrarListaFuncionario(false);
  }

  function limparFuncionario() {
    setFuncionario("");
    setBuscaFuncionario("");
  }

  const totalMateriais = materiais.reduce(
    (total, m) => total + m.quantidade * m.valorUnitario,
    0,
  );

  const valorTotal = totalMateriais + (Number(valorServico) || 0);

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);

    const payload = {
      clienteId: Number(cliente),
      funcionarioId: Number(funcionario),
      valorOrdemServico: totalMateriais,
      porcentagem:
        valorServico && totalMateriais
          ? ((Number(valorServico) / totalMateriais) * 100).toFixed(2)
          : 0,
      statusOrdemServico: "ORCAMENTO",
    };

    const resultado = await cadastrarOrcamento(payload);

    setEnviando(false);

    if (resultado.ok) {
      alert("Orçamento salvo com sucesso!");

      setCliente("");
      setBuscaCliente("");
      setFuncionario("");
      setBuscaFuncionario("");
      setDescricao("");
      setMedidas("");
      setMateriais([]);
      setValorServico("");
      setStatus("PENDENTE");
    } else {
      alert("Não foi possível salvar o orçamento.");

      console.log("ORÇAMENTO:", {
        ...payload,
        descricao,
        medidas,
        materiais,
        status,
      });
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 flex justify-center p-6">
        <Formularios
          titulo="Cadastro de Orçamento"
          onSubmit={handleSubmit}
          tituloClassName="text-red-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cliente */}
            <div className="relative" ref={clienteWrapperRef}>
              <label>Cliente *</label>

              <input
                type="text"
                value={buscaCliente}
                onChange={(e) => {
                  setBuscaCliente(e.target.value);
                  setCliente("");
                  setMostrarListaCliente(true);
                }}
                onFocus={() => setMostrarListaCliente(true)}
                placeholder="Digite para pesquisar o cliente..."
                className="w-full border rounded-lg p-2"
                autoComplete="off"
                required={!cliente}
              />

              <input
                type="text"
                value={cliente}
                onChange={() => {}}
                required
                tabIndex={-1}
                className="sr-only"
              />

              {buscaCliente && (
                <button
                  type="button"
                  onClick={limparCliente}
                  className="absolute right-2 top-9 text-gray-400 hover:text-gray-600"
                  aria-label="Limpar cliente"
                >
                  ×
                </button>
              )}

              {mostrarListaCliente && (
                <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-56 overflow-auto shadow-lg">
                  {clientesFiltrados.length > 0 ? (
                    clientesFiltrados.map((c) => (
                      <li
                        key={c.id}
                        onClick={() => selecionarCliente(c)}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          String(c.id) === cliente
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {c.nome}
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-400">
                      Nenhum cliente encontrado
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Funcionário */}
            <div className="relative" ref={funcionarioWrapperRef}>
              <label>Funcionário</label>

              <input
                type="text"
                value={buscaFuncionario}
                onChange={(e) => {
                  setBuscaFuncionario(e.target.value);
                  setFuncionario("");
                  setMostrarListaFuncionario(true);
                }}
                onFocus={() => setMostrarListaFuncionario(true)}
                placeholder="Digite para pesquisar o funcionário..."
                className="w-full border rounded-lg p-2"
                autoComplete="off"
              />

              {buscaFuncionario && (
                <button
                  type="button"
                  onClick={limparFuncionario}
                  className="absolute right-2 top-9 text-gray-400 hover:text-gray-600"
                  aria-label="Limpar funcionário"
                >
                  ×
                </button>
              )}

              {mostrarListaFuncionario && (
                <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-56 overflow-auto shadow-lg">
                  {funcionariosFiltrados.length > 0 ? (
                    funcionariosFiltrados.map((f) => (
                      <li
                        key={f.id}
                        onClick={() => selecionarFuncionario(f)}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          String(f.id) === funcionario
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {f.nome}
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-400">
                      Nenhum funcionário encontrado
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div className="md:col-span-2">
              <label>Descrição do serviço *</label>

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full border rounded-lg p-2 min-h-24"
                placeholder="Descreva o serviço solicitado..."
                required
              />
            </div>

            <div className="md:col-span-2">
              <label>Medidas</label>

              <input
                value={medidas}
                onChange={(e) => setMedidas(e.target.value)}
                className="w-full border rounded-lg p-2"
                placeholder="Ex.: 2m x 1,5m"
              />
            </div>

            <MateriaisOrcamento
              materiais={materiais}
              setMateriais={setMateriais}
            />

            <div>
              <label>Valor do serviço</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={valorServico}
                onChange={(e) => setValorServico(e.target.value)}
                className="w-full border rounded-lg p-2"
                placeholder="0,00"
              />
            </div>

            <div>
              <label>Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="PENDENTE">Pendente</option>
                <option value="APROVADO">Aprovado</option>
                <option value="RECUSADO">Recusado</option>
              </select>
            </div>

            <ResumoOrcamento
              totalMateriais={totalMateriais}
              valorServico={valorServico}
              valorTotal={valorTotal}
            />
          </div>
        </Formularios>
      </main>
    </div>
  );
}
