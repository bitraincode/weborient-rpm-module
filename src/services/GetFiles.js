const parseFiles = require('../services/FileParser')

function getFiles(files, options) {
    files.forEach(file => (checkExtension(file.originalname)))

    const encoding = 'windows-1251',
        { points } = options

    return files.map(file => {
        return {
            name: file.originalname,
            data: parseFiles(new TextDecoder(encoding).decode(file.buffer), points)
        }
    })
}

function checkExtension(fileName) {
    if (fileName !== 'htm') {
        // TODO: throw exception
    }
}

module.exports = getFiles