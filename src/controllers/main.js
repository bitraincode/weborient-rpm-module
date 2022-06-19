const router = require('express').Router()

router.get('/ping', (req, res) => {
    res.send('pong')
})

router.post('/post-test', (req, res) => {
    res.send(req.body)
})

module.exports = router