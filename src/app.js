import express from 'express';
import dotenv from 'dotenv';
import CompaniesEcuadoRoutes from '../src/routes/CompaniesEcuadoRoutes.js'
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(CompaniesEcuadoRoutes);
app.set('port', process.env.PORT || 4003);


export default app;
