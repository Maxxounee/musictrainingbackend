import notes from "./SingleNotes.js";

class SingleNotesController {
    async getFiles(req, res) {
        console.log('request ===== ', req.body)

        let keyName
        if (req.body.keyName === 'random') {
            const keyNamesArray = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b']
            const randomIndex = Math.floor(Math.random()*12)
            keyName = keyNamesArray[randomIndex]
        } else {
            keyName = req.body.keyName
        }

        const modeName = req.body.modeName
        const numberOfOctaves = req.body.difficulty ? 3 : 1
        const firstOctave = req.body.difficulty ? 1 : 2

        let message = ''
        let sequenceFile
        let singleNotes = []
        async function getSingleNotes(degree, currentKey) {
            let notesIdArray = []
            // Находим id первой ноты. От нее будем отталкиваться при
            // создании списка из id необходимых нот при помощи degree (2212221)
            await notes.singleNotes
                .findOne({where: {noteName: keyName, octave: firstOctave}})
                .then(row => {
                    notesIdArray.push(row.dataValues.id)
                    for (let i in degree) {
                        notesIdArray.push(notesIdArray[i] + degree[i])
                    }
                })

            await notes.singleNotes
                .findAll({
                where: {id: notesIdArray }
            })
                .then((rows)=> {
                    let degreeStep = 1
                    for (let row of rows) {
                        singleNotes.push({
                            id: row.dataValues.id,
                            noteName: row.dataValues.noteName,
                            fileName: row.dataValues.noteFileName,
                            degree: degreeStep
                        })
                        degreeStep++
                    }
                })
                .catch((error) => {
                    message = 'Ошибка' + error
                    res.status(500).json({message: message})
                })

            res.status(200).json({notesArray: singleNotes, cadence: sequenceFile, currentKey: currentKey, message: message})
        }

        await notes.sequences
            .findOne({where: {modeKey: keyName, mode: modeName}})
            .then(data => {
                sequenceFile = data.dataValues.sequenceFileName
                const multiplyDegree = data.dataValues.modeDegree.repeat(numberOfOctaves)
                const degree = multiplyDegree.split('').map(elem => +elem)
                getSingleNotes(degree, data.dataValues.currentKey)
                message += 'Секвенция записана '
            })
            .catch((error) => {
                message = 'Ошибка' + error
                res.status(500).json({message: message})
            })
            }
}

export default new SingleNotesController()