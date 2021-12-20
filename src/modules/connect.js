import { Sequelize } from "sequelize";

const { DB_URL } = process.env;

const sequelize = new Sequelize(DB_URL);

export const testDB = async() => {
    try {
        await sequelize.authenticate({ logging: false, force: true });
        console.log("Db authenticated");
    } catch (error) {
        console.log("Failed to autenticate", error);
    }
};

export default sequelize;