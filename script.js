document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const startScreen = document.getElementById('start-screen');
    const hackScreen = document.getElementById('hack-screen');
    const endScreen = document.getElementById('end-screen');
    const terminal = document.getElementById('terminal-content');
    const typingElement = document.getElementById('typing');
    const hackSound = document.getElementById('hackSound');
    const passwordInput = document.getElementById('password-input');
    const passwordForm = document.getElementById('password-form');

    let attempts = 3;
    const PASSWORD = 'jimmy';
    let passwordAttempted = false;
    let currentMessageIndex = 0;

    const messages = [
        "[SISTEMA] Iniciando secuencia de hackeo...",
        "[SISTEMA] Conectando al servidor remoto...",
        "[SISTEMA] Ocultando dirección IP... (no vaya a ser que me atrapen)",
        "[SISTEMA] Buscando puertos abiertos... (shhh, silencio que nos escuchan)",
        "[SISTEMA] Encontrada vulnerabilidad: Usuario usa 'password123' en todas partes 😅",
        "[SISTEMA] Desencriptando datos... (esto va a doler un poco)",
        "\n\n=== ACCESO A WHATSAPP CONCEDIDO ===\n[WHATSAPP] Buscando en chats recientes...\n[WHATSAPP] Encontrado: 'Mamá' - '¿Ya comiste?' (clásica)",
        "\n\n=== ACCESO A FACEBOOK CONCEDIDO ===\n[FACEBOOK] Revisando fotos etiquetadas...\n[FACEBOOK] Encontradas 127 fotos de comida (¿en serio?)",
        "\n\n=== ACCESO A INSTAGRAM CONCEDIDO ===\n[INSTAGRAM] Analizando historias...\n[INSTAGRAM] Última historia: Un café con forma de corazón (qué cursi)",
        "\n\n¡OH OH! ALGO INTERESANTE ENCONTRADO (24/08/25):\n'Que buen muchacho es ese Jimmy, me conviene'\n\n[?] ¿Quién será este Jimmy? ¿Tu crush secreto? 😏",
        "\n\n⚠️ ⚠️ ⚠️\n¡SISTEMA DE SEGURIDAD DETECTADO!\nEl usuario intentó cerrar sesión\n\n[!] RÁPIDO, NECESITO QUE ME AYUDES A DETENER ESTO",
        `\n\n[!] ¡EMERGENCIA! Tengo ${attempts} intentos para adivinar la contraseña\n    antes de que se active el protocolo de seguridad.`,
        "\n[PISTA] Es el nombre del chico del mensaje que encontramos...\n        (¡y no, no es 'amor' ni 'tequiero'! 😅)"
    ];

    startBtn.addEventListener('click', startHacking);
    restartBtn.addEventListener('restart', restartHacking);
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            checkPassword();
        });
    }

    function startHacking() {
        startScreen.classList.add('hidden');
        hackScreen.classList.remove('hidden');
        
        // Play the hacking sound
        hackSound.play().catch(e => console.log("Error al reproducir el sonido:", e));
        
        // Start the terminal effect
        typeMessage();
    }

    function showPasswordInput() {
        const passwordHTML = `
            <div id="password-prompt">
                <p class="warning-text">🚨 ¡SISTEMA BLOQUEADO! 🚨</p>
                <p>¡RÁPIDO! Ingresa la contraseña para detener el hackeo</p>
                <p>⏳ Intentos restantes: <span id="attempts" class="blink">${attempts}</span></p>
                <form id="password-form">
                    <input type="text" 
                           id="password-input" 
                           autocomplete="off" 
                           autofocus 
                           placeholder="Escribe aquí..."
                           class="glow-input">
                    <button type="submit" class="pulse">¡Probar suerte!</button>
                </form>
                <p class="hint">Pista: El nombre del chico del mensaje (en minúsculas)</p>
            </div>
        `;
        terminal.insertAdjacentHTML('beforeend', passwordHTML);
        document.getElementById('password-form').addEventListener('submit', (e) => {
            e.preventDefault();
            checkPassword();
        });
        document.getElementById('password-input').focus();
    }

    function checkPassword() {
        const input = document.getElementById('password-input');
        const attemptDisplay = document.getElementById('attempts');
        const passwordForm = document.getElementById('password-form');
        
        if (input.value.toLowerCase() === PASSWORD) {
            // Password correcta
            terminal.textContent += "\n\n¡CONTRASEÑA CORRECTA!\n\n";
            passwordForm.innerHTML = ''; // Remove the form
            showSuccessMessage();
        } else {
            attempts--;
            if (attempts > 0) {
                terminal.textContent += `\n\n¡CONTRASEÑA INCORRECTA! ${attempts} intentos restantes.\n`;
                attemptDisplay.textContent = attempts;
                input.value = '';
                input.focus();
                // Re-add the form after a short delay to ensure it stays visible
                setTimeout(() => {
                    if (document.getElementById('password-form') === null) {
                        showPasswordInput();
                    }
                }, 100);
            } else {
                // Sin intentos restantes
                terminal.textContent += "\n\n¡HAS FALLADO TODOS TUS INTENTOS!\n\n";
                passwordForm.innerHTML = ''; // Remove the form
                showFailMessage();
            }
        }
    }

    function showSuccessMessage() {
        const successMessages = [
            "¡VAYA, LO HAS CONSEGUIDO!\n",
            "\nHas salvado tu sistema de mi malvado plan...\n\n",
            "PERO ESPERA...\n\n",
            "¡HE DESCUBIERTO ALGO MÁS INTERESANTE!\n\n",
            "Mientras intentabas detenerme...\n",
            "¡HE HACKEADO TU CORAZÓN! ❤️\n\n",
            "Y ADIVINA QUIÉN MÁS ESTÁ AQUÍ...\n\n",
            "¡ES JIMMY! 👋\n\n",
            "Dice que le caes bien (y a mí también 😉)"
        ];
        
        let index = 0;
        const successInterval = setInterval(() => {
            if (index < successMessages.length) {
                terminal.textContent += successMessages[index];
                index++;
            } else {
                clearInterval(successInterval);
                setTimeout(() => {
                    hackScreen.classList.add('hidden');
                    endScreen.classList.remove('hidden');
                }, 3000);
            }
        }, 1000);
    }

    function showFailMessage() {
        const failMessages = [
            "¡JAJAJA!\n\n",
            "¡LO SIENTO, PERO AHORA SOY YO QUIEN TE HACKEO EL CORAZÓN! ❤️\n\n",
            "No te preocupes, seré bueno contigo... o tal vez no ;)\n\n",
            "DESDE AHORA ERES MÍA <3"
        ];
        
        let index = 0;
        const failInterval = setInterval(() => {
            if (index < failMessages.length) {
                terminal.textContent += failMessages[index];
                index++;
            } else {
                clearInterval(failInterval);
                setTimeout(() => {
                    hackScreen.classList.add('hidden');
                    endScreen.classList.remove('hidden');
                }, 3000);
            }
        }, 1000);
    }

    function restartHacking() {
        endScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        terminal.textContent = '';
        currentMessageIndex = 0;
        attempts = 3;
        passwordAttempted = false;
    }

    function typeMessage() {
        if (currentMessageIndex >= messages.length) {
            if (!passwordAttempted) {
                showPasswordInput();
                passwordAttempted = true;
            }
            return;
        }
        
        const message = messages[currentMessageIndex];
        let charIndex = 0;
        
        // Add double newline if not the first message
        if (currentMessageIndex > 0) {
            terminal.textContent += '\n\n';
        } else {
            terminal.textContent = '';
        }
        
        const typeChar = () => {
            if (charIndex < message.length) {
                // Add the next character
                terminal.textContent += message.charAt(charIndex);
                charIndex++;
                // Scroll to bottom
                terminal.scrollTop = terminal.scrollHeight;
                // Random typing speed for more natural feel
                const typingSpeed = message.endsWith('...') ? 100 : Math.random() * 50 + 30;
                setTimeout(typeChar, typingSpeed);
            } else {
                // Move to next message after a delay
                currentMessageIndex++;
                const delay = message.includes('...') ? 800 : 500; // Longer delay for "..."
                setTimeout(() => {
                    if (currentMessageIndex < messages.length) {
                        typeMessage();
                    } else if (!passwordAttempted) {
                        showPasswordInput();
                        passwordAttempted = true;
                    }
                }, delay);
            }
        };
        
        typeChar();
    }
});
