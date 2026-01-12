require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PREFIX = "!"; 

process.on('uncaughtException', (err) => {
    console.log('⚠️ Error dikit, tapi aman:', err.message);
});

client.on('ready', () => {
    console.log(`✅ BOT ONLINE: ${client.user.tag}`);
    console.log(`👉 Cara pakai:`);
    console.log(`   1. !masuk (Bot masuk ke room kamu)`);
    console.log(`   2. !masuk 1234567890 (Bot masuk ke ID room itu)`);
    console.log(`   3. !keluar`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'masuk' || command === 'join') {
        let channelTarget;

        if (args.length > 0) {
            const channelID = args[0];
            channelTarget = message.guild.channels.cache.get(channelID);

            if (!channelTarget || !channelTarget.isVoiceBased()) {
                return message.reply("❌ ID Channel salah atau itu bukan Voice Channel, bang!");
            }
        } 
        else if (message.member.voice.channel) {
            channelTarget = message.member.voice.channel;
        } 
        else {
            return message.reply("⚠️ Lu harus masuk room dulu ATAU kasih ID Channel-nya.\nContoh: `!masuk 123456789`");
        }

        try {
            joinVoiceChannel({
                channelId: channelTarget.id,
                guildId: channelTarget.guild.id,
                adapterCreator: channelTarget.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            });
            message.reply(`✅ Siap! Otw masuk ke **${channelTarget.name}**! 🏃‍♂️💨`);
        } catch (error) {
            console.error(error);
            message.reply("❌ Gagal masuk. Cek izin botnya.");
        }
    }

    if (command === 'keluar' || command === 'leave') {
        const connection = getVoiceConnection(message.guild.id);
        
        if (connection) {
            connection.destroy();
            return message.reply("Oke, gua cabut. 👋");
        }
        
        const botVoice = message.guild.members.me.voice;
        if (botVoice.channel) {
            await botVoice.disconnect();
            return message.reply("Oke, dipaksa keluar. 👋");
        }

        message.reply("Gua lagi gak di dalem room manapun.");
    }
});

client.login(process.env.TOKEN);