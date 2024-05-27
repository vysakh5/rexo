import Product from "../model/product.model.js";
import Cart from "../model/cart.model.js";
import Coupon from "../model/coupon.model.js";

export const addproduct = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();

    return res.status(200).json({
      message: "product saved",
      data: savedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error on adding user",
    });
  }
};

export const getproduct = async (req, res) => {
  try {
    const { type, category } = req.query;

    const findQuery = {};

    if (type) {
      findQuery.type = type;
    }

    if (category) {
      findQuery.category = category;
    }

    if (type && category) {
      findQuery.type = type;
      findQuery.category = category;
    }

    const data = await Product.find(findQuery).lean();

    return res.status(200).json({
      message: "products",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error on adding user",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const newCart = new Cart(data);
    const savedcart = await newCart.save();

    return res.status(200).json({
      message: "product added to cart",
      data: savedcart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error on adding user",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const findQuery = {};

    const data = await Cart.find(findQuery).populate("productId").lean();

    return res.status(200).json({
      message: "Cart",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error on adding user",
    });
  }
};

export const checkOut = async (req, res) => {
  try {
    const { couponCode } = req.body;

    const findQuery = {
      expirationDate: {
        $lt: new Date().toISOString(),
      },
      couponCode,
    };

    const couponData = Coupon.find(findQuery).lean();

    if (!couponData) {
      return res.status(400).json({
        message: "No coupon found",
      });
    }

    const { type, value } = couponData;

    const data = await Cart.find(findQuery).populate("productId").lean();

    return res.status(200).json({
      message: "Cart",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error on adding user",
    });
  }
};
