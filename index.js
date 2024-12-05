import express from "express";
import dotenv from "dotenv"; // Para variáveis de ambiente
import {
  selectUsuario,
  insertUsuario,
  deleteUsuario,
  updateUsuario,
} from "./bd.js";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rota: Obter um usuário pelo ID
app.get("/usuario/:id", async (req, res) => {
  console.log("Rota GET /usuario/:id solicitada");
  try {
    const usuario = await selectUsuario(req.params.id);
    if (usuario.length > 0) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Erro ao buscar usuário!" });
  }
});

// Rota: Criar um novo usuário
app.post("/usuario", async (req, res) => {
  console.log("Rota POST /usuario solicitada");
  try {
    await insertUsuario(req.body);
    res.status(201).json({ message: "Usuário inserido com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Erro ao inserir usuário!" });
  }
});

// Rota: Atualizar um usuário pelo ID
app.put("/usuario/:id", async (req, res) => {
  console.log("Rota PUT /usuario/:id solicitada");
  try {
    const usuario = await selectUsuario(req.params.id);
    if (usuario.length > 0) {
      await updateUsuario(req.params.id, req.body);
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Erro ao atualizar usuário!" });
  }
});

// Rota: Deletar um usuário pelo ID
app.delete("/usuario/:id", async (req, res) => {
  console.log("Rota DELETE /usuario/:id solicitada");
  try {
    const usuario = await selectUsuario(req.params.id);
    if (usuario.length > 0) {
      await deleteUsuario(req.params.id);
      res.status(200).json({ message: "Usuário excluído com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Erro ao excluir usuário!" });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
 console.log("Servidorrodandonaporta${PORT}");
});