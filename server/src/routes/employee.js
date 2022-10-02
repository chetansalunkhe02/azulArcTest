import express from "express"
import EmployeeController from "../controllers/EmployeeController";
var router = express.Router();

// employee routes
router.get("/list", EmployeeController.list)
router.post("/", EmployeeController.create)
router.get('/:id', EmployeeController.get)
router.put("/", EmployeeController.update)
router.delete("/:id", EmployeeController.delete)

export default router