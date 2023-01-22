import { Client, Collection } from 'discord.js'
import * as dotenv from 'dotenv'
import utils from './utils.js'

dotenv.config()

const client = new Client({ intents: [] })

client.commands = new Collection()
const commands = await utils.getCommands()
console.log("commands: ", commands)
commands.forEach(command => client.commands.set(command.data.name, command))

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    const command = client.commands.get(interaction.commandName)
    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(`An error occurred while trying to execute command '${interaction.commandName}'.\nError is: `, error)

        if (interaction.deferred || interaction.replied) {
            interaction.editReply("An error occurred while executing this command!")
        } else {
            interaction.reply('An error occurred while executing this command!')
        }
    }
})

client.once("ready", () => {
    console.log(`Successfully logged in and started the bot! User is logged in as ${client.user.tag}.`)
    client.user.setActivity({ name: "looking up Assetto Corsa game servers" })
})

try {
    await client.login(process.env.DISCORD_BOT_TOKEN)
} catch (error) {
    console.error(
        "An error occurred while trying to log into the specified discord bot with the configured bot token.\n" +
        "Make sure that the bot token in your .env file is correct.\n" +
        "You can find the bot token when going to https://discord.com/developers > Clicking on your application > Bot > Token.\n" +
        "Thrown error is: ",
        error
    )
}
