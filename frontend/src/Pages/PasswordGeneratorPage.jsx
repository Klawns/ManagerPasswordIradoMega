import { useState } from "react";
import InputPassword from "../Components/InputPassword";
import { WandSparkles } from "lucide-react";
import CustomizePassword from "../Pages/CustomizePasswordPage";

export default function GeneratorPage(props) {
  const [showCustomize, setShowCustomize] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const [password, setPassword] = useState("");
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [passwordIdentify, setPasswordIdentify] = useState("");

  function handleSendToVault() {
    if (!site || !username || !password || !passwordIdentify) {
      alert("Preencha site, usuário e gere uma senha antes de salvar!");
      return;
    }
    props.onSave({ site, passwordIdentify, username, password });
  }

  return (
    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-[30rem]">
      <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
        Gerenciador de Senhas
      </h1>

      {/* Configurações */}
      <div className="space-y-4">
        <InputPassword
          value={site}
          set={setSite}
          placeholder="Qual site você está criando a senha"
        />

        <InputPassword
          value={passwordIdentify}
          set={setPasswordIdentify}
          placeholder={"Nome da senha"}
        ></InputPassword>

        <InputPassword
          value={username}
          set={setUsername}
          placeholder={"Email ou Usuario"}
        />

        <div className="flex mb-6">
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsGenerated(false);
            }}
            readOnly={isGenerated}
            value={password}
            placeholder="Sua senha aparecerá aqui"
            className="flex-1 px-4 py-2 rounded-l-lg bg-gray-900 border border-gray-700 outline-none"
          />
          <button
            onClick={() => setShowCustomize(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-r-lg font-semibold"
          >
            <WandSparkles size={25} />
          </button>
        </div>
        <p className="text-amber-600 text-xs text-left">
          Digite sua senha ou gere uma automaticamente com a varinha.
        </p>
      </div>

      {/* Botões */}
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

      {/* Outras Logicas */}
      {showCustomize && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
          <CustomizePassword
            onGenerate={(newPassword) => {
              setPassword(newPassword);
              setIsGenerated(true);
              setShowCustomize(false);
            }}
            close={() => setShowCustomize(false)}
          />
        </div>
      )}
    </div>
  );
}
