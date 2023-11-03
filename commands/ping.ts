import { Command } from "../interfaces/command";
import { SlashCommandBuilder } from "discord.js";
let command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .setDMPermission(false),
  defer: true,
  run: async (client, interaction) => {
    await interaction.editReply("Pong!");
    return true;
  },
};
export default command;
export { command };
