# 🎮 Steam Vault

A sleek desktop app to browse your entire Steam library, track playtime, and explore achievements — built with React + Electron.

![Steam Vault](https://cdn.cloudflare.steamstatic.com/store/home/store_home_share.jpg)

---

## ✨ Features

- 📚 View all games you own on Steam
- ⏱ See total playtime for every game
- 🏆 Browse achievements per game (unlocked & locked)
- 🔍 Search and sort your library
- 💾 Remembers your login info between sessions
- 🚀 Auto-loads your library on startup

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- A Steam account with a public profile

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/Zouhirad1/steam-vault.git
cd steam-vault
```

2. **Install dependencies**
```bash
npm install
```

3. **Run in development mode**

Open two terminal windows in the project folder:

Terminal 1:
```bash
npx vite
```

Terminal 2 (once Terminal 1 says "ready"):
```bash
.\node_modules\.bin\electron .
```

---

## 🔑 Getting Your Steam Credentials

You need two things to use Steam Vault:

### Steam API Key
1. Go to [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
2. Log in and register any app name (e.g. "Steam Vault")
3. Copy the key

### Steam ID (64-bit)
1. Go to [steamid.io](https://steamid.io)
2. Paste your Steam profile URL
3. Copy the **steamID64** value (starts with 7656...)

### Make Your Profile Public
In Steam go to your **Profile → Edit Profile → Privacy Settings** and set:
- Profile: **Public**
- Game Details: **Public**

---

## 📦 Building the App

To build a `.exe` (Windows) or `.dmg` (Mac):

```bash
npm run electron:build
```

The installer will appear in the `dist-electron/` folder.

---

## 🛠 Tech Stack

- [React](https://react.dev/) — UI
- [Vite](https://vitejs.dev/) — bundler
- [Electron](https://www.electronjs.org/) — desktop wrapper
- [Steam Web API](https://steamcommunity.com/dev) — game & achievement data

---

## 📁 Project Structure

```
steam-vault/
├── src/
│   └── App.jsx        # Main React app
├── public/
│   ├── icon.ico       # Windows icon
│   └── icon.icns      # Mac icon
├── electron.js        # Electron main process
├── vite.config.js     # Vite config
└── package.json
```

---

## ⚠️ Important Notes

- Your API key and Steam ID are stored **locally** on your machine using localStorage — they are never sent anywhere except directly to the Steam API
- Some games do not support achievement tracking through the Steam API
- Games with private stats will show an error on the achievements screen

---

## 📄 License

MIT — do whatever you want with it.

---

Made by [Deadname Inc.](https://github.com/Zouhirad1)
```
