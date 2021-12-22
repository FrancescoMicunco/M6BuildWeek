import express from "express";
import { Op, Sequelize } from "sequelize";
import Planner from "../../modules/planner_model.js";
import Tasks from "../../modules/task_model.js";

const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const task = await Tasks.findAll({
                include: [Planner],
            });
            res.send(task);
        } catch (error) {
            next(error);
        }
    })
    .post(async(req, res, next) => {
        try {
            const task = await Tasks.create(req.body);
            res.send(task);
        } catch (error) {
            next(error);
        }
    });

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const task = await Tasks.findOne({
                where: {
                    id: req.params.id,
                },
                include: [Planner],
            });
            res.send(task);
        } catch (error) {
            next(error);
        }
    })

.put(async(req, res, next) => {
    try {
        const updateTask = await Tasks.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(updateTask);
    } catch (error) {
        next(error);
    }
})

.delete(async(req, res, next) => {
    try {
        const deletedTask = await Tasks.destroy({
            where: { id: req.params.id },
        });
        if (deletedTask > 0) {
            res.send("201. task deleted");
        } else {
            ("task not found!");
        }
    } catch (error) {
        next(error);
    }
});

export default router;