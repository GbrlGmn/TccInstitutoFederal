const API_URL = "http://localhost:8080/v1/cliente";


export async function listarClientes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao listar clientes");
  return res.json();
}

export async function listarClientesAtivos() {
  const res = await fetch(`${API_URL}/ativos`);
  if (!res.ok) throw new Error("Erro ao listar clientes ativos");
  return res.json();
}

export async function buscarClientePorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Cliente não encontrado");
  return res.json();
}

export async function criarCliente(dados) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const erro = await res.json().catch(() => null);
    throw new Error(erro?.message || "Erro ao criar cliente");
  }
  return res.json();
}

export async function atualizarCliente(id, dados) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const erro = await res.json().catch(() => null);
    throw new Error(erro?.message || "Erro ao atualizar cliente");
  }
  return res.json();
}


// Deletar cliente
export async function deletarCliente(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar cliente");
}

// Reativar cliente
export async function reativarCliente(id) {
  const res = await fetch(`${API_URL}/reativar/${id}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Erro ao reativar cliente");
  return res.json();
}
