import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-300">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-900">Dashboard</h1>

            <p className="text-gray-600 mt-1">Bem-vindo ao sistema SS PACO</p>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl shadow">
            <p className="text-sm text-gray-500">Hoje</p>

            <p className="font-bold text-red-900">...</p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <StatCard
            titulo="Pedidos em Andamento"
            valor="..."
            descricao="serviços ativos"
            cor="border-red-900"
          />

          <StatCard
            titulo="Orçamentos Pendentes"
            valor="..."
            descricao="aguardando resposta"
            cor="border-yellow-500"
          />

          <StatCard
            titulo="Recebimentos"
            valor="R$ "
            descricao="este mês"
            cor="border-green-600"
          />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-5 bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-red-900">
                Últimos Pedidos
              </h2>

              <button className="text-sm text-red-900 font-bold hover:underline">
                Ver todos
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Cliente</th>
                  <th className="pb-3">Serviço</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-4">João Silva</td>
                  <td>Portão Basculante</td>

                  <td>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Em andamento
                    </span>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-4">Mercado Lima</td>
                  <td>Estrutura metálica</td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Concluído
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4">Ana Costa</td>
                  <td>Corrimão</td>

                  <td>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Atrasado
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
