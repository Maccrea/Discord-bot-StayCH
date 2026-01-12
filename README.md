# 🤖 StayCH - Discord Voice Stay Bot

**StayCH** is a simple and lightweight Discord bot designed to join and "stay" in a Voice Channel (VC). It's useful for making servers look active, keeping users company, or simply preventing voice channels from being empty.

Built using **Discord.js v14** and **@discordjs/voice**.

---

## ✨ Key Features

* **🚀 Simple Commands**: Just type `!join` or `!leave`.
* **🎯 Flexible Targeting**: Can join your current channel OR a specific channel via ID.
* **🛡️ Anti-Crash**: Equipped with an *uncaughtException handler* to prevent the bot from crashing due to minor errors.
* **🔊 Active Status**: The bot joins without "Deafen" or "Mute" status (configurable in the code).

---

## 📋 Commands

Default prefix is `!`

| Command | Alias | Function |
| :--- | :--- | :--- |
| `!join` | `!masuk` | Joins the Voice Channel you are currently in. |
| `!join <ID>` | `!masuk <ID>` | Joins a specific Voice Channel using its Channel ID. |
| `!leave` | `!keluar` | Disconnects the bot from the Voice Channel. |

**Usage Examples:**
* `!join` (You must be in a VC first)
* `!join 123456789012345` (Bot will join this specific Channel ID)

---

## 🛠️ Installation & Setup

Follow these steps to run the bot on your computer or VPS.

### 1. Prerequisites
* **Node.js** (Version 16.9.0 or higher).
* **Bot Token** (From Discord Developer Portal).

### 2. Clone Repository
```bash
git clone [https://github.com/your-username/StayCH.git](https://github.com/your-username/StayCH.git)
cd StayCH
```

### 3. Install Dependencies
This bot requires `discord.js`, the voice adapter, and an audio encryption library (`libsodium`).

```bash
npm install discord.js @discordjs/voice dotenv libsodium-wrappers
```

### 4. Configure Token
Create a new file named `.env` in your project folder. Add your bot token inside:

```env
TOKEN=your_bot_token_here_without_spaces
```

### 5. Run the Bot
```bash
node index.js
```

If successful, you will see a message in the terminal:
```text
✅ BOT ONLINE: StayCH#1234
👉 Usage:
   1. !masuk (Bot joins your room)
   ...
```

---

## ⚠️ Troubleshooting

**Q: The bot joins but leaves immediately?**
A: Ensure you have installed `libsodium-wrappers` or `sodium-native`. Discord Voice requires this encryption library to function.
`npm install libsodium-wrappers`

**Q: The bot is not responding to commands?**
A:
1. Make sure the Bot is online.
2. Check **Privileged Gateway Intents** in the Discord Developer Portal. Ensure **"Message Content Intent"** is toggled **ON**.
3. Ensure the bot has **View Channel** and **Connect** permissions in your Discord server.

---

## 📜 License
This project is open-source. Feel free to use and modify it.