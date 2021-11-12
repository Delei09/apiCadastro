import Express, { urlencoded } from 'express'
import cors from 'cors'
import rota from '../rotas';

const porta = 3002;
const app = Express() ;
app.use( Express.json() ) ;
app.use(urlencoded( { extended : true } ) );
app.use(cors());
app.use(rota)


export {app , porta}