import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/HandleLogin";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageConclued, setMessageConclued] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
      <div className="w-full max-w-md bg-gray-800/90 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
          Login
        </h1>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            handleLogin(
              e,
              setMessageConclued,
              setMessageError,
              username,
              password,
              navigate
            );
          }}
        >
          <div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Digite seu usuário"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/50 outline-none transition"
              required
            />
          </div>

          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/50 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-white shadow-md transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-red-500 text-sm mt-1">{messageError}</p>
        <p className="text-green-500 text-sm mt-1">{messageConclued}</p>

        <p className="mt-6 text-center text-sm text-gray-400">
          Não tem conta?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Criar conta
          </a>
        </p>
      </div>
    </div>
  );
}
