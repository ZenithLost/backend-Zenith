const express = require('express');
const axios = require('axios');
const router = express.Router();

// Defina a rota para gerar posts
router.post('/generate-post', async (req, res) => {
  const { title, articleCount, includeMessage } = req.body;

  // Certifique-se de que a chave da OpenAI está armazenada na variável de ambiente
  const API_KEY = process.env.OPENAI_API_KEY; 
  const url = 'https://api.openai.com/v1/completions';

  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };

  const body = {
    model: 'text-davinci-003',
    prompt: `Escreva um artigo sobre o tema: ${title}`,
    max_tokens: 200,
    n: articleCount,
    stop: includeMessage ? undefined : ['\n'],
  };

  try {
    const response = await axios.post(url, body, { headers });
    res.status(200).json(response.data); // Retorna o conteúdo gerado pela API
  } catch (error) {
    console.error('Erro ao gerar conteúdo:', error);
    res.status(500).json({ message: 'Erro ao gerar conteúdo', error });
  }
});

module.exports = router;
