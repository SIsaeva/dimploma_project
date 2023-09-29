const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', routes)

const PORT = config.get('port') ?? 8080

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')))

    const indexPath = path.join(__dirname, 'client', 'index.html')

    app.get('*', (req, res) => {
        res.sendFile(indexPath)
    })
}

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