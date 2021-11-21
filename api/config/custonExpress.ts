import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes/index';

dotenv.config();

const custonExpress = () => {
  const port = process.env.NODE_PORT;
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  routes(app);

  app.listen(port, () => console.log(`Api rodando na porta http://localhost:${port} 🔥`));
  return app;
};

export default custonExpress;
