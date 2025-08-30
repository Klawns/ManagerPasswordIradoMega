import generatePassword from "./PasswordGenerator";

/**
 * Gera uma senha personalizada com base nas opções e envia para callback.
 * @param {boolean} includeUppercase
 * @param {boolean} includeNumbers
 * @param {boolean} includeSymbols
 * @param {number} length
 * @param {function} onGenerate - callback para receber a senha gerada
 * @param {function} close - callback para fechar o modal
 */
export default function handleGenerate(
  includeUppercase,
  includeNumbers,
  includeSymbols,
  length,
  onGenerate,
  close
) {
  const newPassword = generatePassword(
    includeUppercase,
    includeNumbers,
    includeSymbols,
    length
  );
  onGenerate(newPassword);
  close();
}
