import express from "express"
import { createUser, loginUser, updateUser,deleteUser } from "../controllers/user";
import { fetchAndAuthenticate } from "../middleware/fetchUser";
const router=express.Router()

router.post("/createUser",createUser)
router.post("/loginUser",loginUser)
router.put("/updateUser/:id",fetchAndAuthenticate,updateUser)
router.delete("/deleteUser/:id",fetchAndAuthenticate,deleteUser)


  

export default router;