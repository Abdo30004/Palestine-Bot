import { Event } from "../interfaces/event";
import { BaseInteraction } from "discord.js";
import axios from "axios";
//import { Util } from "../Util/util";
async function getSuggetions(name: string): Promise<string[]> {
  let params = new URLSearchParams();
  params.append("query", name);
  let response = await axios
    .post(`https://bdnaash.com/home/searchSuggestions`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
      },
    })
    .catch((e) => e.response);
  return response?.data?.data?.map((d: any) => d.title) || [];
}
let event: Event = {
  name: "interactionCreate",
  async run(client, interaction: BaseInteraction) {
    if (!interaction.isAutocomplete()) return;
    if (interaction.commandName !== "check") return;

    let query = `${
      interaction.options.data.find((o) => o.name === "company")?.value
    }`;
    console.log(query);
    if (!query) return;
    let suggetions = await getSuggetions(query);

    await interaction.respond(
      suggetions.map((s) => ({ name: s, value: s }))
    );
  },
};

export default event;
export { event };
