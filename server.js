require('dotenv').config(); // Carregar as variáveis de ambiente no topo

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const openaiRoutes = require('./routes/openaiRoutes');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/neudata';

// Middleware para interpretar JSON
app.use(express.json());

// Configurar o middleware CORS para permitir o frontend acessar o backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080', // Variável de ambiente para frontend em produção
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Rota inicial para testar o backend
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Usar as rotas da API OpenAI
app.use('/api/openai', openaiRoutes);

// Usar as rotas de autenticação
app.use('/api/auth', authRoutes);

// Usar rotas adicionais da API (certifique-se que o arquivo ./routes/api existe e está configurado corretamente)
app.use('/api', apiRoutes);

// Exemplo de uma rota protegida com middleware de autenticação
app.get('/api/protegido', authMiddleware, (req, res) => {
  res.send('Você acessou uma rota protegida!');
});

// Conectar ao MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

// Iniciar o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
