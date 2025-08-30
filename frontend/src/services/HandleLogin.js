import api from "./api";

export const handleLogin = async (
  e,
  setMessageConclued,
  setMessageError,
  username,
  password,
  navigate 
) => {
  e.preventDefault();

  try {
    const response = await api.post("/api/users/login", {
      username,
      password,
    });

    console.log("Resposta da api: ", response.data);
    setMessageConclued("Login realizado com sucesso!");

    localStorage.setItem("user", JSON.stringify(response.data));

    navigate("/vault");
  } catch (error) {
    setMessageError("Erro ao conectar ao servidor.");
    console.error(error);
  }
};
