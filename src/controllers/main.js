const router = require('express').Router(),
    upload = require('multer')(),
    getFiles = require('../services/GetFiles'),
    mergeProtocols = require('../services/ProtocolMaker')

router.get('/ping', (req, res) => {
    res.send('pong')
})

router.post('/upload', upload.array('files', 7), (req, res) => {
    const files = getFiles(req.files, req.query)
    res.send(mergeProtocols(files)).status(200)
})

module.exports = router