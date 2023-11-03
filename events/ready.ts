import { Event } from "../interfaces/event";

import { getAljazeeraNews } from "../Util/scrapers/aljazeera";

let event: Event = {
  name: "ready",

  run: async (client) => {
    await client.updateCache();
    console.log(`${client.user?.tag} is ready!`);

    let SentNewsIds: string[] = [];

    setInterval(async () => {
      let news = await getAljazeeraNews(10);
      news = news.filter((n) => !SentNewsIds.includes(n.id));

      client.events.emit("news", news);

      SentNewsIds.push(...news.map((n) => n.id));
    }, 5000);
  },
};

export default event;
export { event };
