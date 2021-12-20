import express from 'express'
import cors from 'cors'
import { testDB } from './modules/connect.js'
import sequelize from './modules/connect.js'
import {
    badRequest,
    unauthorized,
    notFound,
    genericErr,
} from "./middlewares/errorsHandler.js";
import plannerRouter from './source/planners/index.js'
import taskRouter from './source/tasks/index.js'




const server = express()

// =================  MIDDELWARES ===============
//==============================================

const whiteList = [process.env.REACT_APP_FE_REMOTE_URL, process.env.REACT_APP_FE_LOCAL_URL]
const corsOption = {
    origin: function(origin, next) {
        if (!origin || whiteList.indexOf(origin) !== -1) {
            next(null, true)
        } else {
            next(new Error("Cors Error occurred!"))
        }
    }
}
server.use(cors(corsOption))
server.use(express.json());




// ==========  end points ===============
//=======================================


server.use("/planner", plannerRouter);
server.use("/task", taskRouter);

//========= connection area =====================
//===============================================

Planner.hasMany(Tasks, { onDelete: "CASCADE" });
Tasks.belongsTo(Planners, { onDelete: "CASCADE" });


//==============ERRORS =====================

server.use(badRequest);
server.use(unauthorized);
server.use(notFound);
server.use(genericErr);

console.table(listendpoints(server));
server.listen(process.env.PORT || 3001, async() => {
    console.log(`Server is running`);
    await testDB();
    await sequelize.sync({ logging: true, alter: true });

    // await sequelize.sync({ logging: true });
});

server.on("error", (error) => console.log("Server is not running", error));