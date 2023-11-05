import { Command } from "../interfaces/command";

import {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
} from "discord.js";
let command: Command = {
  data: new SlashCommandBuilder()

    .setName("setup")
    .setDescription("setup the bot for your server")
    .addStringOption((option) =>
      option
        .setName("language")
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
    .addChannelOption((option) =>
      option
        .addChannelTypes(ChannelType.GuildAnnouncement, ChannelType.GuildText)
        .setName("news-channel")
        .setDescription("The channel where the bot will send Palestine News")
    )
    .addChannelOption((option) =>
      option
        .addChannelTypes(ChannelType.GuildAnnouncement, ChannelType.GuildText)
        .setName("pray-channel")
        .setDescription(
          "The channel where the bot will send reminders to pray for Palestine"
        )
    )
    .addBooleanOption((option) =>
      option.setName("news-sending").setDescription("news sending on/off")
    )
    .addBooleanOption((option) =>
      option.setName("pray-sending").setDescription("pray sending on/off")
    )

    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  defer: true,

  run: async (client, interaction) => {
    let [newsChannelId, prayChannelId] = ["news-channel", "pray-channel"].map(
      (k) =>
        interaction.options.data.find((o) => o.name === k)?.channel?.id || null
    );
    let language = `${
      interaction.options.data.find((o) => o.name === "language")?.value
    }`;
    let [newsSending, praySending] = ["news-sending", "pray-sending"].map((k) =>
      Boolean(interaction.options.data.find((o) => o.name === k)?.value)
    );

    if (!newsChannelId && !prayChannelId && !language) {
      await interaction.editReply(
        "Please provide a Palestine News Channel or/and a Pray Channel and/or a language and/or news/pray sending on/off"
      );
      return true;
    }
    let newsChannel = await interaction.guild?.channels
      .fetch(`${newsChannelId}`)
      .catch(() => null);
    let prayChannel = await interaction.guild?.channels
      .fetch(`${prayChannelId}`)
      .catch(() => null);

    let data = await client.db.Guild.findById(interaction.guildId);

    if (!data) {
      data = new client.db.Guild({
        _id: interaction.guildId,
      });
    }

    if (newsChannel) data.settings.newsChannel = newsChannel.id;
    if (prayChannel) data.settings.prayChannel = prayChannel.id;

    if (newsSending !== data.enabled.news) data.enabled.news = newsSending;
    if (praySending !== data.enabled.pray) data.enabled.pray = praySending;
    if (language === "ar" || language === "en")
      data.settings.language = language;
    await data.save();

    await interaction.editReply({
      embeds: [
        client.embed
          .make({
            title: `Guild ${interaction.guild?.name} setup`,
            fields: [
              {
                name: "News Channel",
                value: data.settings.newsChannel
                  ? `<#${data.settings.newsChannel}>`
                  : "Not set, please set it using `/setup`",
              },
              {
                name: "News Sending",
                value: data.enabled.news ? "On" : "Off",
              },

              {
                name: "Pray Channel",
                value: data.settings.newsChannel
                  ? `<#${data.settings.newsChannel}>`
                  : "Not set, please set it using `/setup`",
              },
              {
                name: "Pray Sending",
                value: data.enabled.pray ? "On" : "Off",
              },
              {
                name: "Language",
                value: data.settings.language,
              },
            ],
          })
          .author(interaction.user)
          .color("Gold"),
      ],
    });

    await client.updateCache();

    return true;
  },
};
export default command;
export { command };
