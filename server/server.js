import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8800;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Running!");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server running of port " + PORT);
});
