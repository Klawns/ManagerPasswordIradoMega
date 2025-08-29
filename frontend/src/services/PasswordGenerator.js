export default function generatePassword(
  includeUppercase,
  includeNumbers,
  includeSymbols,
  length
) {
  let lower = "abcdefghijklmnopqrstuvwxyz";
  let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numbers = "0123456789";
  let symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let chars = lower;
  if (includeUppercase) chars += upper;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  let newPassword = "";
  for (let i = 0; i < length; i++) {
    newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return newPassword;
}
