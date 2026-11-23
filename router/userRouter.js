const express=require("express")
const router=express.Router()
const {register, login, refresh, logout}=require("../controller/userController")

router.route("/register").post(register)
router.route("/login").post(login)
router.post("/refresh",refresh)
router.post("/logout",logout)

module.exports=router