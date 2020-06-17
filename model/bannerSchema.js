const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    title: 'string',
    image: 'string',
    desc: "string",
    createdAt: "string"
});

const Banners = mongoose.model('banners', schema);

module.exports = {
    Banners
}