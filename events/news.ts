import { Event } from "../interfaces/event";
import { Article } from "../interfaces/article";
import { Util } from "../Util/util";
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { client } from "telegram";
function getNewsMessage(article: Article) {
  return {
    embeds: [
      new EmbedBuilder()
        .setTitle(article.title)
        .setThumbnail(article.image?.url)
        .setDescription(article.description)
        .setFooter({
          text: `Source ${article.source}`,
        })
        .setTimestamp(article.date),
    ],
    button: new ActionRowBuilder<ButtonBuilder>().setComponents(
      new ButtonBuilder()
        .setURL(article.link)
        .setStyle(ButtonStyle.Link)
        .setLabel("Link")
    ),
  };
}
let event: Event = {
  name: "news",
  subEvent: true,

  run: async (client, news: Article[]) => {
    if (!news.length) return;
    //console.log("Article", news);

    for (let guildSettings of client.cache) {
      let guild = client.guilds.cache.get(guildSettings._id);
      if (!guild) continue;
      let newsChannel = guild.channels.cache.get(
        guildSettings.settings.newsChannel
      );
      let newsMessages = news.map(getNewsMessage);

      if (!newsChannel || newsChannel.type) continue;
      for (let message of newsMessages) {
        newsChannel.send(message);
      }
      await Util.wait(1000);
    }
  },
};

export default event;
export { event };
