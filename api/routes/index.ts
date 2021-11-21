import { Express } from 'express';
import Auth from './Auth';

const app = (App: Express) => App.use(Auth);

export default app;
