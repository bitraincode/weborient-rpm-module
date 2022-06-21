const busboy = require('busboy')

module.exports = {
    getFile(req, res, encoding = 'windows-1251') {
        const bb = busboy({ headers: req.headers })
        let fileData = []
        bb.on('file', (name, file, info) => {
            const { filename } = info,
                fileExt = filename.split('.')[1]
            console.log(info)
            console.log(name);
            console.log(file);
            if (fileExt !== 'csv') {
                res.send('Files must be .csv')
                return
            }
            file.on('data', data => {
                fileData.push(new TextDecoder(encoding).decode(data))
            }).on('close', () => {
                console.log(`${filename} is received`);
            })
        })
        bb.on('close', () => {
            res.writeHead(303, { Connection: 'close' })
            res.end()
        })
        req.pipe(bb)
        return fileData
    }
}