import express from 'express';
import accessibilityRoutes from './routes/accessibility.routes';
var cors = require('cors');

const app = express();
//Allow CORS
// app.use(cors({origin: 'http://localhost:5173'}));
app.use();

// Middleware to parse JSON bodies.
app.use(express.json());

// Mount the accessibility routes.
app.use('/api/accessibility', accessibilityRoutes);

export default app;
