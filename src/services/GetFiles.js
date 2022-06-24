function getFiles(files) {
    files.forEach(file => (checkExtension(file.originalname)))

    const encoding = 'windows-1251'
    let csvStringArray = []
    files.forEach(file => {
        csvStringArray.push(new TextDecoder(encoding).decode(file.buffer))
    })
    console.log(csvStringArray)
}

function checkExtension(fileName) {
    if (fileName !== 'csv') {
        // TODO: throw exception
    }
}

module.exports = getFiles