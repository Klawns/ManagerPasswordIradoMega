export default async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copiado para a área de transferência!");
  } catch (err) {
    console.error("Erro ao copiar: ", err);
    alert("Não foi possível copiar a senha.");
  }
}
