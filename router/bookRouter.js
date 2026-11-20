const express=require("express")
const router=express.Router()
const {GetBooks,AddBook,getOneBook}=require("../controller/bookController.js")
const bookMulter=require("../middleware/bookMulter.js")
const validate=require("../middleware/validateToken.js")
router.use(validate);
router.route("/").get(GetBooks).post(bookMulter.single("image"),AddBook);
module.exports=router;