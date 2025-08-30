import { useEffect, useState } from "react";
import {
  listPasswords,
  createPassword,
  deletePassword,
  updatePassword,
} from "../services/PasswordService";

export function usePasswords(user) {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(false); // opcional, útil para feedback

  // Carrega as senhas do usuário quando o hook é inicializado ou o usuário muda
  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    async function load() {
      try {
        const data = await listPasswords(user.id);
        if (isMounted) setPasswords(data);
      } catch (err) {
        console.error("Erro ao listar senhas:", err);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Salva uma nova senha
  async function handleSavePassword(newItem) {
    if (!user || !user.id) {
      console.error("Usuário não definido!");
      return;
    }

    try {
      await createPassword({
        site: newItem.site,
        username: newItem.username,
        password: newItem.password,
        passwordIdentify: newItem.passwordIdentify,
        userId: user.id,
      });
      // Atualiza a lista após criar
      const data = await listPasswords(user.id);
      setPasswords(data);
    } catch (err) {
      console.error("Erro ao salvar senha:", err);
    }
  }

  // Deleta uma senha
  async function handleDeletePassword(id) {
    if (!user || !user.id) {
      console.error("Usuário não definido!");
      return;
    }

    try {
      await deletePassword(id);
      const data = await listPasswords(user.id);
      setPasswords(data);
    } catch (err) {
      console.error("Erro ao deletar senha:", err);
    }
  }

  // Atualiza uma senha existente
  async function handleUpdatePassword(id, updatedData) {
    if (!user || !user.id) {
      console.error("Usuário não definido!");
      return;
    }

    try {
      await updatePassword(id, updatedData);
      const data = await listPasswords(user.id);
      setPasswords(data);
    } catch (err) {
      console.error("Erro ao atualizar senha:", err);
    }
  }

  return {
    passwords,
    loading,
    handleSavePassword,
    handleDeletePassword,
    handleUpdatePassword,
  };
}
