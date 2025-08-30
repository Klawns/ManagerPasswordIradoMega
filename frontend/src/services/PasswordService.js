import api from "./api";

// Lista todas as senhas de um usuário
export async function listPasswords(userId) {
  try {
    const res = await api.get(`/api/passwords/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Erro ao listar senhas:", err);
    return [];
  }
}

// Cria uma nova senha
export async function createPassword(passwordData) {
  try {
    const res = await api.post("/api/passwords", passwordData);
    return res.data;
  } catch (err) {
    console.error("Erro ao criar senha:", err);
    throw err;
  }
}

// Deleta uma senha
export async function deletePassword(id) {
  try {
    await api.delete(`/api/passwords/${id}`);
  } catch (err) {
    console.error("Erro ao deletar senha:", err);
    throw err;
  }
}

// Atualiza senha existente (caso queira editar depois)
export async function updatePassword(id, passwordData) {
  try {
    const res = await api.put(`/api/passwords/${id}`, passwordData);
    return res.data;
  } catch (err) {
    console.error("Erro ao atualizar senha:", err);
    throw err;
  }
}
