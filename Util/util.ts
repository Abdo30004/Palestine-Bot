import { Article } from "../interfaces/article";
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
} from "discord.js";
import axios from "axios";
class Util {
  static title(str: string) {
    if (str === null || str === "") return "";
    else str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  static getNewsMessage(article: Article) {
    let message = {
      embeds: [
        new EmbedBuilder()
          .setTitle(article.title)
          .setThumbnail(article.image?.url)
          .setDescription(article.description || null)
          .setFooter({
            text: `Source ${article.source.name}`,
            iconURL: article.source.logo,
          })
          .setColor(Colors.Red)
          .setTimestamp(new Date(article.date)),
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

    return message;
  }

  static async getNews(
    source: string,
    lang: string,
    number: number,
    search?: string
  ) {
    let url = `http://127.0.0.1:3000/api/news/${source}?lang=${lang}&number=${number}`;

    if (search) url += `&search=${search}`;
    let response = await axios.get(url).catch((err) => null);

    if (!response) return [];
    let articles: Article[] = response.data;
    return articles.filter((c) => c.description);
  }
}

export default Util;
export { Util };
