const HTMLParser = require('node-html-parser')

let pointsBy = 'place'

function parseFile(file, points) {
    pointsBy = points
    return getGroups(HTMLParser.parse(file, { blockTextElements: { pre: true } }))
}

function getGroups(root) {
    const pre = root.getElementsByTagName('pre'),
        h2 = root.getElementsByTagName('h2')

    return pre.map((group, index) => {
        group = group.toString().split('<tr>')
        group = group.slice(2, group.length)

        const [ groupName, controlPointsAmount, distance ] = h2[index].toString().replace('<h2>', '').replace('</h2>', '').split(', ')
        const groupMembers = group.map(member => {
            return createParticipantObject(member.replace(/\r\n/, ''))
        })

        const groupLeader = groupMembers.find(member => member?.loss === "+00:00" || member.place === "1" )
        groupLeader.points = 100

        setMemberPoints(groupLeader.resultTime, groupMembers)

        return {
            group: groupName,
            controlPointsAmount,
            distance,
            members: groupMembers
        }
    })
}

function createParticipantObject(participantArr) {
    const [ n, name, organization,
            qualification, number, birthYear,
            resultTime, loss, place ] = participantArr.split(/<\/td>/).map(item => {
                return item.replace('<td>', '').trim()
            })

    return {
        name,
        organization,
        qualification,
        number,
        birthYear,
        resultTime,
        loss,
        place,
    }
}

function getMemberTimeInSecs(timeString) {
    const [hours, mins, secs] = timeString.split(':')
    return +hours*60*60 + +mins*60 + +secs
}

function setMemberPoints(leaderResultTime, members) {
    members.forEach(member => {
        if (!member.hasOwnProperty('points')) {
            if (member.resultTime) {
                member.points = (100 * getMemberTimeInSecs(leaderResultTime) / getMemberTimeInSecs(member.resultTime)).toFixed(2)
            } else {
                member.points = 0
            }
        }
    })
}


module.exports = parseFile