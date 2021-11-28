import { Express } from 'express';
import Auth from './Auth';
import Place from './Place';
import Attractions from './Attractions';

const app = (App: Express) => App.use(Auth, Place, Attractions);

export default app;
