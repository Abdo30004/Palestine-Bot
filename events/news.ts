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
    embed: new EmbedBuilder()
      .setTitle(article.title)
      .setThumbnail(article.image?.url)
      .setDescription(article.description)
      .setTimestamp(),
    button: new ActionRowBuilder().setComponents(
      new ButtonBuilder().setURL(article.link).setStyle(ButtonStyle.Link)
    ),
  };
}
let event: Event = {
  name: "news",
  subEvent: true,

  run: async (client, news: Article[]) => {
    console.log("Article", news);

    for (let guildSettings of client.cache) {
      let guild = client.guilds.cache.get(guildSettings._id);
      if (!guild) continue;
      let newsChannel = guild.channels.cache.get(
        guildSettings.settings.newsChannel
      );
      let newsMSg = getNewsMessage(news[0]);
      if (!newsChannel || newsChannel.type) return;
      await newsChannel.send({
        embeds: [],
      });
      await Util.wait(1000);
    }
  },
};

export default event;
export { event };