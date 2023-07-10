import express from "express";
import auth from "./auth";
import users from "./users";
import recipes from "./recipes";
const router = express.Router();

export default (): express.Router => {
  auth(router);
  users(router);
  recipes(router);
  return router;
};
