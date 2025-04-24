const express = require('express');
const port = process.env.PORT || 5000;
const router = require('./routes/cubes');
const logger = require('./middleware/logger');
const errorHandling = require('./middleware/errorhandling');

const app = express();

app.use(logger);
app.use(express.json());
app.use('/api/cubes', router);
app.use(errorHandling);


app.listen(port, () => console.log(`Server is listening on port ${port}...`));

