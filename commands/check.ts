import { Command } from "../interfaces/command";
import { SlashCommandBuilder } from "discord.js";
import { checkCompany } from "../Util/scrapers/bdnaash";

let command: Command = {
  data: new SlashCommandBuilder()
    .setName("check")
    .setDescription("check if a company must be boycotted (support israel)")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setAutocomplete(true)
        .setName("company")
        .setDescription("company name")
        .setRequired(true)
    ),
  defer: true,
  run: async (client, interaction) => {
    let company = `${
      interaction.options.data.find((o) => o.name === "company")?.value
    }`;
    let isProIsrael = await checkCompany(company);

    if (!isProIsrael) {
      await interaction.editReply(`The company ${company} is not pro israel`);
      return true;
    }

    await interaction.editReply(
      `The company ${company} is pro israel, boycott it!`
    );

    return true;
  },
};
export default command;
export { command };
