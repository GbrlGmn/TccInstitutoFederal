import background from "../assets/sspaco-logo-branca.png";
import logo from "../assets/sspaco-fundo.jpg";

export default function Login() {
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
          className="w-22.5 h-22.5 mx-auto mb-4 rounded shadow-md"
        />

        <h2 className="mb-4 text-[#8b0000] font-semibold text-xl">
          Login de Acesso
        </h2>

        <form className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Usuário"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          <input
            type="password"
            placeholder="Senha"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="w-[85%] mx-auto mt-2 p-3 bg-[#8b0000] text-white rounded-lg font-bold hover:bg-red-900 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
