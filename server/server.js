const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrls')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/link-shortener', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/shorten-url/:id', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.status(200).send({ urls: shortUrls })
})

app.post('/shorten-url', async (req, res) => {
    const createdUrl = await ShortUrl.create({ fullUrl: req.body.fullUrl })
    res.status(200).send({ shortUrl: createdUrl.shortUrl })
})

app.listen(process.env.PORT || 5000)