import express from 'express';
import { env } from './config';

const host = env.HOST;
const port = env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
