import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Formularios from "../../components/Formularios";
import { cadastrarCliente } from "../../services/api/Cliente";

export default function Servico() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [TempoMedio, setTempoMedio] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await cadastrarCliente({
      nome,
      valor,
      TempoMedio,
      status,
    });

    if (resultado.ok) {
      alert("Serviço cadastrado com sucesso!");

      setNome("");
      setValor("");
      setTempoMedio("");
      setStatus("");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className=" flex-1 flex justify-center items-center p-1">
        <Formularios
          titulo="Cadastro de Serviço"
          onSubmit={handleSubmit}
          tituloClassName="text-red-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label>Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label>Valor</label>
              <input
                type="text"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label>Tempo Médio</label>
              <input
                type="text"
                value={TempoMedio}
                onChange={(e) => setTempoMedio(e.target.value)}
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
