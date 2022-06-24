const router = require('express').Router(),
    upload = require('multer')()

router.get('/ping', (req, res) => {
    res.send('pong')
})

router.post('/send-csv', upload.array('files', 7), (req, res) => {
    console.log(req.files)
})

module.exports = router