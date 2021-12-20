import sequelize from "./connect.js";

import s from 'sequelize'

const { DataTypes } = s

const Planner = sequelize.define(
    'planner',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
)





export default Planner