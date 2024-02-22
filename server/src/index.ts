import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { dbConnection } from './dbConnection';
import routes from './routes';

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

dbConnection();
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})