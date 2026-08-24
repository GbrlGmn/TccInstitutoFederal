export async function cadastrarCliente(cliente) {
  console.log("CLIENTE ENVIADO:", cliente);

  const response = await fetch("http://localhost:8080/v1/cliente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
}