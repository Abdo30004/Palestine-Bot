import express, { NextFunction } from "express";
import { routes } from "./routes/export";
import { Logger } from "../Util/logger";
const app = express();

app.use(Logger.logApiRequest);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

for (let route of routes) {
  app.use(route.path, route.router);
}

app.get("/", (_req, res) => {
  throw new Error("Hello World");
  res.status(200).json({ message: "Hello World" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

app.use((err: any, _req: any, res: any, next: NextFunction) => {
  res.status(500).json({ message: "Internal Server Error" });
});

export { app };
