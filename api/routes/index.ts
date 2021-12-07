import { Express } from 'express';
import Auth from './Auth';
import Place from './Place';
import Attractions from './Attractions';
import Review from './Review';
import Dashboard from './Dashboard';

const app = (App: Express) => App.use(
    Auth, 
    Place, 
    Attractions, 
    Review,
    Dashboard
);

export default app;
