const parseFiles = require('../services/FileParser')

function getFiles(files) {
    files.forEach(file => (checkExtension(file.originalname)))

    const encoding = 'windows-1251'

    return files.map(file => {
        return {
            name: file.originalname,
            data: parseFiles(new TextDecoder(encoding).decode(file.buffer))
        }
    })
}

function checkExtension(fileName) {
    if (fileName !== 'htm') {
        // TODO: throw exception
    }
}

module.exports = getFiles