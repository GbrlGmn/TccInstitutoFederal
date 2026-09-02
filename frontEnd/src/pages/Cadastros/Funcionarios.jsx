import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Formularios from "../../components/Formularios";
import { cadastrarFuncionarios } from "../../services/api/Funcionarios";
export default function Funcionarios() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [dataDemissao, setDataDemissao] = useState("");
  const [salario, setSalario] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await cadastrarFuncionarios({
      nome,
      endereco,
      dataNasc: dataNascimento,
      telefone,
      cargo,
      dataAdmissao,
      dataDemissao: dataDemissao || null,
      salario,
      status: status === "ativo",
    });

    if (resultado.ok) {
      alert("Funcionário cadastrado com sucesso!");

      setNome("");
      setEndereco("");
      setDataNascimento("");
      setTelefone("");
      setCargo("");
      setDataAdmissao("");
      setDataDemissao("");
      setSalario("");
      setStatus("");
    } else {
      alert("Erro ao cadastrar funcionário");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className=" flex-1 flex justify-center items-center p-1">
        <Formularios
          titulo="Cadastro de Funcionário"
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
            <div className="md:col-span-2">
              <label>Endereço</label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>
            <div className="md:col-span-2">
              <label>Data de Nascimento</label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>

            <div>
              <label>Telefone</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>
            <div>
              <label>Cargo</label>
              <input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>
            <div>
              <label>Data de Admissão</label>
              <input
                type="date"
                value={dataAdmissao}
                onChange={(e) => setDataAdmissao(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>
            <div>
              <label>Data de Demissão</label>
              <input
                type="date"
                value={dataDemissao}
                onChange={(e) => setDataDemissao(e.target.value)}
                className="w-full border rounded-lg p-2"
                obrigatorio:false
              />
            </div>

            <div>
              <label>Salário</label>
              <input
                type="number"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                min="0"
                step="0.01"
                className="w-full border rounded-lg p-2"
                required={true}
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
