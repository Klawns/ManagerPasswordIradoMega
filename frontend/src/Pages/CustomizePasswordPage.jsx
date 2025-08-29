import { useState } from "react";
import CheckBoxesPassword from "../Components/CheckBoxesPassword";
import generatePassword from "../services/PasswordGenerator";

export default function CustomizePassword(props) {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  function handleGenerate() {
    const newPassword = generatePassword(
      includeUppercase,
      includeNumbers,
      includeSymbols,
      length
    );
    props.onGenerate(newPassword);
    props.setShowCustomize(false);
  }
  return (
    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-[30rem]">
      <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
        Personalizar Senha
      </h1>
      <div className="space-y-4">
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
            set={setIncludeUppercase}
            text="Incluir Letras Maiúsculas"
          />
        </label>

        <label className="flex items-center space-x-2">
          <CheckBoxesPassword
            type="checkbox"
            checked={includeNumbers}
            set={setIncludeNumbers}
            text="Incluir Números"
          />
        </label>

        <label className="flex items-center space-x-2">
          <CheckBoxesPassword
            type="checkbox"
            checked={includeSymbols}
            set={setIncludeSymbols}
            text="Incluir Símbolos"
          />
        </label>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full mt-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold text-white shadow-md transition"
      >
        Gerar Senha
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
