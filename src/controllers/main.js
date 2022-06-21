const router = require('express').Router()
const busboy = require('../services/busboy')

    // busboy = require('../services/busboy')

router.get('/ping', (req, res) => {
    res.send('pong')
})

router.post('/send-csv', (req, res) => {
    console.log(busboy.getFile(req, res))
})

module.exports = router