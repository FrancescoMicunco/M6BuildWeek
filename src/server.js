import express from 'express'
import cors from 'cors'
import { testDB } from './modules/connect.js'
import sequelize from './modules/connect.js'

const server = express()

const port = process.env.PORT


server.use(express.json())
server.use(cors());

// ==========  end points ===============
//=======================================

// server.use("/tasks", tasksRouter);
// server.use("/planners", plannersRouter);

//========= connection area =====================
//===============================================

// Planner.hasMany(Tasks, { onDelete: "CASCADE" });
// Tasks.belongsTo(Planners, { onDelete: "CASCADE" });


//==========================================

console.table(server);
server.listen(process.env.PORT || 3001, async() => {
    console.log(`Server is running`);
    await testDB();
    await sequelize.sync({ logging: true, alter: true });
});

server.on("error", (error) => console.log("Server is not running", error));