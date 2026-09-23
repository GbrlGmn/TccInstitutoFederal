export async function cadastrarOS(os) {
  console.log("OS ENVIADA:", os);

  const response = await fetch("/ordemservico", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(os),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
}

const API_URL = "http://localhost:8080/ordemservico";

export async function listarOS() {
  const response = await fetch(API_URL);

  console.log("STATUS:", response.status);
  console.log("TIPO:", response.headers.get("content-type"));

  if (!response.ok) {
    const erro = await response.json().catch(() => null);

    console.log("ERRO DO BACKEND:", erro);

    throw new Error(erro?.message || "Erro ao listar ordens de serviço");
  }

  return response.json();
}
export async function listarOSAtivas() {
  const res = await fetch(`${API_URL}/ativas`);
  if (!res.ok) throw new Error("Erro ao listar ordens de serviço ativas");
  return res.json();
}

export async function buscarOSPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Ordem de serviço não encontrada");
  return res.json();
}

export async function criarOS(dados) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const erro = await res.json().catch(() => null);
    throw new Error(erro?.message || "Erro ao criar ordem de serviço");
  }
  return res.json();
}

export async function atualizarOS(id, dados) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const erro = await res.json().catch(() => null);
    throw new Error(erro?.message || "Erro ao atualizar ordem de serviço");
  }
  return res.json();
}

// Deletar ordem de serviço
export async function deletarOS(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar ordem de serviço");
}

// Reativar ordem de serviço
export async function reativarOS(id) {
  const res = await fetch(`${API_URL}/reativar/${id}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Erro ao reativar ordem de serviço");
  return res.json();
}
