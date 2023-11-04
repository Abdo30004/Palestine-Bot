import { Article } from "../interfaces/article";
import { Event } from "../interfaces/event";

import axios from "axios";

let event: Event = {
  name: "ready",

  run: async (client) => {
    await client.updateCache();
    console.log(`${client.user?.tag} is ready!`);

    setInterval(async () => {
      for (let lang of ["ar", "en"]) {
        let response = await axios
          .get(`http://127.0.0.1:3000/api/news?lang=${lang}&number=10`)
          .catch((err) => null);
        if (!response) return;
        let articles: Article[] = response.data;
        client.events.emit(
          "news",
          articles.filter((c) => c.description),
          lang
        );
      }
    }, 10 * 1000);
  },
};

export default event;
export { event };
