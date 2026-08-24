import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Formularios from "../../components/Formularios";
import { cadastrarCliente } from "../../services/api/Cliente";

export default function Clientes() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [localTrabalho, setLocalTrabalho] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [ncasa, setNcasa] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [status, setStatus] = useState("ativo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("STATUS:", status);

    const resultado = await cadastrarCliente({
      nome,
      cpf,
      telefone,
      email,
      localTrabalho,
      endereco,
      cidade,
      ncasa,
      uf,
      cep,
      status: status === "ativo",
    });

    if (resultado.ok) {
      alert("Cliente cadastrado com sucesso!");

      setNome("");
      setCpf("");
      setTelefone("");
      setEmail("");
      setLocalTrabalho("");
      setEndereco("");
      setCidade("");
      setNcasa("");
      setUf("");
      setCep("");
      setStatus("");
    } else {
      alert("Erro ao cadastrar cliente");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className=" flex-1 flex justify-center items-center p-1">
        <Formularios
          titulo="Cadastro de Cliente"
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
              <label>CPF</label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="w-full border rounded-lg p-2"
                required
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
              <label>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>

            <div>
              <label>Local de Trabalho</label>
              <input
                type="text"
                value={localTrabalho}
                onChange={(e) => setLocalTrabalho(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
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

            <div>
              <label>Cidade</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>

            <div>
              <label>Número da Casa</label>
              <input
                type="text"
                value={ncasa}
                onChange={(e) => setNcasa(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>

            <div>
              <label> UF</label>
              <input
                type="text"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>

            <div>
              <label>CEP</label>
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              />
            </div>

            <div>
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-2"
                required={true}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
        </Formularios>
      </div>
    </div>
  );
}
