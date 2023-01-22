import * as fs from 'fs'

const getCommands = async () => {
    const commands = []
    const commandFiles = fs.readdirSync("src/cmds").filter(file => file.endsWith(".js"))
    for (const file of commandFiles) {
        try {
            const module = await import(`./cmds/${file}`)
            const command = module.default
            commands.push(command)
        } catch (error) {
            console.error(
                "An error occurred while trying to fetch a command file.\n" +
                `Could not import command from file ${file}\n` +
                "Error is: ",
                error
            )
        }
    }

    return commands
}

export default {
    getCommands
}