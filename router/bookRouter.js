const express=require("express")
const router=express.Router()
const {addbook,getbook,findone,updateone,deleteone}=require("../controller/bookController.js")
const bookMulter=require("../middleware/bookMulter.js")
const validate=require("../middleware/validateToken.js")

router.use(validate)
router.route("/").post(bookMulter.single("image"),addbook).get(getbook)
router.route("/:id").get(findone).patch(bookMulter.single("image"),updateone).delete(deleteone)

module.exports=router