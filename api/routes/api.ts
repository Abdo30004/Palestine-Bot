import { Router } from "express";
import { getAljazeeraNews } from "../../Util/scrapers/aljazeera";
import { getQassamNews } from "../../Util/scrapers/qassamtl";
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

api.get("/news/:id", async (req, res) => {
  let number = parseInt(req.query.number as string) || 10;
  let search = req.query.search as string | undefined;
  let news = null;
  switch (req.params.id) {
    case "aljazeera":
      news = await getAljazeeraNews(number, search);
      break;
    case "qassambrigades":
      news = await getQassamNews(number, search);
      break;
    default:
      res
        .status(404)
        .json({ message: "Source not found, use aljazeera/qassambrigades" });
      return;
  }

  if (!news.length && !search) {
    res.status(404).json({ message: "No news found" });

    return;
  }

  if (!news.length) {
    res.status(500).json({ message: "Error while fetching news" });
    return;
  }

  res.json(news);
});

export { api };
