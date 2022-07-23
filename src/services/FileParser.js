const HTMLParser = require('node-html-parser')

function parseFile(file) {
    return getGroups(HTMLParser.parse(file, { blockTextElements: { pre: true } }))
}

function getGroups(root) {
    const pre = root.getElementsByTagName('pre'),
        h2 = root.getElementsByTagName('h2')

    return pre.map((group, index) => {
        group = group.toString().split('<tr>')
        group = group.slice(2, group.length)
        const [ groupName, controlPointsAmount, distance ] = h2[index].toString().replace('<h2>', '').replace('</h2>', '').split(', ')
        return {
            group: groupName,
            controlPointsAmount,
            distance,
            members: group.map(member => {
                return createParticipantObject(member.replace(/\r\n/, ''))
            })
        }
    })
}

function createParticipantObject(participantArr) {
    participantArr = participantArr.split(/<\/td>/).map(item => {
        return item.replace('<td>', '').trim()
    })
    const [ n, name, organization, qualification, number, birthYear, resultTime, loss, place ] = participantArr
    return {
        name,
        organization,
        qualification,
        number,
        birthYear,
        resultTime,
        loss,
        place
    }
}

module.exports = parseFile