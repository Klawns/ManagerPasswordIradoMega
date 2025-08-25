import { useState } from "react";
import generatePassword from "../services/PasswordGenerator";
import InputPassword from "../Components/InputPassword";
import CheckBoxesPassword from "../Components/CheckBoxesPassword";
import copyToClipboard from "../utils/Clipboard";

export default function GeneratorPage(props) {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");

  function handleSendToVault() {
    if (!site || !username || !password) {
      alert("Preencha site, usuário e gere uma senha antes de salvar!");
      return;
    }
    props.onSave({ site, username, password });
  }

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-[30rem]">
      <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
        Gerador de Senhas
      </h1>

      {/* Campo da senha */}
      <div className="flex mb-6">
        <input
          type="text"
          value={password}
          readOnly
          placeholder="Sua senha aparecerá aqui"
          className="flex-1 px-4 py-5 rounded-l-lg bg-gray-900 border border-gray-700 outline-none"
        />
        <button
          onClick={() => copyToClipboard(password)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-r-lg font-semibold"
        >
          📋
        </button>
      </div>

      {/* Configurações */}
      <div className="space-y-4">
        <InputPassword
          value={site}
          set={setSite}
          placeholder="Qual site você está criando a senha"
        />

        <InputPassword
          value={username}
          set={setUsername}
          placeholder={"Seu nome de usuário"}
        />

        <div>
          <label className="block text-sm font-medium">Tamanho: {length}</label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full"
          />
        </div>

        <label className="flex items-center space-x-2">
          <CheckBoxesPassword
            type="checkbox"
            checked={includeUppercase}
            set={includeUppercase}
            text="Incluir Letras Maiúsculas"
          />
        </label>

        <label className="flex items-center space-x-2">
          <CheckBoxesPassword
            type="checkbox"
            checked={includeNumbers}
            set={includeNumbers}
            text="Incluir Números"
          />
        </label>

        <label className="flex items-center space-x-2">
          <CheckBoxesPassword
            type="checkbox"
            checked={includeSymbols}
            set={includeSymbols}
            text="Incluir Símbolos"
          />
        </label>
      </div>

      {/* Botões */}
      <button
        onClick={() =>
          generatePassword(
            includeUppercase,
            includeNumbers,
            includeSymbols,
            length,
            setPassword
          )
        }
        className="w-full mt-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold text-white shadow-md transition"
      >
        Gerar Senha
      </button>
      <button
        onClick={handleSendToVault}
        className="w-full mt-3 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-white shadow-md transition"
      >
        Enviar para o Vault
      </button>
      <button
        onClick={props.close}
        className="w-full mt-3 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold text-white shadow-md transition"
      >
        Cancelar
      </button>
    </div>
  );
}
