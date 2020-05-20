const express = require('express');
const app = express();
const port = 4000;

const { checkUser } = require("./middlewares/checkUser");
const { logging } = require("./middlewares/logging");
const { homeController } = require("./controllers/homeController");


// const checkUser = (req,res,next) => {
//     console.log("User is approved");
//     next();
// }

// const logging = (req, res, next) => {
//     console.log("APi is called on this time ", new Date());
//     next();
// }

// app.get('/', logging, checkUser, (req, res) => {
//     res.send("Home Route")
// }); 


// moved to controller
app.get('/', logging, checkUser, homeController);


// app.get('/test', (req, res, next) => {
//     console.log("APi is called on this time ", new Date());
//     next();
// }, (req, res) => {
//     res.send("Home Route")
// });

app.get('/test', logging, (req, res) => {
    res.send("Test Route")
});

app.get('/unique', (req, res) => {
    if (checkUser()) {
        res.send("This is a unique api");
    }
})

app.post('/unique', (req, res) => {
    console.log("Is user approved");
    res.send("This is a post request api")
})

app.use((req, res, next) => {
    console.log("Is user approved");
    res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
    console.log("Server is started");
})