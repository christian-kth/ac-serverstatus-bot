import { REST } from "@discordjs/rest"
import {Routes} from "discord-api-types/v9"
import * as dotenv from 'dotenv'
import "fs"
import utils from './utils.js'

dotenv.config()
const commandList = []

const commands = await utils.getCommands()
commands.forEach(command => commandList.push(command.data.toJSON()))
const restClient = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN)

console.log("discord app id ", process.env.DISCORD_BOT_ID)
console.log("commandList: ", commandList)
restClient.put(Routes.applicationCommands(process.env.DISCORD_BOT_ID), { body: commandList })
    .then(() => console.log("Sucessfully registered Commands!"))
    .catch(console.error)
