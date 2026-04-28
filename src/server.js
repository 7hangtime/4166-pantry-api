import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import pantryItemRoutes from './routes/pantryItemRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('tiny'));
}

let specs;
try {
    specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf-8'));
} catch (error) {
    console.log('failed to load openapi specification', error);
    process.exit(1);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/auth', authRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/pantry-items', pantryItemRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);

    if (!err.status) {
        err.status = 500;
        err.message = 'Internal Server Error';
    }

    res.status(err.status).json({ error: err.message });
});


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;