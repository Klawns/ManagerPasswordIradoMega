import api from "./api";

export const handleRegister = async (
  e,
  username,
  password,
  setMessageError,
  setMessageConclued,
  navigate
) => {
  e.preventDefault();

  try {
    const response = await api.post("/api/users/register", {
      username: username,
      password: password,
    });

    console.log("Resposta da API:", response.data);

    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));

    setMessageConclued("Usuário registrado com sucesso!");

    navigate("/vault");
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      setMessageError("Erro ao registrar");
    } else {
      setMessageError("Erro ao conectar ao servidor.");
    }
  }
};
