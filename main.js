let currentMode = 'shared';
let myDHPrivateKey = null;
let myDHPublicKey = null;
let currentSharedKey = null;
let lastEncryptedMessage = null;

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

function setMode(mode) {
    currentMode = mode;

    // Оновити кнопки
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Показати/сховати секції
    if (mode === 'shared') {
        document.getElementById('shared-mode').style.display = 'block';
        document.getElementById('dh-mode').classList.remove('active');
    } else {
        document.getElementById('shared-mode').style.display = 'none';
        document.getElementById('dh-mode').classList.add('active');
    }

    currentSharedKey = null;
}

function generateDHKeys() {
    // Генерація приватного ключа (випадкове число)
    myDHPrivateKey = BigInt(Math.floor(Math.random() * 1000000000) + 1000000);

    // Обчислення публічного ключа: g^privateKey mod p
    myDHPublicKey = modPow(DH_GENERATOR, myDHPrivateKey, DH_PRIME);

    document.getElementById('myPublicKey').textContent = myDHPublicKey.toString();
    document.getElementById('dhKeysGenerated').style.display = 'block';
}

function computeSharedSecret() {
    const theirPublicKeyInput = document.getElementById('theirPublicKey').value.trim();

    if (!theirPublicKeyInput || !myDHPrivateKey) {
        alert('Спочатку згенеруйте ваші ключі та введіть публічний ключ співрозмовника!');
        return;
    }

    try {
        const theirPublicKey = BigInt(theirPublicKeyInput);

        // Обчислення спільного секрету: theirPublicKey^myPrivateKey mod p
        const sharedSecret = modPow(theirPublicKey, myDHPrivateKey, DH_PRIME);

        // Перетворення в hex для використання як ключ
        currentSharedKey = CryptoJS.SHA256(sharedSecret.toString()).toString();

        document.getElementById('sharedSecret').textContent = currentSharedKey;
        document.getElementById('sharedSecretDisplay').style.display = 'block';

    } catch (error) {
        alert('Помилка при обчисленні спільного ключа. Перевірте формат публічного ключа.');
    }
}

function getCurrentKey() {
    if (currentMode === 'shared') {
        const password = document.getElementById('sharedPassword').value;
        if (!password) {
            alert('Введіть секретний пароль!');
            return null;
        }
        return CryptoJS.SHA256(password).toString();
    } else {
        if (!currentSharedKey) {
            alert('Спочатку обчисліть спільний ключ в режимі Diffie-Hellman!');
            return null;
        }
        return currentSharedKey;
    }
}

function encryptMessage() {
    const key = getCurrentKey();
    if (!key) return;

    const message = document.getElementById('messageToEncrypt').value;
    if (!message) {
        alert('Введіть повідомлення для шифрування!');
        return;
    }

    try {
        const encrypted = CryptoJS.AES.encrypt(message, key).toString();
        lastEncryptedMessage = encrypted;
        const resultDiv = document.getElementById('encryptedResult');
        const telegramBtn = document.getElementById('sendToTelegramBtn');
        resultDiv.innerHTML = `
                    <strong>Зашифроване повідомлення:</strong><br>
                    <div id="encryptedMessage">
                    ${encrypted}
                    </div>
                    <button class="copy-btn" onclick="copyToClipboard('encryptedMessage', this)">📋 Копіювати</button>
                `;
        resultDiv.style.display = 'block';
        telegramBtn.style.display = 'block';
    } catch (error) {
        alert('Помилка при шифруванні: ' + error.message);
    }
}

function decryptMessage() {
    const key = getCurrentKey();
    if (!key) return;

    const encryptedMessage = document.getElementById('messageToDecrypt').value;
    if (!encryptedMessage) {
        alert('Введіть зашифроване повідомлення!');
        return;
    }

    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            throw new Error('Неможливо розшифрувати. Перевірте ключ або повідомлення.');
        }

        const resultDiv = document.getElementById('decryptedResult');
        resultDiv.innerHTML = `
                    <strong>Розшифроване повідомлення:</strong><br>
                    ${decrypted}
                `;
        resultDiv.style.display = 'block';

    } catch (error) {
        alert('Помилка при дешифруванні: ' + error.message);
        document.getElementById('decryptedResult').innerHTML = 'Помилка дешифрування. Перевірте ключ або повідомлення.';
        document.getElementById('decryptedResult').style.display = 'block';
    }
}

function copyToClipboard(elementId, buttonElement) {
    const element = document.getElementById(elementId);
    const text = element.textContent.trim() || element.innerHTML.replace(/<[^>]*>/g, '');

    navigator.clipboard.writeText(text).then(() => {
        // Тимчасово змінити текст кнопки
        const originalText = buttonElement.textContent;
        buttonElement.textContent = '✅ Скопійовано';
        setTimeout(() => {
            buttonElement.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Не вдалося скопіювати. Виділіть текст вручну.');
    });
}

// Функція для швидкого піднесення до степеня за модулем (для великих чисел)
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

function sendToTelegram() {
    if (!lastEncryptedMessage) {
        alert('Спочатку зашифруйте повідомлення!');
        return;
    }

    // Варіант 1: tg:// протокол (найкращий для мобільних)
    const telegramUrl = `tg: //msg?text=${encodeURIComponent(lastEncryptedMessage)}`;

    // Варіант 2: веб-версія Telegram (резервний)  
    const telegramWebUrl = `https: //t.me/share/url?url=&text=${encodeURIComponent(lastEncryptedMessage)}`;

    // Спробуємо відкрити нативний додаток
    const link = document.createElement('a');
    link.href = telegramUrl;
    link.target = '_blank';
    link.click();

    // Якщо нативний не відкрився, показуємо веб-версію через 1 секунду
    setTimeout(() => {
        if (confirm('Telegram додаток не відкрився. Відкрити веб-версію?')) {
            window.open(telegramWebUrl, '_blank');
        }
    }

        , 1000);
}