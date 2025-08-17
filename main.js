// ==============================================
// 1. КОНСТАНТИ ТА КРИПТОГРАФІЧНІ ФУНКЦІЇ
// ==============================================

// DH константи
const DH_PRIME = BigInt('0x' +
    'FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD1' +
    '29024E088A67CC74020BBEA63B139B22514A08798E3404DD' +
    'EF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245' +
    'E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7ED' +
    'EE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3D' +
    'C2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F' +
    '83655D23DCA3AD961C62F356208552BB9ED529077096966D' +
    '670C354E4ABC9804F1746C08CA18217C32905E462E36CE3B' +
    'E39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9' +
    'DE2BCBF6955817183995497CEA956AE515D2261898FA0510' +
    '15728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64' +
    'ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7' +
    'ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6B' +
    'F12FFA06D98A0864D87602733EC86A64521F2B18177B200C' +
    'BBE117577A615D6C770988C0BAD946E208E24FA074E5AB31' +
    '43DB5BFCE0FD108E4B82D120A92108011A723C12A787E6D7' +
    '88719A10BDBA5B2699C327186AF4E23C1A946834B6150BDA' +
    '2583E9CA2AD44CE8DBBBC2DB04DE8EF92E8EFC141FBECAA6' +
    '287C59474E6BC05D99B2964FA090C3A2233BA186515BE7ED' +
    '1F612970CEE2D7AFB81BDD762170481CD0069127D5B05AA9' +
    '93B4EA988D8FDDC186FFB7DC90A6C08F4DF435C934063199' +
    'FFFFFFFFFFFFFFFF');
const DH_GENERATOR = BigInt(2);

// Функція для швидкого піднесення до степеня за модулем
function modPow(base, exponent, modulus) {
    if (modulus === 1n) return 0n;

    let result = 1n;
    base = base % modulus;

    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n;
        base = (base * base) % modulus;
    }

    return result;
}

// Генерація DH ключів
function generateDHKeys() {
    const myDHPrivateKey = BigInt(Math.floor(Math.random() * 1000000000) + 1000000);
    const myDHPublicKey = modPow(DH_GENERATOR, myDHPrivateKey, DH_PRIME);

    return {
        privateKey: myDHPrivateKey,
        publicKey: myDHPublicKey
    };
}

// Обчислення спільного секрету
function computeSharedSecret(theirPublicKey, myPrivateKey) {
    const sharedSecret = modPow(theirPublicKey, myPrivateKey, DH_PRIME);
    return CryptoJS.SHA256(sharedSecret.toString()).toString();
}

// AES шифрування
function encryptMessage(message, key) {
    try {
        return CryptoJS.AES.encrypt(message, key).toString();
    } catch (error) {
        throw new Error('Помилка при шифруванні: ' + error.message);
    }
}

// AES дешифрування
function decryptMessage(encryptedMessage, key) {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new Error('Неможливо розшифрувати. Перевірте ключ або повідомлення.');
        }
        return decrypted;
    } catch (error) {
        throw new Error('Помилка при дешифруванні: ' + error.message);
    }
}

// Генерація ключа з паролю
function generateKeyFromPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

// ==============================================
// 2. МОВИ ТА ЛОКАЛІЗАЦІЯ
// ==============================================

const translations = {
    uk: {
        // Заголовки та основне
        title: "Перекладач Таємниць",
        setupSecurity: "Ваш особистий перекладач між мовою людей і мовою секретів",

        // Методи шифрування
        encryptionMethod: "Як захистити повідомлення?",
        secretKey: "🔑 Кодова фраза",
        diffieHellman: "🤝 Автообмін ключами",

        // Поля вводу
        secretKeyLabel: "Кодова фраза:",
        secretKeyPlaceholder: "Введіть вашу кодову фразу...",
        yourPublicKey: "Поділіться цим ключем:",
        partnerPublicKey: "Публічний ключ партнера:",
        partnerPublicKeyPlaceholder: "Вставте публічний ключ партнера...",
        sharedKeyLabel: "Спільний ключ шифрування:",
        sharedKeyDescription: "Цей ключ буде використовуватися для шифрування повідомлень",

        // Кнопки
        generateDH: "Генерувати Diffie-Hellman ключі",
        startChat: "Почати чат",
        clickToCopy: "Клікніть щоб скопіювати",
        languageBtn: "🇺🇦",

        // Повідомлення
        encryptPlaceholder: "Введіть повідомлення для шифрування...",
        decryptPlaceholder: "Вставте зашифроване повідомлення для дешифрування...",
        copied: "📋 Скопійовано!",

        // Помилки та попередження
        enterSecretKey: "Будь ласка, введіть кодову фразу!",
        generateKeysFirst: "Будь ласка, згенеруйте ключі та введіть публічний ключ партнера!",
        generateKeysFirstShort: "Спочатку згенеруйте ключі!",
        keyGenerationError: "Помилка генерації ключів: ",
        setupError: "Помилка налаштування: ",
        encryptionError: "Помилка шифрування:",
        decryptionError: "Помилка дешифрування:",
        copyError: "Не вдалося скопіювати. Виділіть текст вручну.",
        invalidEncryption: "Некоректний зашифрований текст"
    },
    en: {
        // Headers and main
        title: "Secrets Translator",
        setupSecurity: "Your personal translator between human language and the language of secrets",

        // Encryption methods
        encryptionMethod: "How to protect messages?",
        secretKey: "🔑 Secret Phrase",
        diffieHellman: "🤝 Secure Exchange",

        // Input fields
        secretKeyLabel: "Secret phrase:",
        secretKeyPlaceholder: "Enter your secret phrase...",
        yourPublicKey: "Share this key:",
        partnerPublicKey: "Partner's public key:",
        partnerPublicKeyPlaceholder: "Paste partner's public key...",
        sharedKeyLabel: "Shared encryption key:",
        sharedKeyDescription: "This key will be used to encrypt messages",

        // Buttons
        generateDH: "Generate Diffie-Hellman keys",
        startChat: "Start chat",
        clickToCopy: "Click to copy",
        languageBtn: "🇺🇸",

        // Messages
        encryptPlaceholder: "Enter message to encrypt...",
        decryptPlaceholder: "Paste encrypted message to decrypt...",
        copied: "📋 Copied!",

        // Errors and warnings
        enterSecretKey: "Please enter a secret phrase!",
        generateKeysFirst: "Please generate keys and enter partner's public key!",
        generateKeysFirstShort: "Generate keys first!",
        keyGenerationError: "Key generation error: ",
        setupError: "Setup error: ",
        encryptionError: "Encryption error:",
        decryptionError: "Decryption error:",
        copyError: "Could not copy. Select text manually.",
        invalidEncryption: "Invalid encrypted text"
    }
};

let currentLanguage = localStorage.getItem('cryptoMessengerLang') || 'uk';

// Функція перекладу
function t(key) {
    return translations[currentLanguage][key] || translations.uk[key] || key;
}

// Функція зміни мови
function switchLanguage() {
    currentLanguage = currentLanguage === 'uk' ? 'en' : 'uk';
    localStorage.setItem('cryptoMessengerLang', currentLanguage);
    updateUI();
}

// Оновлення UI з новими текстами - тепер з унікальними класами
function updateUI() {
    // Заголовки та основне
    document.querySelector('.main-title').textContent = t('title');
    document.querySelector('.setup-description').textContent = t('setupSecurity');

    // Кнопка мови
    document.querySelector('.lang-btn-text').textContent = t('languageBtn');

    // Методи шифрування
    document.querySelector('.encryption-method-label').textContent = t('encryptionMethod');
    document.querySelector('.key-method-text').textContent = t('secretKey');
    document.querySelector('.dh-method-text').textContent = t('diffieHellman');

    // Секретний ключ
    document.querySelector('.secret-key-label').textContent = t('secretKeyLabel');
    document.querySelector('.secret-key-placeholder').placeholder = t('secretKeyPlaceholder');

    // DH секція
    document.querySelector('.generate-dh-text').textContent = t('generateDH');
    document.querySelector('.your-public-key-label').textContent = t('yourPublicKey');
    document.querySelector('.partner-public-key-label').textContent = t('partnerPublicKey');
    document.querySelector('.partner-key-placeholder').placeholder = t('partnerPublicKeyPlaceholder');
    document.querySelector('.shared-key-label').textContent = t('sharedKeyLabel');
    document.querySelector('.shared-key-description').textContent = t('sharedKeyDescription');
    document.querySelector('.click-to-copy-title').title = t('clickToCopy');

    // Кнопки
    document.querySelector('.start-chat-text').textContent = t('startChat');

    // Інпути чату
    document.querySelector('.encrypt-placeholder').placeholder = t('encryptPlaceholder');
    document.querySelector('.decrypt-placeholder').placeholder = t('decryptPlaceholder');

    // Повідомлення про копіювання
    document.querySelector('.copy-notification-text').textContent = t('copied');
}

// ==============================================
// 3. ГЛОБАЛЬНІ ЗМІННІ ТА DOM ЕЛЕМЕНТИ
// ==============================================

let currentKey = null;
let myDHPrivateKey = null;
let myDHPublicKey = null;
let isSetupComplete = false;
let currentMode = 'key';

// DOM елементи
const settingsMenu = document.getElementById('settingsMenu');
const chatArea = document.getElementById('chatArea');
const decryptSection = document.getElementById('decryptSection');
const encryptSection = document.getElementById('encryptSection');
const secretKeyInput = document.getElementById('secretKey');
const encryptInput = document.getElementById('encryptInput');
const decryptInput = document.getElementById('decryptInput');
const sendBtn = document.getElementById('sendBtn');
const confirmBtn = document.getElementById('confirmSettings');
const settingsBtn = document.getElementById('settingsBtn');
const messages = document.getElementById('messages');
const copyNotification = document.getElementById('copyNotification');

// DH елементи
const keySection = document.getElementById('keySection');
const dhSection = document.getElementById('dhSection');
const generateDHBtn = document.getElementById('generateDH');
const dhKeys = document.getElementById('dhKeys');
const publicKeyInput = document.getElementById('publicKey');
const partnerKeyInput = document.getElementById('partnerKey');
const sharedSecretDisplay = document.getElementById('sharedSecretDisplay');
const sharedSecretText = document.getElementById('sharedSecretText');

// ==============================================
// 4. UI СЦЕНАРІЇ
// ==============================================

// Обробка вибору методу шифрування
function handleMethodChange(selectedMethod) {
    currentMode = selectedMethod;
    if (selectedMethod === 'key') {
        keySection.classList.remove('hidden');
        dhSection.classList.add('hidden');
    } else {
        keySection.classList.add('hidden');
        dhSection.classList.remove('hidden');
    }
}

// Генерація DH ключів
function handleGenerateDH() {
    try {
        // Очищуємо попередні дані
        publicKeyInput.value = '';
        partnerKeyInput.value = '';
        sharedSecretDisplay.classList.add('hidden');
        sharedSecretText.textContent = '';

        const dhKeysData = generateDHKeys();
        myDHPrivateKey = dhKeysData.privateKey;
        myDHPublicKey = dhKeysData.publicKey;

        publicKeyInput.value = myDHPublicKey.toString();
        dhKeys.classList.remove('hidden');

        // Очищаємо спільний ключ
        document.getElementById('sharedSecretText').value = '';
    } catch (error) {
        alert(t('keyGenerationError') + error.message);
    }
}

// Підтвердження налаштувань
function handleConfirmSettings() {
    const selectedMethod = document.querySelector('input[name="method"]:checked').value;

    try {
        if (selectedMethod === 'key') {
            const password = secretKeyInput.value.trim();
            if (!password) {
                alert(t('enterSecretKey'));
                return;
            }

            currentKey = generateKeyFromPassword(password);

        } else {
            const partnerPublicKeyString = partnerKeyInput.value.trim();
            if (!partnerPublicKeyString || !myDHPrivateKey) {
                alert(t('generateKeysFirst'));
                return;
            }

            const partnerPublicKey = BigInt(partnerPublicKeyString);
            currentKey = computeSharedSecret(partnerPublicKey, myDHPrivateKey);

            // Показуємо спільний ключ користувачу
            document.getElementById('sharedSecretText').value = currentKey;
            sharedSecretDisplay.classList.remove('hidden');

            // Затримка щоб користувач побачив ключ
            setTimeout(() => {
                switchToChat();
            }, 800);
            return;
        }

        // Переключення до чату для звичайного ключа
        switchToChat();

    } catch (error) {
        alert(t('setupError') + error.message);
    }
}

// Переключення до чату
function switchToChat() {
    settingsMenu.classList.add('hidden');
    chatArea.classList.remove('hidden');
    decryptSection.classList.remove('hidden');
    encryptSection.classList.remove('hidden');

    setTimeout(() => {
        encryptInput.classList.add('highlight-pulse');
        encryptInput.focus();
        setTimeout(() => encryptInput.classList.remove('highlight-pulse'), 1000);
    }, 300);

    isSetupComplete = true;
}

// Відправка повідомлення
function handleSendMessage() {
    const message = encryptInput.value.trim();
    if (!message || !isSetupComplete || !currentKey) return;

    try {
        const encrypted = encryptMessage(message, currentKey);
        addMessage(encrypted, 'sent');
        encryptInput.value = '';
    } catch (error) {
        console.error(t('encryptionError'), error);
        alert(error.message);
    }
}

// Автоматичне дешифрування
function handleDecryptInput() {
    const encryptedText = decryptInput.value.trim();
    if (!encryptedText || !isSetupComplete || !currentKey) return;

    try {
        const decrypted = decryptMessage(encryptedText, currentKey);
        if (decrypted) {
            addMessage(decrypted, 'received');
            decryptInput.value = '';
        }
    } catch (error) {
        console.error(t('decryptionError'), error);
        // Очищаємо поле при помилці і показуємо повідомлення
        decryptInput.value = '';
        showDecryptionError();
    }
}

// Показ помилки дешифрування з обмеженням частоти
let lastErrorTime = 0;
function showDecryptionError() {
    const now = Date.now();
    // Обмежуємо показ помилок до одного на 2 секунди
    if (now - lastErrorTime < 2000) {
        return;
    }
    lastErrorTime = now;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'flex justify-center slide-up';
    errorDiv.innerHTML = `
                <div class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                    ⚠️ ${t('invalidEncryption')}
                </div>
            `;

    messages.appendChild(errorDiv);
    messages.scrollTop = messages.scrollHeight;

    // Видаляємо через 2.5 секунди
    setTimeout(() => {
        errorDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => errorDiv.remove(), 300);
    }, 2500);
}

// Додавання повідомлень
function addMessage(text, type) {
    // Видаляємо попередні повідомлення того ж типу
    const existingMessages = messages.querySelectorAll(`[data-type="${type}"]`);
    existingMessages.forEach(msg => {
        msg.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => msg.remove(), 300);
    });

    setTimeout(() => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${type === 'sent' ? 'justify-end' : 'justify-start'} slide-up`;
        messageDiv.setAttribute('data-type', type);

        const bubble = document.createElement('div');
        bubble.className = `message-bubble px-4 py-2 rounded-2xl ${type === 'sent'
            ? 'bg-spotify-green text-black rounded-br-md'
            : 'bg-spotify-gray text-white rounded-bl-md'
            }`;
        bubble.textContent = text;
        bubble.addEventListener('click', () => copyToClipboard(text, bubble));

        messageDiv.appendChild(bubble);
        messages.appendChild(messageDiv);

        // Прокрутка до низу
        messages.scrollTop = messages.scrollHeight;
    }, type === 'sent' ? 0 : 350);
}

// Копіювання в буфер обміну
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        element.classList.add('copied-animation');
        showCopyNotification();
        setTimeout(() => element.classList.remove('copied-animation'), 500);
    }).catch(() => {
        alert(t('copyError'));
    });
}

function showCopyNotification() {
    copyNotification.classList.remove('hidden', 'translate-x-full');
    setTimeout(() => {
        copyNotification.classList.add('translate-x-full');
        setTimeout(() => copyNotification.classList.add('hidden'), 300);
    }, 2000);
}

// Повернення до налаштувань
function handleBackToSettings() {
    chatArea.classList.add('hidden');
    decryptSection.classList.add('hidden');
    encryptSection.classList.add('hidden');
    settingsMenu.classList.remove('hidden');
    isSetupComplete = false;

    // Відновлюємо стан форми на основі поточного режиму та ключа
    if (currentKey) {
        if (currentMode === 'key') {
            document.querySelector('input[value="key"]').checked = true;
            handleMethodChange('key');
        } else if (currentMode === 'dh' && myDHPublicKey) {
            document.querySelector('input[value="dh"]').checked = true;
            handleMethodChange('dh');
            publicKeyInput.value = myDHPublicKey.toString();
            dhKeys.classList.remove('hidden');

            if (document.getElementById('sharedSecretText').value) {
                sharedSecretDisplay.classList.remove('hidden');
            }
        }
    }

    messages.innerHTML = '';
    encryptInput.value = '';
    decryptInput.value = '';
}

// Копіювання публічного ключа
function copyPublicKey() {
    const publicKey = publicKeyInput.value;
    if (!publicKey) {
        alert(t('generateKeysFirstShort'));
        return;
    }

    navigator.clipboard.writeText(publicKey).then(() => {
        showCopyNotification();
    }).catch(() => {
        alert(t('copyError'));
    });
}

// Перемикання видимості пароля
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const eye = document.getElementById(inputId + '-eye');

    if (input.type === 'password') {
        input.type = 'text';
        eye.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                `;
    } else {
        input.type = 'password';
        eye.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                `;
    }
}

// Ініціалізація радіо кнопок при завантаженні сторінки
function initializeRadioButtons() {
    // Завжди ставимо "key" як активний при завантаженні
    document.querySelector('input[value="key"]').checked = true;
    document.querySelector('input[value="dh"]').checked = false;
    handleMethodChange('key');
    currentMode = 'key';
}

// ==============================================
// 5. EVENT LISTENERS
// ==============================================

// Кнопка перемикання мови
document.getElementById('languageBtn').addEventListener('click', switchLanguage);

// Радіо кнопки методу шифрування
document.querySelectorAll('input[name="method"]').forEach(radio => {
    radio.addEventListener('change', function () {
        handleMethodChange(this.value);
    });
});

// Кнопка генерації DH ключів
generateDHBtn.addEventListener('click', handleGenerateDH);

// Кнопка підтвердження налаштувань
confirmBtn.addEventListener('click', handleConfirmSettings);

// Кнопка відправки повідомлення
sendBtn.addEventListener('click', handleSendMessage);

// Enter в полі шифрування
encryptInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Автоматичне дешифрування при введенні
decryptInput.addEventListener('input', function () {
    setTimeout(() => handleDecryptInput(), 500);
});

// Кнопка налаштувань (повернення до меню)
settingsBtn.addEventListener('click', handleBackToSettings);

// Клік на публічний ключ для копіювання
publicKeyInput.addEventListener('click', copyPublicKey);

// Клік на спільний ключ для копіювання
document.getElementById('sharedSecretText').addEventListener('click', function () {
    const sharedKey = this.value;
    if (sharedKey) {
        navigator.clipboard.writeText(sharedKey).then(() => {
            showCopyNotification();
        }).catch(() => {
            alert(t('copyError'));
        });
    }
});

// ==============================================
// 6. ІНІЦІАЛІЗАЦІЯ
// ==============================================

// Початкова ініціалізація
document.addEventListener('DOMContentLoaded', function () {
    initializeRadioButtons(); // Ініціалізуємо радіо кнопки
    updateUI(); // Оновлюємо UI з поточною мовою
    secretKeyInput.focus(); // Фокус на поле секретного ключа
});