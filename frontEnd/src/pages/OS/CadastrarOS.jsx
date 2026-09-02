import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Formularios from "../../components/Formularios";
import { cadastrarOS } from "../../services/api/CadastrarOS";

export default function Cadastro() {
  const [dataAbertura, setDataAbertura] = useState("");
  const [dataFechamento, setDataFechamento] = useState("");
  const [valorOrdemServico, setValorOrdemServico] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await cadastrarOS({
      dataAbertura,
      dataFechamento,
      valorOrdemServico,
      status,
    });

    if (resultado.ok) {
      alert("Serviço cadastrado com sucesso!");

      setDataAbertura("");
      setDataFechamento("");
      setValorOrdemServico("");
      setStatus("");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className=" flex-1 flex justify-center items-center p-1">
        <Formularios
          titulo="Cadastro de Ordem de Serviço"
          onSubmit={handleSubmit}
          tituloClassName="text-red-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label>Data de Abertura</label>
              <input
                type="date"
                value={dataAbertura}
                onChange={(e) => setDataAbertura(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label>Data de Fechamento</label>
              <input
                type="date"
                value={dataFechamento}
                onChange={(e) => setDataFechamento(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label>Valor da Ordem de Serviço</label>
              <input
                type="text"
                value={valorOrdemServico}
                onChange={(e) => setValorOrdemServico(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>


            <div>
              <label>Status </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              >
                <option>-</option>
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>
          </div>
        </Formularios>
      </div>
    </div>
  );
}
