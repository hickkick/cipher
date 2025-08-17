# 🔐 Cipher App - Secret Message Translator

Your personal translator between human language and the language of secrets. A minimalist, intuitive encryption assistant that makes secure messaging accessible to everyone.

## ✨ Features

- **AES Encryption** using CryptoJS library for military-grade security
- **Diffie-Hellman Key Exchange** for secure key sharing without revealing secrets
- **PWA Support** - install on your phone like a native app
- **Offline Capable** - works without internet connection
- **Mobile Optimized** - designed for touch interfaces and small screens

## 🤝 How Diffie-Hellman Works

Think of it like mixing paint colors:
1. **You and your friend both choose a secret color** (private keys)
2. **You both mix it with the same public color** (shared base)
3. **You exchange the mixed colors** (public keys) 
4. **Each of you mixes the received color with your secret** → **Same final color!** (shared secret)

Even if someone sees the mixed colors, they can't figure out your secret colors or the final result. Pretty neat, right? 🎨

## 🚀 Getting Started

1. [Open the app](https://hickkick.github.io/cipher/) and choose your encryption method:
   - **🔑 Passphrase** - simple shared password
   - **🤝 Auto Key Exchange** - fancy Diffie-Hellman magic

2. **For DH Key Exchange:**
   - Generate your keys
   - Share your public key with your friend
   - Enter their public key
   - Start chatting with auto-generated secure keys!

3. **Type your message** → **Get encrypted text** → **Share safely**
4. **Paste encrypted message** → **Get original text** → **Read secretly**

## 🎯 Design Goals

- **Minimalist** - no unnecessary buttons or confusing options
- **Intuitive** - your grandma should be able to encrypt her cookie recipes
- **Mobile-First** - because who encrypts messages on desktop anyway?
- **Accessible** - works on any device with a browser

## 🔒 Security Notes

- All encryption happens **locally** on your device
- **No encryption keys are sent over the internet** - CryptoJS works offline
- **No data is sent to any servers** (except when you manually share encrypted messages)
- AES-256 with random IVs for each message
- Key storage depends on your usage - check what you're saving locally
- **P.S.** For maximum security, use in a regular browser tab rather than installed PWA (easier to clear session data)

## 🛠️ Tech Stack

- Vanilla HTML/CSS/JavaScript (because sometimes simple is better)
- CryptoJS for encryption magic
- Tailwind CSS for styling
- Service Worker for PWA capabilities
- A lot of coffee ☕ and a few "why isn't this working?!" moments 😅

## 🎭 Pro Tips

- Test your encrypted messages before sending important stuff
- Screenshot your DH public keys for easier sharing
- The app works offline once installed - perfect for airplane mode conspiracies
- Don't encrypt your grocery lists (unless you're really paranoid about your banana preferences)

## 🤔 FAQ

**Q: Is this NSA-proof?**  
A: Probably not, but it'll keep your nosy roommate from reading your texts.

**Q: Can I encrypt my homework?**  
A: Yes, but your teacher probably won't accept "VGhpcyBpcyBub3QgdGhlIGhvbWV3b3JrIHlvdSdyZSBsb29raW5nIGZvcg==" as an answer.

**Q: What happens if I forget my passphrase?**  
A: Same thing that happens when you forget where you put your keys - you're locked out! 🗝️

---

*Built with ❤️ and excessive amounts of paranoia by someone who probably watched too many spy movies.*

*Coded with Claude Sonnet on one hot summer day when the AC was broken and debugging was the only thing keeping me cool.* 🌡️💻

---

**⚠️ Disclaimer:** Use responsibly. Don't encrypt anything illegal. The developer is not responsible for any marriages ruined by encrypted messages or friendships lost due to forgotten passphrases. Encrypt at your own risk! 🙃