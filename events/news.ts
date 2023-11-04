import { Event } from "../interfaces/event";
import { Article } from "../interfaces/article";
import { Util } from "../Util/util";
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
function getNewsMessage(article: Article) {
  return {
    embeds: [
      new EmbedBuilder()
        .setTitle(article.title)
        .setThumbnail(article.image?.url)
        .setDescription(article.description || null)
        .setFooter({
          text: `Source ${article.source.name}`,
          iconURL: article.source.logo,
        }),
      // .setTimestamp(article.date.getTime()),
    ],
    components: [
      new ActionRowBuilder<ButtonBuilder>().setComponents(
        new ButtonBuilder()
          .setURL(article.link)
          .setStyle(ButtonStyle.Link)
          .setLabel("Link")
      ),
    ],
  };
}



let event: Event = {
  name: "news",
  subEvent: true,

  run: async (client, news: Article[], lang: "ar" | "en") => {
    if (!news.length) return;

    for (let guildSettings of client.cache.filter(
      (c) => c.settings.language === lang
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
        await newsChannel.send(getNewsMessage(newsToSend[i]));

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
