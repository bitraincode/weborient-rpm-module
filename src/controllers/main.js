const router = require('express').Router(),
    upload = require('multer')(),
    getFile = require('../services/GetFiles')

router.get('/ping', (req, res) => {
    res.send('pong')
})

router.post('/send-csv', upload.array('files', 7), (req, res) => {
    getFile(req.files)
})

module.exports = router