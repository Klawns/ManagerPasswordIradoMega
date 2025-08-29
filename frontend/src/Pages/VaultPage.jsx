import { useEffect, useState } from "react";
import GeneratorPage from "./PasswordGeneratorPage";
import copyToClipboard from "../utils/Clipboard";
import {
  listPasswords,
  createPassword,
  deletePassword,
} from "../services/PasswordService";

export default function VaultPage() {
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function load() {
      if (user) {
        const data = await listPasswords(user.id);
        setPasswords(data);
      }
    }
    load();
  }, [user]);

  async function handleSavePassword(newItem) {
    await createPassword({ ...newItem, userId: user.id });
    const data = await listPasswords(user.id);
    setPasswords(data);
    setShowPasswordGenerator(false);
  }

  async function handleDeletePassword(id) {
    await deletePassword(id);
    const data = await listPasswords(user.id);
    setPasswords(data);
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Vault</h1>
        <button
          onClick={() => setShowPasswordGenerator(true)}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-semibold shadow-md transition"
        >
          + Nova Senha
        </button>
      </header>

      <div className="flex-1 overflow-y-auto rounded-lg border border-gray-700 bg-gray-800/90 shadow-lg backdrop-blur-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900">
              <th className="px-4 py-3">Site</th>
              <th className="px-4 py-3">Usuário</th>
              <th className="px-4 py-3">Senha</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((p) => (
              <tr
                key={p.id}
                className="border-t border-gray-700 hover:bg-gray-700/50 transition"
              >
                <td className="px-4 py-3">{p.site}</td>
                <td className="px-4 py-3">{p.username}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => copyToClipboard(p.password)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md text-sm"
                  >
                    Copiar
                  </button>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleDeletePassword(p.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-md text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
