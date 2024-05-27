import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["regular", "normal", "special"],
      default: "normal",
    },
    category: {
      type: String,
      required: true,
    },
    discount: {
      minQty: Number,
      value: Number,
      type: {
        type: String,
        enum: ["Fixed", "percentage"],
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
