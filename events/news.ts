import { Event } from "../interfaces/event";
import { Article } from "../interfaces/article";
import { Util } from "../Util/util";



let event: Event = {
  name: "news",
  subEvent: true,

  run: async (client, news: Article[], lang: "ar" | "en") => {
    if (!news.length) return;

    for (let guildSettings of client.cache.filter(
      (c) => c.settings.language === lang && c.enabled.news
    )) {
      let guild = client.guilds.cache.get(guildSettings._id);
      if (!guild) continue;
      let newsChannel = guild.channels.cache.get(
        guildSettings.settings.newsChannel
      );

      let newsToSend = news.filter((n) => {
        let check = !guildSettings.sentNews.includes(n.id);
        return check;
      });

      if (!newsToSend.length || !newsChannel || newsChannel.type) continue;

      for (let i = 0; i < newsToSend.length; i++) {
        await newsChannel.send(Util.getNewsMessage(newsToSend[i]));

        guildSettings.sentNews.push(newsToSend[i].id);
        i++;
        await Util.wait(1000);
      }
      await Util.wait(1000);
    }
  },
};

export default event;
export { event };
