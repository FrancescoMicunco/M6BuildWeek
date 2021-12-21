import { Sequelize } from "sequelize";
// import  dotenv from "dotenv"
// dotenv.config()

const { DB_URL } = process.env;

const sequelize = new Sequelize(
    DB_URL,

    {
        dialect: "postgres",

        dialectOptions: {

            // ssl: {
            //     require: true,
            //     rejectUnauthorized: false,
            // },
        },
    }
);



export const testDB = async() => {
    try {
        await sequelize.authenticate({ logging: false, force: true });
        console.log("Db authenticated");
    } catch (error) {
        console.log("Failed to autenticate", error);
    }
};

export default sequelize;