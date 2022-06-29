function getFiles(files) {
    files.forEach(file => (checkExtension(file.originalname)))

    const encoding = 'windows-1251'
    let csvStringMap = new Map()
    files.forEach(file => {
        csvStringMap.set(file.originalname, new TextDecoder(encoding).decode(file.buffer))
    })
    return csvStringMap
}

function checkExtension(fileName) {
    if (fileName !== 'htm') {
        // TODO: throw exception
    }
}

module.exports = getFiles