export default function StatCard({ titulo, valor, descricao, cor }) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-md border-l-4 ${cor}`}>
      <h2 className="text-gray-500 font-semibold">{titulo}</h2>

      <p className="text-4xl font-bold mt-2">{valor}</p>

      <span className="text-sm text-gray-400">{descricao}</span>
    </div>
  );
}
