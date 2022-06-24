const express = require('express'),
    app = express(),
    router = require('./src/controllers/index'),
    PORT = 3000

app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})