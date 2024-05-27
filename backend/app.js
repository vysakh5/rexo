import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRoutes from "./apis/routes.js";
import cors from "cors";

const connectToDb = async () => {
  const dbUri = process.env.DB_URI;

  if (!dbUri) {
    console.log("Database uri not set on ENV");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUri);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

connectToDb();

// app.get("/", (req, res) => {
//   return res.send("hey server is running 2");
// });
app.use(cors());

app.use(express.json());

app.use("/api", apiRoutes);

app.listen(PORT);
