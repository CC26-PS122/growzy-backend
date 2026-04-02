import express from 'express';
import router from './src/router/router.js';
import authRouter from './src/router/authRouter.js';
// import cors from 'cors';

const PORT = 3000 || process.env.PORT
const app = express()

// app.use(cors({
//   origin: 'https://your-frontend.com'
// }));

app.use(express.json());
app.use('/api', router);
app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'The endpoint you requested does not exist.',
  });
});

app.listen(PORT, () => console.log(`Growzy app listening on PORT ${PORT}!`))
// app.get('/', (req, res) => res.json({ message: 'API is running' }));

export default app;