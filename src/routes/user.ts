import express from "express";
import { newUser,getAllUsers,getUser,deleteUser } from "../controllers/user.js";
import {adminOnly} from '../middlewares/auth.js';

const app = express.Router();

// route - /api/v1/users/new
app.post("/new", newUser);

// route - /api/v1/users/all
app.get("/all", adminOnly, getAllUsers);

// route - /api/v1/users/dynamicID
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);

export default app; 