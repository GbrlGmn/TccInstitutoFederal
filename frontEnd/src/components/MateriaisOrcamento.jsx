import { useState } from "react";

export default function MateriaisOrcamento({
  materiais,
  setMateriais,
}) {
  const [novoMaterial, setNovoMaterial] = useState("");
  const [novaQuantidade, setNovaQuantidade] = useState("");
  const [novoValorMaterial, setNovoValorMaterial] = useState("");

  function adicionarMaterial() {
    if (!novoMaterial || !novaQuantidade || !novoValorMaterial) {
      alert("Preencha todos os dados do material.");
      return;
    }

    setMateriais([
      ...materiais,
      {
        nome: novoMaterial,
        quantidade: Number(novaQuantidade),
        valorUnitario: Number(novoValorMaterial),
      },
    ]);

    setNovoMaterial("");
    setNovaQuantidade("");
    setNovoValorMaterial("");
  }

  function removerMaterial(index) {
    setMateriais(materiais.filter((_, i) => i !== index));
  }

  return (
    <div className="md:col-span-2">
      <h2 className="text-lg font-bold text-red-900 mb-3">
        Materiais
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={novoMaterial}
          onChange={(e) => setNovoMaterial(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Material"
        />

        <input
          type="number"
          min="1"
          value={novaQuantidade}
          onChange={(e) => setNovaQuantidade(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Quantidade"
        />

        <input
          type="number"
          min="0"
          step="0.01"
          value={novoValorMaterial}
          onChange={(e) => setNovoValorMaterial(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Valor unitário"
        />
      </div>

      <button
        type="button"
        onClick={adicionarMaterial}
        className="mt-3 rounded-lg bg-red-900 px-4 py-2 text-white"
      >
        + Adicionar material
      </button>

      {materiais.map((m, i) => (
        <div
          key={i}
          className="mt-2 flex justify-between border rounded-lg bg-gray-50 p-3"
        >
          <div>
            <b>{m.nome}</b>

            <p className="text-sm text-gray-500">
              {m.quantidade} × R${" "}
              {m.valorUnitario.toFixed(2).replace(".", ",")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span>
              R${" "}
              {(m.quantidade * m.valorUnitario)
                .toFixed(2)
                .replace(".", ",")}
            </span>

            <button
              type="button"
              onClick={() => removerMaterial(i)}
              className="text-red-700"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}