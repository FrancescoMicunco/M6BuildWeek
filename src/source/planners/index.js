import express from "express";
import { Op, Sequelize } from "sequelize";
import Planners from "../../modules/planners.js";
import Tasks from "../../modules/tasks.js";


const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const planner = await Planners.findAll({
                include: Tasks,

            });
            res.send(planner);
        } catch (error) {
            next(error);
        }
    })
    .post(async(req, res, next) => {
        try {

            const planner = await Planners.create(req.body);

            res.send(planner);
        } catch (error) {
            next(error);
        }
    });

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const planner = await Planners.findOne({
                where: {
                    id: req.params.id,
                },
                include: [Tasks],
                //===== here eventually join
            });
            res.send(planner);
        } catch (error) {
            next(error);
        }
    })

.put(async(req, res, next) => {
    try {
        const updatePlanner = await Planners.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(updatePlanner);
    } catch (error) {
        next(error);
    }
})

.delete(async(req, res, next) => {
    try {
        const deletedPlanner = await Planners.destroy({
            where: { id: req.params.id },
        });
        if (deletedPlanner > 0) {
            res.send("201. planner deleted");
        } else {
            ("planner not found!");
        }
    } catch (error) {
        next(error);
    }
});

export default router;