import Formularios from "../components/Formularios";
import Sidebar from "../components/Sidebar";

export default function Clientes() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <Formularios />
      </main>
    </div>
  );
}
