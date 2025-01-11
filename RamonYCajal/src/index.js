const {Client, IntentsBitField, Collection, ChannelType, getInitialSendRateLimitState} = require('discord.js');
require('dotenv').config();

const tokens = [
    process.env.TOKEN_RAMON,
    process.env.TOKEN_CAJAL,
    process.env.TOKEN_PEDRO
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

    client.on('debug', info => console.log(info));
    client.on('rateLimit', (rateLimitData) => console.log(rateLimitData));

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "count_100") {
            try{

                //await interaction.deferReply();
                const start = Date.now();

                for ( let i = 0; i < 60; i++) {

                    const botIndex = i % clients.length;
                    const currentClient = clients[botIndex];

                    const channel = currentClient.channels.cache.get(interaction.channelId);
                    if (channel) {
                        await channel.send(`${i} ${getInitialSendRateLimitState().sent}`);
                    }

                    /**
                     * Esto es para ver si se puede evitar el rate limit, pero ni caso hace
                     * */

                    //await new Promise(resolve => setTimeout(resolve, 50));
                }

                interaction.channel.send(''+(Date.now() - start)/1000);



            }catch (error){
                console.error("Error handling interaction:", error);
            }
        }
    })
}

