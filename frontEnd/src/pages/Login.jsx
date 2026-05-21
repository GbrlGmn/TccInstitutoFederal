import background from "../assets/sspaco-logo-branca.png";
import logo from "../assets/sspaco-fundo.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const response = await login(usuario, senha);

    if (response.ok) {
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } else {
      alert(response.message);
    }
  }

  return (
    <div
      className="h-screen flex items-center justify-center relative bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "auto" }}
    >
      <div className="absolute w-screen h-screen bg-black/20"></div>

      <div className="relative bg-gray-100 p-10 rounded-xl text-center shadow-lg w-90">
        <img
          src={logo}
          alt="Logo SS Paco"
          className="w-24 h-24 mx-auto mb-4 rounded shadow-md"
        />

        <h2 className="mb-4 text-[#8b0000] font-semibold text-xl">
          Login de Acesso
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Usuário"
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <button
            type="submit"
            className="w-[85%] mx-auto mt-2 p-3 bg-red-900 text-white rounded-lg font-bold hover:bg-red-800 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
