require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const PREFIX = "!"; 

process.on('uncaughtException', (err) => {
    console.log('⚠️ Error dikit, tapi aman:', err.message);
});

client.on('ready', () => {
    console.log(`✅ BOT ONLINE: ${client.user.tag}`);
    console.log(`-------------------------------------------`);
});

// --- FITUR UTAMA (COMMAND) ---
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // 1. COMMAND MASUK
    if (command === 'masuk' || command === 'join') {
        let channelTarget;

        if (args.length > 0) {
            const channelID = args[0];
            channelTarget = message.guild.channels.cache.get(channelID);
            if (!channelTarget || !channelTarget.isVoiceBased()) {
                return message.reply("❌ ID Channel salah atau itu bukan Voice Channel!");
            }
        } else if (message.member.voice.channel) {
            channelTarget = message.member.voice.channel;
        } else {
            return message.reply("⚠️ Lu harus masuk room dulu ATAU kasih ID Channel-nya.");
        }

        console.log(`[CMD] ${message.author.tag} menyuruh bot MASUK ke: ${channelTarget.name}`);

        try {
            joinVoiceChannel({
                channelId: channelTarget.id,
                guildId: channelTarget.guild.id,
                adapterCreator: channelTarget.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            });
            
            message.reply(`✅ Siap! Otw masuk ke **${channelTarget.name}**! 🏃‍♂️💨`);

            setTimeout(() => {
                const members = channelTarget.members.filter(member => !member.user.bot);
                const memberNames = members.map(m => m.user.tag).join(', ');
                
                console.log(`[INFO] Di dalam room ${channelTarget.name} saat ini ada:`);
                if (memberNames.length > 0) {
                    console.log(`       👉 ${memberNames}`);
                } else {
                    console.log(`       👉 (Kosong / Cuma Bot)`);
                }
            }, 1000);

        } catch (error) {
            console.error(error);
            message.reply("❌ Gagal masuk. Cek izin botnya.");
        }
    }

    // 2. COMMAND KELUAR
    if (command === 'keluar' || command === 'leave') {
        console.log(`[CMD] ${message.author.tag} menyuruh bot KELUAR.`);

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

client.on('voiceStateUpdate', (oldState, newState) => {
    // Cek apakah bot sedang connect di server ini?
    const connection = getVoiceConnection(newState.guild.id || oldState.guild.id);
    if (!connection) return;

    const botChannelId = newState.guild.members.me.voice.channelId;
    
    if (!botChannelId) return;

    if (newState.member.user.bot) return;

    if (newState.channelId === botChannelId && oldState.channelId !== botChannelId) {
        console.log(`[UPDATE] 🟢 ${newState.member.user.tag} BARU SAJA JOIN ke room.`);
    }

    if (oldState.channelId === botChannelId && newState.channelId !== botChannelId) {
        console.log(`[UPDATE] 🔴 ${oldState.member.user.tag} BARU SAJA LEFT dari room.`);
    }
});

client.login(process.env.TOKEN);