import { Sequelize } from "sequelize";

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",

    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

export const testDB = async() => {
    try {
        await sequelize.authenticate({ logging: false, alter: true });
        console.log("Db authenticated");
    } catch (error) {
        console.log("Failed to autenticate", error);
    }
};

export default sequelize;