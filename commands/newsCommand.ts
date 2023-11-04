import { Article } from "../interfaces/article";
import { Command } from "../interfaces/command";
import {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { Util } from "../Util/util";
let command: Command = {
  data: new SlashCommandBuilder()
    .setName("news")
    .setDescription("get the newest news")
    .addStringOption((option) =>
      option
        .setName("source")
        .setDescription("The source of the news")
        .addChoices(
          ...[
            {
              name: "Aljazeera",
              value: "aljazeera",
            },
            {
              name: "Al-Quassam brigades (Telegram)",
              value: "qassambrigades",
            },
          ]
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("language")
        .setRequired(true)
        .setDescription("The language of the news")
        .addChoices(
          ...[
            {
              name: "English",
              value: "en",
            },
            {
              name: "Arabic",
              value: "ar",
            },
          ]
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("The number of news to send")
        .setMaxValue(100)
        .setMinValue(1)
    )
    .addStringOption((option) =>
      option.setName("query").setDescription("The query to search for")
    ),
  defer: true,
  run: async (client, interaction) => {
    let source = `${
      interaction.options.data.find((o) => o.name === "source")?.value
    }`;
    let lang = `${
      interaction.options.data.find((o) => o.name === "language")?.value
    }`;

    let number = Number(
      interaction.options.data.find((o) => o.name === "number")?.value
    );

    let query = interaction.options.data
      .find((o) => o.name === "query")
      ?.value?.toString();

    if (!number) number = 10;

    let articles: Article[] = await Util.getNews(source, lang, number, query);

    if (!articles.length) {
      await interaction.editReply("No news found");
      return true;
    }

    let page = 0;

    let row = new ActionRowBuilder<ButtonBuilder>().setComponents(
      new ButtonBuilder()
        .setCustomId("news-previous")
        .setStyle(ButtonStyle.Danger)
        .setLabel("Previous")
        .setDisabled(number === 1),
      new ButtonBuilder()
        .setCustomId("news-next")
        .setStyle(ButtonStyle.Success)
        .setLabel("Next")
        .setDisabled(number === 1)
    );
    let articleMessage = Util.getNewsMessage(articles[page]);

    let message = await interaction.editReply({
      embeds: articleMessage.embeds,
      components: [...articleMessage.components, row],
    });

    let collector = message.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 1000 * 60 * 5,
    });

    collector.on("collect", async (i) => {
      await i.deferUpdate();
      switch (i.customId) {
        case "news-next":
          page++;
          if (page >= articles.length) page = 0;
          break;
        case "news-previous":
          page--;
          if (page < 0) page = articles.length - 1;
          break;
      }
      articleMessage = Util.getNewsMessage(articles[page]);
      await interaction.editReply({
        embeds: articleMessage.embeds,
        components: [...articleMessage.components, row],
      });
    });

    collector.on("end", async (c) => {
      await interaction
        .editReply({
          embeds: articleMessage.embeds,
          components: [...articleMessage.components],
        })
        .catch(() => null);
    });

    return true;
  },
};

export default command;
export { command };
