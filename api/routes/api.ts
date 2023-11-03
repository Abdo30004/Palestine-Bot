import { Router } from "express";
import { getAljazeeraNews } from "../../Util/scrapers/aljazeera";
import { checkCompany, getSuggetions } from "../../Util/scrapers/bdnaash";
const api = Router();

api.get("/", (req, res) => {
  res.json({ message: "Welcome to Api V1" });
});

api.get("/check", async (req, res) => {
  let query = (req.query.query as string) || null;
  if (!query) {
    res.status(400).json({ message: "Missing query" });
    return;
  }
  let isProIsrael = await checkCompany(query);
  let suggetions = await getSuggetions(query);
  let message = isProIsrael
    ? "Company support israel, boycott it"
    : "Company dosn't support israel (or not found)";

  res.json({
    message,
    check: isProIsrael,
    suggetions,
  });
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
