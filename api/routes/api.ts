import { Router } from "express";

const api = Router();

api.get("/", (req, res) => {
  res.json({ message: "Welcome to Api V1" });
});



export { api };
