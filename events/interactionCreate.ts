import { Event } from "../interfaces/event";
import { BaseInteraction } from "discord.js";

let event: Event = {
  name: "interactionCreate",
  async run(client, interaction: BaseInteraction) {
    if (!interaction.isChatInputCommand()) return;
    let command = client.commands.get(interaction.commandName);
    if (!command) {
      await interaction.reply({
        content: "The command you are trying to execute does not exist!",
        ephemeral: true,
      });
      return;
    }
    if (command.defer) {
      await interaction.deferReply({ ephemeral: command.ephemeral });
    }
    try {
      await command.run(client, interaction);
    } catch (error) {
      console.log(error);
      interaction[interaction.deferred ? "editReply" : "reply"]({
        content: "There was an error while executing this command!",
      });
    }
  },
};

export default event;
export { event };
