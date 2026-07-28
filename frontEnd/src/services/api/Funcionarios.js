export async function cadastrarFuncionarios(funcionarios) {
  const response = await fetch("http://localhost:8080/funcionarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(funcionario),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
}
