import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes/index';

require('dotenv').config();

const custonExpress = () => {
  const port = process.env.NODE_PORT;
  const app = express();

  app.use(bodyParser.json());
  routes(app);
  
  app.listen(port, () =>
    console.log(`Api rodando na porta http://localhost:${port} 🔥`)
  );
  return app;
};

export default custonExpress;
