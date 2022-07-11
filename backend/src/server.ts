require('dotenv').config();
import Express from "express";
import { commentRouter } from "./routers/comment";
import BodyParser from "body-parser";
import cors from 'cors';

const app = Express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/', commentRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));