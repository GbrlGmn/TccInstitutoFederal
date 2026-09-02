import {
  Home,
  User,
  FileText,
  Package,
  Boxes,
  LogOut,
  BadgeDollarSign,
  Calculator,
  ChevronDown,
  Calendar1Icon,
  Calendar,
  ClipboardListIcon,
  BarChart,
} from "lucide-react";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import background from "../assets/sspaco-logo-branca.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-63 bg-red-900 text-gray-100 flex flex-col items-center p-4 min-h-screen">
      <img src={background} alt="Logo SS Paco" className="w-24 mb-8" />

      <nav className="flex flex-col gap-3 w-full flex-1">
        <Link
          to="/Dashboard"
          className="flex items-center gap-2 p-3 font-bold rounded-md hover:bg-red-800 transition"
        >
          <Home size={20} />
          Início
        </Link>

        <Menu as="div" className="relative w-full">
          <MenuButton className="flex w-full items-center justify-between p-3 font-bold rounded-md hover:bg-red-800 transition">
            <div className="flex items-center gap-2">
              <FileText size={20} />
              Ordens de Serviço
            </div>

            <ChevronDown size={18} />
          </MenuButton>

          <MenuItems className="mt-2 w-full rounded-md bg-red-800 shadow-lg overflow-hidden">
            <MenuItem>
              <Link
                to="/cadastrarOS"
                className="block px-4 py-2 hover:bg-red-700"
              >
                Nova OS
              </Link>
            </MenuItem>

            <MenuItem>
              <Link to="/listarOS" className="block px-4 py-2 hover:bg-red-700">
                Listar OS
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>

        <Link
          to="/orcamentos"
          className="flex items-center gap-2 p-3 font-bold rounded-md hover:bg-red-800 transition"
        >
          <ClipboardListIcon size={20} />
          Orçamentos
        </Link>

        <Link
          to="/recebimentos"
          className="flex items-center gap-2 p-3 font-bold rounded-md hover:bg-red-800 transition"
        >
          <BadgeDollarSign size={20} />
          Recebimentos
        </Link>

        <Menu as="div" className="relative w-full">
          <MenuButton className="flex w-full items-center justify-between p-3 font-bold rounded-md hover:bg-red-800 transition">
            <div className="flex items-center gap-2">
              <User size={20} />
              Cadastros
            </div>

            <ChevronDown size={18} />
          </MenuButton>

          <MenuItems className="mt-2 w-full rounded-md bg-red-800 shadow-lg overflow-hidden">
            <MenuItem>
              <Link to="/clientes" className="block px-4 py-2 hover:bg-red-700">
                Clientes
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                to="/funcionarios"
                className="block px-4 py-2 hover:bg-red-700"
              >
                Funcionários
              </Link>
            </MenuItem>

            <MenuItem>
              <Link to="/servico" className="block px-4 py-2 hover:bg-red-700">
                Serviço
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>

        <Menu as="div" className="relative w-full">
          <MenuButton className="flex w-full items-center justify-between p-3 font-bold rounded-md hover:bg-red-800 transition">
            <div className="flex items-center gap-2">
              <BarChart size={20} />
              Relatórios
            </div>

            <ChevronDown size={18} />
          </MenuButton>

          <MenuItems className="mt-2 w-full rounded-md bg-red-800 shadow-lg overflow-hidden">
            <MenuItem>
              <Link
                to="/relatorios/clientes"
                className="block px-4 py-2 hover:bg-red-700"
              >
                Clientes
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                to="/relatorios/funcionarios"
                className="block px-4 py-2 hover:bg-red-700"
              >
                Funcionários
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                to="/Relatorio Financeiro"
                className="block px-4 py-2 hover:bg-red-700"
              >
                Pagamentos
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>

        <Link
          to="/"
          className="mt-auto flex items-center gap-2 p-3 font-bold rounded-md hover:bg-red-800 transition"
        >
          <LogOut size={20} />
          Sair
        </Link>
      </nav>
    </aside>
  );
}
