import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';
import swaggerDocument from '../dist/swagger.json'; // Ensure this path is correct

const app = express();

app.use(express.json());

RegisterRoutes(app);

// Serve the Swagger documentation at /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Not Found');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

export { app };

