import express from 'express'
import cors from 'cors'
import { testDB } from './modules/connect.js'
import sequelize from './modules/connect.js'




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


server.listen(process.env.PORT || 3001, async() => {
    console.log(`Server is running`);
    await testDB();
    await sequelize.sync({ logging: true, alter: true });
    // await testDB();
    // await sequelize.sync({ logging: true });
});

server.on("error", (error) => console.log("Server is not running", error));