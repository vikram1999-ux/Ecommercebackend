import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";

// Create a new user
// export const newUser = TryCatch(
//     async (
//         req: Request<{}, {}, NewUserRequestBody>,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const { name, email, photo, dob, gender, _id } = req.body;

//         // Check if the required fields are provided
//         if (!_id || !name || !email || !photo || !gender || !dob) {
//             return next(new ErrorHandler("Please add all fields", 400));
//         }

//         // Check if a user already exists with the same email (or _id if needed)
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(200).json({
//                 success: true,
//                 message: `Welcome back, ${user.name}`,
//             });
//         }

//         // Create new user
//         user = await User.create({
//             name,
//             email,
//             photo,
//             gender,
//             _id,
//             dob: new Date(dob), // Ensure dob is a valid Date object
//         });

//         return res.status(201).json({
//             success: true,
//             message: `Welcome, ${user.name}`,
//         });
//     }
// );

export const newUser = TryCatch(
    async (
      req: Request<{}, {}, NewUserRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { name, email, photo, gender, _id, dob } = req.body;
  
      let user = await User.findById(_id);
  
      if (user)
        return res.status(200).json({
          success: true,
          message: `Welcome, ${user.name}`,
        });
  
      if (!_id || !name || !email || !photo || !gender || !dob)
        return next(new ErrorHandler("Please add all fields", 400));
  
      user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
      });
  
      return res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });
    }
  );

// Get all users
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});

    return res.status(200).json({
        success: true,
        users,
    });
});

// Get a single user by ID
export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404)); // 404 for not found
    }

    return res.status(200).json({
        success: true,
        user,
    });
});

// Delete a user
export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404)); // 404 for not found
    }

    await user.deleteOne();

    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});
