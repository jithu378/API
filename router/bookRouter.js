const express=require("express")
const router=express.Router()
const {addBook,getBooks,getOneBook,updateBook,deleteBook}=require("../controller/bookController.js")
const bookMulter=require("../middleware/bookMulter.js")
const validate=require("../middleware/validateToken.js")

router.use(validate)
router.route("/").post(bookMulter.single("image"),addBook).get(getBooks)
router.route("/:id").get(getOneBook).patch(bookMulter.single("image"),updateBook).delete(deleteBook)

module.exports=router