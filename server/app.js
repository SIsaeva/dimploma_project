const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes)

const PORT = config.get('port') ?? 8080

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'))
        app.listen(PORT, () => {
            console.log(`Server is started on port ${PORT}...`)
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()