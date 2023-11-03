import { Client } from "../Base/client";

import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  SlashCommandSubcommandsOnlyBuilder,
  SlashCommandSubcommandGroupBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";
type SlashCommandOnly = Omit<
  SlashCommandBuilder,
  "addSubcommand" | "addSubcommandGroup" | "addSubcommands"
>;
interface Command {
  data:
    | SlashCommandBuilder
    | SlashCommandOnly
    | SlashCommandSubcommandBuilder
    | SlashCommandSubcommandGroupBuilder
    | SlashCommandSubcommandsOnlyBuilder;
  defer?: boolean;
  ephemeral?: boolean;
  run: (
    client: Client,
    interaction: ChatInputCommandInteraction,
    ...args: any[]
  ) => Promise<boolean>;
}

export default Command;
export { Command };
