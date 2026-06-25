import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { checkConnection } from './database/connection'; 
import masterRouter from './routes';
import { Logger } from './utils/logger';
import { startScheduler } from './scheduler'; 

const app = express();
const PORT = process.env.PORT || 3000;

checkConnection();

const allowedOrigins = [
  'http://localhost:5173',                  // dev local (Vite)
  'https://projeto-safe-home.vercel.app',   // produção (Vercel)
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.get('/teste', (req, res) => res.json({ ok: true }));


app.use('/', masterRouter);

startScheduler();

app.listen(PORT, () => {
    Logger.info(`\n========================================`);
    Logger.info(`🏠 API SafeHome rodando no http://localhost:${PORT}`);
    Logger.info(`========================================\n`);
});
