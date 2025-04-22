const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const router = require('./routes/cubes');

app.use(logger);
app.use(express.json());
app.use('/api/cubes', router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}...`));