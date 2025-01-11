require("dotenv").config();
const {REST, Routes, ApplicationCommandOptionType} = require("discord.js");

const commands = [

    {
        name: "count_100",
        description: "command that counts to 100 as fast as possible."
    }

];

const botConfigs = [
    {
        token: process.env.TOKEN_RAMON,
        client: process.env.CLIENT_ID_RAMON,
        guildId: process.env.GUILD_ID
    },
    {
        token: process.env.TOKEN_CAJAL,
        client: process.env.CLIENT_ID_CAJAL,
        guildId: process.env.GUILD_ID
    },
];

(async () => {
    for(const {token, client, guildId} of botConfigs){
        const rest = new REST({version: "10"}).setToken(token);

        try{
            console.log(`Registering slash commands for bot with Client ID: ${client}...`);

            await rest.put(
                Routes.applicationGuildCommands(client, guildId),
                { body: commands }
            );

        }catch (error){
            console.error(`There was an error registering commands for bot with Client ID: ${client}:`, error);
        }
    }
})();