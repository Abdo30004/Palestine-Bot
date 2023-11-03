import { Router } from "express";
import { getAljazeeraNews } from "../scrapers/aljazeera";
const api = Router();

api.get("/", (req, res) => {
  res.json({ message: "Welcome to Api V1" });
});

api.get("/news/aljazeera", async (req, res) => {
  let n = parseInt(req.query.number as string) || 10;
  let news = await getAljazeeraNews(n).catch((err) => null);
  if (!news) {
    res.status(500).json({ message: "Error while fetching news" });
    return;
  }
  res.json(news);
});

export { api };
