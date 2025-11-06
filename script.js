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
        "Iniciando secuencia de hackeo...",
        "Accediendo al sistema...",
        "Buscando vulnerabilidades...",
        "Encontrando contraseñas...",
        "Desencriptando datos...",
        "Accediendo a redes sociales...",
        "\n\n=== ACCESO A WHATSAPP CONCEDIDO ===\nBuscando conversaciones recientes...",
        "\n\n=== ACCESO A FACEBOOK CONCEDIDO ===\nEscaneando mensajes privados...",
        "\n\n=== ACCESO A INSTAGRAM CONCEDIDO ===\nRevisando mensajes directos...",
        "\n\n¡INTERESANTE! Mensaje encontrado (24/08/25):\n'Que buen muchacho es ese Jimmy, me conviene'\n\n¿Quién será este Jimmy?",
        "\n\n=== SISTEMA DE SEGURIDAD DETECTADO ===\n¡ALERTA! Se requiere contraseña para continuar",
        `\n\nTienes ${attempts} intentos para adivinar la contraseña...`,
        "Pista: Es el nombre del chico del mensaje que encontré ;)"
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
                <p>¡SISTEMA BLOQUEADO!</p>
                <p>Ingresa la contraseña para detener el hackeo</p>
                <p>Intentos restantes: <span id="attempts">${attempts}</span></p>
                <form id="password-form">
                    <input type="text" id="password-input" autocomplete="off" autofocus>
                    <button type="submit">Enviar</button>
                </form>
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
            "¡LO SIENTO!\n",
            "Has salvado tu sistema...\n\n",
            "PERO...\n\n",
            "¡Tu corazón ya le pertenece a Jimmy! ❤️\n\n",
            "DESDE AHORA ERES MÍA <3"
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
        
        if (currentMessageIndex === 0) terminal.textContent = '';
        
        const typeChar = () => {
            if (charIndex < message.length) {
                terminal.textContent += message.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, Math.random() * 50 + 30);
                terminal.scrollTop = terminal.scrollHeight;
            } else {
                currentMessageIndex++;
                setTimeout(() => {
                    if (currentMessageIndex < messages.length) {
                        typeMessage();
                    } else if (!passwordAttempted) {
                        showPasswordInput();
                        passwordAttempted = true;
                    }
                }, 1000);
            }
        };
        
        typeChar();
    }
});
