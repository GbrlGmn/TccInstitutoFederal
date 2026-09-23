export default function ResumoOrcamento({
  totalMateriais,
  valorServico,
  valorTotal,
}) {
  return (
    <div className="md:col-span-2 border rounded-lg bg-gray-50 p-4">
      <h2 className="text-lg font-bold text-red-900 mb-3">
        Resumo do orçamento
      </h2>

      <div className="flex justify-between">
        <span>Materiais:</span>
        <span>
          R$ {totalMateriais.toFixed(2).replace(".", ",")}
        </span>
      </div>

      <div className="flex justify-between mt-2">
        <span>Serviço:</span>
        <span>
          R$ {(Number(valorServico) || 0).toFixed(2).replace(".", ",")}
        </span>
      </div>

      <div className="border-t mt-3 pt-3 flex justify-between font-bold">
        <span>Valor total:</span>
        <span className="text-red-900">
          R$ {valorTotal.toFixed(2).replace(".", ",")}
        </span>
      </div>
    </div>
  );
}