const express = require("express");
const {getAllTask, addOneTask, updateTask, deleteTask} = require("../controller/taskController")


const router = express.Router();

// router.get("/", getAllTask);
// router.post("/", addOneTask);
// router.put("/:id", updateTask);
// router.delete("/:id", deleteTask);

router.route("/").get(getAllTask).post(addOneTask);
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router