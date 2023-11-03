import { Event } from "../interfaces/event";
import { BaseInteraction } from "discord.js";
import { getSuggetions } from "../Util/scrapers/bdnaash";
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
