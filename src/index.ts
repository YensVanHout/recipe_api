import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
require("dotenv").config();

const app = express();

app.use(cors({ credentials: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

const Mongo_uri: string = process.env.MONGO_URI || "";

mongoose.Promise = Promise;
mongoose.connect(Mongo_uri, {
  dbName: "recipeApp",
});
mongoose.connection.on("error", (error) => console.log(error));

app.use("/", router());
