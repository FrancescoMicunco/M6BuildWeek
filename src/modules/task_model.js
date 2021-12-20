import sequelize from "./connect.js";

import s from 'sequelize'

const { DataTypes } = s

const Task = sequelize.define(
    'task',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },

        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
)





export default Task