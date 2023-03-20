const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrls')
const app = express()
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

mongoose.connect('mongodb://127.0.0.1:27017/link-shortener', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/shorten-url/:id', async (req, res) => {
    const url = await ShortUrl.findOne({ shortUrl: req.params.id }).exec()
    if (url) {
        res.status(200).send({ url: url.fullUrl })
    } else {
        res.sendStatus(404)
    }
})

app.post('/shorten-url', async (req, res) => {
    const createdUrl = await ShortUrl.create({ fullUrl: req.body.fullUrl })
    res.status(200).send({ shortUrl: createdUrl.shortUrl })
})

app.listen(5000)