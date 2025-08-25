import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageConclued, setMessageConclued] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
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

  return (
    <div className=" w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
      <div className="w-full max-w-md bg-gray-800/90 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
          Registro
        </h1>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Digite seu usuário"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/50 outline-none transition"
            />
          </div>

          <div>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/50 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-white shadow-md transition"
          >
            Registrar
          </button>
        </form>

        <p className="text-red-500 text-sm mt-1">{messageError}</p>
        <p className="text-green-500 text-sm mt-1">{messageConclued}</p>

        <p className="mt-6 text-center text-sm text-gray-400">
          Já tem conta?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
