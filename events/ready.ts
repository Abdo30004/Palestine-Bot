import { Article } from "../interfaces/article";
import { Event } from "../interfaces/event";
import { Util } from "../Util/util";
let event: Event = {
  name: "ready",

  run: async (client) => {
    await client.updateCache();
    console.log(`${client.user?.tag} is ready!`);
return
    setInterval(async () => {
      for (let lang of ["ar", "en"]) {
        let articles: Article[] = await Util.getNews("aljazeera", lang, 10);
        client.events.emit("news", articles, lang);
      }
    }, 10 * 1000);
  },
};

export default event;
export { event };
