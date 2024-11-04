require('dotenv').config(); // Carregar as variáveis de ambiente no topo

const express = require('express');
const cors = require('cors'); // Importar o pacote CORS
const mongoose = require('mongoose');
const openaiRoutes = require('./routes/openaiRoutes'); // Importar a rota da API OpenAI
const authRoutes = require('./routes/auth'); // Importar as rotas de autenticação
const authMiddleware = require('./middleware/auth'); // Importar middleware de autenticação

const app = express();
const port = process.env.PORT || 3000; // Definir a porta padrão
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/neudata'; // Definir a URI do MongoDB

// Middleware para interpretar JSON
app.use(express.json());

// Configurar o middleware CORS para permitir o frontend acessar o backend
app.use(cors({
  origin: 'http://localhost:8080', // Permitir o frontend rodando na porta 8080
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Permitir o envio de cookies, se necessário
}));

// Rota inicial para testar o backend
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Usar as rotas da API OpenAI
app.use('/api/openai', openaiRoutes);

// Usar as rotas de autenticação
app.use('/api/auth', authRoutes);

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
const apiRoutes = require('./routes/api'); // Certifique-se de que o caminho está correto
app.use('/api', apiRoutes);

