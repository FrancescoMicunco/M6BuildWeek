import express from "express";
import { Op, Sequelize } from "sequelize";
import Planner from "../../modules/planner_model.js";
import Tasks from "../../modules/task_model.js";


const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const planner = await Planner.findAll({
                where: {
                    ...(req.query.search && {
                      [Op.or]: [
                        {
                          name: { [Op.iLike]: `%${req.query.search}%` },
                        },
                        
                      ],
                    }),
                },
                include: 
                   [ {
                      model: Tasks,
                      through: { attributes: [] },}]
                      , 
          
                      //filters by tasks
                      where: {
                        ...(req.query.search && {
                           
                            [Op.or]: [
                              {
                                content: { [Op.iLike]: `%${req.query.search}%` },
                              },
                              {
                                done: { [Op.iLike]: `%${req.query.search}%` },
                              },
                              {
                                "$planner.name$": {
                                  
                                  [Op.iLike]: "%" + req.query.search + "%",
                                },
                              }, ]
                      }),
                    }
                
                 
              

            });
            res.send(planner);
        } catch (error) {
            next(error);
        }
    })
    .post(async(req, res, next) => {
        try {

            const planner = await Planner.create(req.body);

            res.send(planner);
        } catch (error) {
            next(error);
        }
    });

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const planner = await Planner.findOne({
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
        const updatePlanner = await Planner.update(req.body, {
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
        const deletedPlanner = await Planner.destroy({
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