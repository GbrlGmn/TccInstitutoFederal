export async function cadastrarFuncionarios(funcionarios) {
  const response = await fetch("http://localhost:8080/v1/funcionario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(funcionarios),
  });

  return {
    ok: response.ok,
  };
}