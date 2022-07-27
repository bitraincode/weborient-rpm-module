const router = require('express').Router(),
    upload = require('multer')(),
    getFiles = require('../services/GetFiles')

router.get('/ping', (req, res) => {
    res.send('pong')
})

router.post('/upload', upload.array('files', 7), (req, res) => {
    const files = getFiles(req.files, req.query)
    res.send(files).status(200)
})

module.exports = router