import PasswordCard from "../Components/PasswordCard";
import GeneratorPage from "./PasswordGeneratorPage";
import { Search, User, Plus, X } from "lucide-react";
import { useState } from "react";
import { usePasswords } from "../hooks/usePasswods";
import { useNavigate } from "react-router-dom";

function VaultPage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")); // usuário logado
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [showLeaveButton, setLeaveButton] = useState(false);

  // usePasswords sempre chamado, mesmo que storedUser seja null
  const { passwords, handleSavePassword, handleDeletePassword } = usePasswords(
    storedUser || { id: null }
  );

  // Se não houver usuário, apenas renderize aviso
  if (!storedUser) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-900 text-white">
        <p>Usuário não autenticado. Faça login para acessar o Vault.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen w-screen bg-gray-900 p-8">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
        {/* Cabeçalho */}
        <div className="flex items-center mb-6 space-x-4">
          <h1 className="text-2xl font-bold text-white flex-shrink-0">
            Meu Vault
          </h1>

          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar no Vault..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search className="h-5 w-5" />
            </span>
          </div>

          <div className="relative inline-block">
            <div className="bg-purple-600 p-2 rounded-full cursor-pointer">
              <button onClick={() => setLeaveButton(!showLeaveButton)}>
                <User className="h-6 w-6 text-white" />
              </button>
            </div>

            {showLeaveButton && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2">
                <button
                  className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200"
                  onClick={() => navigate("/login")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Botão de adicionar senha */}
        <button
          className="flex items-center space-x-2 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 mb-6"
          onClick={() => setShowPasswordGenerator(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Adicionar Nova Senha</span>
        </button>

        {/* Lista de senhas */}
        <div className="space-y-4">
          {passwords.map((item) => (
            <PasswordCard
              key={item.id}
              id={item.id}
              passwordIdentify={item.passwordIdentify}
              username={item.username}
              password={item.password}
              onDelete={() => handleDeletePassword(item.id)}
            />
          ))}
        </div>
      </div>

      {showPasswordGenerator && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <GeneratorPage
            close={() => setShowPasswordGenerator(false)}
            onSave={handleSavePassword}
          />
        </div>
      )}
    </div>
  );
}

export default VaultPage;
