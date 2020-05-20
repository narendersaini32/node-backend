const express = require('express');
const app = express();
const port = 4000;


app.get('/', (req, res) => {
    res.send(`Root Route`);
});

app.get('/unique', (req, res) => {
    res.send("This is a unique api")
})

app.post('/unique', (req, res) => {
    res.send("This is a post request api")
})

app.use( (req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
    console.log("Server is started");
})