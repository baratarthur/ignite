import express from 'express';

import { categoryRoutes } from './routes/categories.routes';
import { specificationRoutes } from './routes/specifications.routes';

const app = express();

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/specification", specificationRoutes);

app.listen(3333, () => console.log("Server is running!"));
