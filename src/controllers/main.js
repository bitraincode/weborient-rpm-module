const router = require('express').Router(),
    upload = require('multer')(),
    getFile = require('../services/GetFiles')

router.get('/ping', (req, res) => {
    res.send('pong')
})

router.post('/upload', upload.array('files', 7), (req, res) => {
    const files = getFile(req.files)
    res.send(files).status(200)
})

module.exports = router