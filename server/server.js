const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/urls');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// mongoose.connect('mongodb://127.0.0.1:27017/link-shortener', {
//     useNewUrlParser: true, useUnifiedTopology: true
// })

// In memory db
(async () => {
    const mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();

    mongoose.connect(uri, {
        useNewUrlParser: true, useUnifiedTopology: true
    })
})();

app.get('/shorten-url/:id', async (req, res) => {
    const url = await Url.findOne({ shortUrl: req.params.id }).exec()
    if (url) {
        res.status(200).send({ url: url.fullUrl })
    } else {
        res.sendStatus(404)
    }
})

app.get('/shorten-url/', async (req, res) => {
    const urls = await Url.find().exec()
    res.status(200).send(urls)

})

app.post('/shorten-url', async (req, res) => {
    const createdUrl = await Url.create({ fullUrl: req.body.fullUrl })
    res.status(200).send({ fullUrl: req.body.fullUrl, shortUrl: createdUrl.shortUrl })
})

app.listen(5000)