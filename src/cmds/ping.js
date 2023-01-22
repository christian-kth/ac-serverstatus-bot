import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pings the bot to test whether it's alive or not"),
    async execute(interaction) {
        await interaction.reply("Pong! :ping_pong:");
    }
}
