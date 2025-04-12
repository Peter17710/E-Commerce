import express from "express"
import { addUser, changePasssword, deleteUser, getUser, getUsers, updateUser } from "./userController.js";

const userRoutes = express.Router()

userRoutes.route("/")
.post(addUser)
.get(getUsers)


userRoutes.route("/:id")
.get(getUser)
.put(updateUser)
.delete(deleteUser)

 userRoutes.patch("/changePassword/:id" , changePasssword)
export default userRoutes;