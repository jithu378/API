const express=require("express")
const router=express.Router()
const {getBooks,AddBook,getOneBook}=require("../controller/bookController.js")
const bookMulter=require("../middleware/bookMulter.js")
const validate=require("../middleware/validateToken.js")
router.use(validate);
router.route("/").get(getBooks).post(bookMulter.single("image"),AddBook);
router.route("/:id").get(getOneBook)
module.exports=router;