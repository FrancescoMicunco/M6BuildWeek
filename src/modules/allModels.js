import Task from "./task_model";
import Planner from "./planner_model";

Planner.hasMany(Task, { onDelete: "CASCADE" });
Task.belongsTo(Planner, { onDelete: "CASCADE" });

export {Task, Planner}
