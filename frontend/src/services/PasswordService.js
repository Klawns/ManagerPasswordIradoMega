import api from "./api";

export async function listPasswords(userId) {
  try {
    const res = await api.get(`/api/passwords/${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createPassword(passwordData) {
  try {
    const res = await api.post("/api/passwords", passwordData);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deletePassword(id) {
  try {
    await api.delete(`/api/passwords/${id}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
