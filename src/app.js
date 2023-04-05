import express from 'express';
import dotenv from 'dotenv';
import cors  from 'cors';
import Users from './routes/UserRoute.js'

dotenv.config();

const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 4001);
app.use(cors())
app.use(Users)
export default app;
