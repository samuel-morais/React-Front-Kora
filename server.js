const express = require('express');
const mysql = require('mysql2/promise'); // Use a versão promise do mysql2
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: '35.243.184.164',
  user: 'xxxx',
  password: 'xxx',
  database: 'intecompany',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Rota para criar uma nova solicitação de empréstimo
app.post('/api/solicitacao-emprestimo', async (req, res) => {
  const { empresaOrigem, empresaDestino, dataCriacao, materiais, total, status } = req.body;

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const promises = materiais.map(async (material) => {
      const { material: nomeMaterial, descricao_material, quantidade, medida, valor, quantidade_saldo, sub_total } = material;

      const sql = `
        INSERT INTO emprestimos (material, descricao_material, quantidade, medida, valor, quantidade_saldo, sub_total, total, status, empresa_origem, empresa_destino, data_criacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      return connection.query(sql, [nomeMaterial, descricao_material, quantidade, medida, valor, quantidade_saldo, sub_total, total, status, empresaOrigem, empresaDestino, dataCriacao]);
    });

    await Promise.all(promises);
    await connection.commit();
    res.status(200).send('Dados inseridos com sucesso.');
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Erro ao inserir dados:', error.message);
    res.status(500).send(`Erro ao inserir dados: ${error.message}`);
  } finally {
    if (connection) connection.release(); 
  }
});

// Rota GET para listar todos os empréstimos
app.get('/api/listarEmprestimos', async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT id, empresa_origem, empresa_destino, material, descricao_material, quantidade, medida,  data_criacao, total, status 
      FROM emprestimos
    `);
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ error: 'Erro ao buscar os dados' });
  }
});

// Rota GET para listar os materiais
app.get('/materiais', async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        h.nome AS hospital_nome, 
        m.nome AS material_nome, 
        m.saldo, 
        m.valor
      FROM hospitais h
      JOIN materiais m ON h.id = m.hospital_id
    `);
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar dados dos materiais:', err);
    res.status(500).json({ error: 'Erro ao buscar os dados dos materiais' });
  }
});

// Rota GET para listar os Hospitais
app.get('/api/hospitais', async (req, res) => {
  try {
    const [results] = await db.query('SELECT nome FROM hospitais');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar hospitais:', err);
    res.status(500).json({ error: 'Erro ao buscar hospitais' });
  }
});

// Rota GET para listar os hospitais e materiais
app.get('/api/hospitais-materiais', async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        h.nome AS hospital_nome, 
        m.id AS material_id, 
        m.nome AS material_nome, 
        m.saldo, 
        m.valor, 
        m.medida
      FROM hospitais h
      JOIN materiais m ON h.id = m.hospital_id
    `);
    res.status(200).json(result);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
