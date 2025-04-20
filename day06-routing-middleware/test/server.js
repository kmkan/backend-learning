const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.use(logger);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Welcome to the home page!" });
})

app.get('/about', (req, res) => {
    res.status(200).json({ msg: "Kamal is a world class trader interning at Amazon" });
})

function logger(req, res, next) {
    console.log("HELLO");
    next();
}

app.listen(port, () => console.log(`Server is listening on port ${port}...`));