import Auth from './Auth';
import { Express } from 'express-serve-static-core';


const app = (app: Express) => app.use(Auth);

export default app;