import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Orcamentos from "./pages/Orcamentos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orcamentos" element={<Orcamentos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
