'use strict'

const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const routes = require('./routes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', routes)

app.listen(PORT, function() {
    console.log('Server started, listening to PORT', PORT)
})
