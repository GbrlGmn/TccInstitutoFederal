const BASE_URL = "http://localhost:8080/v1";

export async function listarClientesAtivos() {
  const response = await fetch(`${BASE_URL}/cliente/ativos`);
  if (!response.ok) throw new Error("Falha ao buscar clientes");
  return response.json();
}

export async function listarFuncionariosAtivos() {
  const response = await fetch(`${BASE_URL}/funcionario/ativos`);
  if (!response.ok) throw new Error("Falha ao buscar funcionários");
  return response.json();
}

// AINDA NÃO FUNCIONA: OrdemServicoController está vazio no back-end,
// não existe @PostMapping em ordem de servico.
export async function cadastrarOrcamento(orcamento) {
  const response = await fetch(`${BASE_URL}/ordem-servico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orcamento),
  });

  const data = await response.json().catch(() => null);

  return { ok: response.ok, data };
}
