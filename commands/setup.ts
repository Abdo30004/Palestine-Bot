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
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  defer: true,

  run: async (client, interaction) => {
    let [newsChannelId, prayChannelId] = ["news-channel", "pray-channel"].map(
      (k) =>
        interaction.options.data.find((o) => o.name === k)?.channel?.id || null
    );
    if (!newsChannelId && !prayChannelId) {
      await interaction.editReply(
        "Please provide a Palestine News Channel or/and a Pray Channel"
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
    await data.save();

    await interaction.editReply({
      embeds: [
        client.embed
          .make({
            title: `Guild ${interaction.guild?.name} setup`,
            description: `News Channel: ${
              newsChannel?.toString() || "None"
            }\n\nPray Channel: ${prayChannel?.toString() || "None"}`,
          })
          .author(interaction.user),
      ],
    });

    await client.updateCache();
    
    return true;
  },
};
export default command;
export { command };
