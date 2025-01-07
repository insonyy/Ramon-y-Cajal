const {Client, IntentsBitField, Collection, ChannelType} = require('discord.js');
require('dotenv').config();

const tokens = [
    process.env.TOKEN_RAMON,
    process.env.TOKEN_CAJAL
];
const clients = [];

for (const token of tokens){

    const client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent,
        ]
    });
    clients.push(client);

    client.on('ready', (c)=>{
        console.log(`OK ${c.user.tag} is online`);
        client.user.setActivity(
            {
                name: "ramon y cajal"
            })
    });

    client.login(token);

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "count_100") {
            try{

                await interaction.deferReply();

                for ( let i = 0; i <= 100; i++) {

                    const botIndex = i % clients.length;
                    const currentClient = clients[botIndex];

                    const channel = currentClient.channels.cache.get(interaction.channelId);
                    if (channel) {
                        await channel.send(`${i}`);
                    }

                    /**
                     * Esto es para ver si se puede evitar el rate limit, pero ni caso hace
                     * */

                    await new Promise(resolve => setTimeout(resolve, 50));
                }

            }catch (error){
                console.error("Error handling interaction:", error);
            }
        }
    })
}

