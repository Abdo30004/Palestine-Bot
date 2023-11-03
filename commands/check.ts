import { Command } from "../interfaces/command";
import { SlashCommandBuilder } from "discord.js";
import axios from "axios";

async function checkCompany(name: string): Promise<boolean> {
  let params = new URLSearchParams();
  params.append("query", name);
  params.append("type", "Keyword");

  let response = await axios.post(`https://bdnaash.com/search`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      Cookie: "v4bdnaash_session=mo7ko5t2ph8rlg8cbi3o01bvke2tuqnr;",
    },
  });

  return response?.data?.data?.is_pro_israel === "1";
}


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
