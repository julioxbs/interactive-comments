import Express from "express";
import { commentRouter } from "./routers/comment";
import BodyParser from "body-parser";
import cors from 'cors'

const app = Express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


app.use('/', commentRouter);

app.listen(5000, () => console.log('http://localhost:5000'));