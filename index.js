const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

const { checkUser } = require("./middlewares/checkUser");
const { logging } = require("./middlewares/logging");
const { addBannerController, findBannerController } = require("./controllers/bannerController");
const { registerController } = require("./controllers/userController");
// const { homeController } = require("./controllers/homeController");

// // //Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/biasoffer';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// // //Get the default connection
const db = mongoose.connection;

// // //Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log("mongo db connected");
});

// const schema = new mongoose.Schema({ title: 'string', size: 'string', age: "number" });
// const banners = mongoose.model('banners', schema);
// banners.find({}).exec((error, result) => {
//     console.log("error", error);
//     console.log("result is", result);
// })

// banners.find({ title: "3" }).exec((error, result) => {
//     console.log("error", error);
//     console.log("result is", result);
// });

// db.collection("banners").insertOne({
//     title: "5",
//     affiliate: "normal url", size: 3
// }, (err, res) => {
//     console.log("err,res", err, res)
// })

// db.collection("banners").updateOne({
//     title: "1111",
// },{$set:{title:"0000000"}}, (err, res) => {
//     console.log("err,res", err, res)
// })

// db.collection("banners").deleteMany({
//     title: "5",
// }, (err, res) => {
//     console.log("err,res", err, res)
// })


// db.collection("banners").deleteOne({
//     title: "5",
// }, (err, res) => {
//     console.log("err,res", err, res)
// })
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

// db.collection("banners").insertOne({
//     title: "5",
//     affiliate: "normal url", size: 3
// }, (err, res) => {
//     console.log("err,res", err, res)
// })

// banners.create({
//         title: "5",
//         affiliate: "normal url", size:"randomStringTest2"
//     },
//     (err, res) => {
//             console.log("err,res", err, res)
//         } 
//     );
// moved to controller
// app.get('/', logging, checkUser, homeController);


// app.get('/test', (req, res, next) => {
//     console.log("APi is called on this time ", new Date());
//     next();
// }, (req, res) => {
//     res.send("Home Route")
// });

// app.get('/test', logging, (req, res) => {
//     res.send("Test Route")
// });

// app.get('/unique', (req, res) => {
//     if (checkUser()) {
//         res.send("This is a unique api");
//     }
// })

// app.post('/unique', (req, res) => {
//     console.log("Is user approved");
//     res.send("This is a post request api")
// })

app.post('/add/banner', addBannerController);

app.post("/find/banner", findBannerController);

app.post("/register", registerController);

app.use((req, res, next) => {
    console.log("Is user approved");
    res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
    console.log("Server is started");
})