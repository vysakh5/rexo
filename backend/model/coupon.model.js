import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      require: true,
    },
    value: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
      enum: ["Fixed", "percentage"],
    },
    expirationDate: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;
