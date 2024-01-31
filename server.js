const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./api-docs.yaml');

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}...`);
});