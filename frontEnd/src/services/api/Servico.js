export async function cadastrarServico(servico) {
  const response = await fetch("http://localhost:8080/servico", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(servico),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
}
