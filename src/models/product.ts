import mongoose from  "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter Name"],
        },
        photo: {
            type: String,
            required: [true, "Please enter Product Image"],
        },
        price: {
            type: Number,
            required: [true, "Please enter product Price"],
            min: [0, "Price must be greater than or equal to 0"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter Product Stock"],
            min: [0, "Stock must be greater than or equal to 0"],
        },
        category: {
            type: String,
            required: [true, "Please enter Product Category"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", schema);