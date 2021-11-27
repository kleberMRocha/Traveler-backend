import { Express } from 'express';
import Auth from './Auth';
import Place from './Place';

const app = (App: Express) => App.use(Auth, Place);

export default app;
