import { Pool } from "pg";

// Configuração da conexão com o banco
const pool = new Pool({
  user: "seu_usuario",
  host: "localhost",
  database: "seu_banco",
  password: "sua_senha",
  port: 5432,
});

async function connect() {
  return await pool.connect();
}

// Funções de manipulação do banco
async function selectUsuario(id) {
  const client = await connect();
  const query = "SELECT * FROM usuario WHERE id = $1";
  const res = await client.query(query, [id]);
  client.release();
  return res.rows;
}

async function insertUsuario(data) {
  const client = await connect();
  const query = "INSERT INTO usuario (nome, senha, email) VALUES ($1, $2, $3)";
  await client.query(query, [data.nome, data.senha, data.email]);
  client.release();
}

async function deleteUsuario(id) {
  const client = await connect();
  const query = "DELETE FROM usuario WHERE id = $1";
  await client.query(query, [id]);
  client.release();
}

async function updateUsuario(id, data) {
  const client = await connect();
  const query = "UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4";
  await client.query(query, [data.nome, data.email, data.senha, id]);
  client.release();
}

// Exportação das funções
export { selectUsuario, insertUsuario, deleteUsuario, updateUsuario };