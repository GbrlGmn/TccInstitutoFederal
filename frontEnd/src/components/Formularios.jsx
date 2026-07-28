export default function Formularios({ titulo, children, onSubmit, tituloClassName }) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-5xl bg-white rounded-xl shadow p-8">
      
      <h1 className={`text-2xl font-bold mb-6 ${tituloClassName}`}>
        {titulo}
      </h1>

      {children}

      <div className="flex justify-end gap-3 mt-6">
        <button type="button" className="px-4 py-2 border rounded-lg">
          Cancelar
        </button>

        <button type="submit" className="px-4 py-2 bg-red-900 text-white rounded-lg font-bold hover:bg-red-800 transition">
          Salvar
        </button>
      </div>
    </form>
  );
}