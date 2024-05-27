import { Router } from "express";
import {
  addproduct,
  getproduct,
  addToCart,
  getCart,
} from "./product.controller.js";
import { addUser } from "./user.controller.js";

const apiRoutes = Router();

apiRoutes.post("/product", addproduct);
apiRoutes.get("/product", getproduct);
apiRoutes.post("/user/signup", addUser);
apiRoutes.post("/add-to-cart", addToCart);
apiRoutes.get("/get-cart", getCart);

export default apiRoutes;
