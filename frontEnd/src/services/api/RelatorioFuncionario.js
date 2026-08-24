const API_URL = "http://localhost:8080/v1/funcionario";

// Listar todos os funcionários
export async function listarFuncionarios() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao listar funcionários");
  return res.json();
}

// Listar apenas funcionários ativos
export async function listarFuncionariosAtivos() {
  const res = await fetch(`${API_URL}/ativos`);
  if (!res.ok) throw new Error("Erro ao listar funcionários ativos");
  return res.json();
}

// Buscar funcionário por ID
export async function buscarFuncionarioPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Funcionário não encontrado");
  return res.json();
}

export async function criarFuncionario(dados) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const erro = await res.json().catch(() => null);
    throw new Error(erro?.message || "Erro ao criar funcionário");
  }
  return res.json();
}

export async function atualizarFuncionario(id, dados) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const erro = await res.json().catch(() => null);
    throw new Error(erro?.message || "Erro ao atualizar funcionário");
  }
  return res.json();
}

export async function patchFuncionario(id, dados) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao atualizar parcialmente o funcionário");
  return res.json();
}

export async function deletarFuncionario(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar funcionário");
  // resposta 204 No Content — não tem corpo pra converter em JSON
}

export async function reativarFuncionario(id) {
  const res = await fetch(`${API_URL}/reativar/${id}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Erro ao reativar funcionário");
  return res.json();
}
