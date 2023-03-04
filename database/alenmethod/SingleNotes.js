import Sequelize from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize.Sequelize(
    config.database,
    config.username,
    config.password,
    {
        dialect: "mysql",
        host: config.host
    }
)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to DB')
    })
    .catch((error) => {
        console.log('Ошибка подключения к БД', error)
    })

const notes = {
    singleNotes: sequelize.define(
        'singleNotes',
        {
            id: {
                type: Sequelize.NUMBER,
                primaryKey: true
            },
            noteName: {
                type: Sequelize.STRING
            },
            octave: {
                type: Sequelize.NUMBER
            },
            noteFileName: {
                type: Sequelize.STRING
            }
        }, {
            createdAt: false,
            updatedAt: false
        }
    ),
    sequences: sequelize.define(
        'sequences',
        {
            id: {
                type: Sequelize.NUMBER,
                primaryKey: true
            },
            modeKey: {
                type: Sequelize.STRING
            },
            currentKey: {
                type: Sequelize.STRING
            },
            mode: {
                type: Sequelize.STRING
            },
            modeDegree: {
                type: Sequelize.STRING
            },
            sequenceFileName: {
                type: Sequelize.STRING
            }
        }, {
            createdAt: false,
            updatedAt: false
        }
    )


}
export default notes