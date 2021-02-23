import 'reflect-metadata';

import express from 'express';

import cors from 'cors';

import Routes from './routes/index';

import './database';

const port = process.env.PORT || 3333;

const app = express();

app.use(cors());

app.use(express.json());

app.use(Routes);

app.listen(port);