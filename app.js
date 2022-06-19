const app = require('express')(),
    router = require('./src/controllers/index'),
    PORT = 3000,
    bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})