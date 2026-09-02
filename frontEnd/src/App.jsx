import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/OS/CadastrarOS";
import Clientes from "./pages/Cadastros/Clientes";
import Funcionarios from "./pages/Cadastros/Funcionarios";
import Servico from "./pages/Cadastros/Servico";
import RelatoriosClientes from "./pages/Relatorios/Clientes";
import RelatoriosFuncionarios from "./pages/Relatorios/Funcionarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/cadastrarOS" element={<Cadastro />} />

        {/* Cadastros */}
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/servico" element={<Servico />} />

        {/* Relatórios */}
        <Route path="/relatorios/clientes" element={<RelatoriosClientes />} />
        <Route path="/relatorios/funcionarios" element={<RelatoriosFuncionarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
