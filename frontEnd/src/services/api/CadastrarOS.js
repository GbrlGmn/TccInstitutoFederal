export async function cadastrarOS(os) {
  console.log("OS ENVIADA:", os);

  const response = await fetch("http://localhost:8080/v1/ordemservico", {
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