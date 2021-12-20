import Tasks from "./task_model";
import Planners from "./planner_model";

Planners.hasMany(Tasks, { onDelete: "CASCADE" });
Tasks.belongsTo(Planners, { onDelete: "CASCADE" });

export {Tasks, Planners}
