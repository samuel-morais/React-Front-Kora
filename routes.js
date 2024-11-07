// routes.js
const express = require('express');
const router = express.Router();

// Definindo a rota POST para /solicitacoes
router.post('/solicitacoes', (req, res) => {
  // Lógica para lidar com a solicitação POST
  res.send('Solicitação recebida');
});

module.exports = router;