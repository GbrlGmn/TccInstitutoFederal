import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Cadastros/Clientes";
import Funcionarios from "./pages/Cadastros/Funcionarios";
import Servico from "./pages/Cadastros/Servico";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/servico" element={<Servico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
