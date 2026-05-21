export async function login(usuario, senha) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (usuario === "admin" && senha === "123") {
    return {
      ok: true,
      token: "fake-token-123",
    };
  } else {
    return {
      ok: false,
      message: "Usuário ou senha inválidos",
    };
  }
}