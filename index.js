import express from 'express';
import router from './src/router/router.js';
import authRouter from './src/router/authRouter.js';
import cors from 'cors';

const PORT = process.env.PORT || 4000
const app = express()

app.use(cors({
  origin: [
    'https://growzy.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  methods: '*',
  allowedHeaders: '*',
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use('/api', router);
app.use('/api/auth', authRouter);

app.get('/confirm-email', (req, res) => {
  res.send({ message: "Email successfully verified!", })
});

app.use((req, res, next) => {
  res.status(404).json({
    message: 'The endpoint you requested does not exist.',
  });
});

// app.listen(PORT, () => console.log(`Growzy app listening on PORT ${PORT}!`));
app.get('/', (req, res) => res.json({ message: 'API is running' }));

export default app;