function mergeProtocols(protocols) {
    let result = []
    protocols.forEach(protocol => {
        console.log(protocol)
        protocol.data.forEach(group => {
            let groupInRes = result.find(x => x.name === group.group)
            console.log(groupInRes)
            if(!groupInRes) {
                groupInRes = { name: group.group, members: [] }
                result.push(groupInRes)
            }

            group.members.forEach(member => {
                if (!groupInRes.members.find(x => x.name === member.name )) {
                    const { place, points } = member

                    delete member.resultTime
                    delete member.loss
                    member.place = {}
                    member.points = {}
                    member.place[protocol.name] = place
                    member.points[protocol.name] = points
                    groupInRes.members.push(member)
                } else {
                    const existingMember = groupInRes.members.find(x => x.name === member.name )

                    existingMember.place[protocol.name] = member.place || 0
                    existingMember.points[protocol.name] = member.points || 0
                }
            })
        })
    })
    return result
}

module.exports = mergeProtocols