// Configura la fecha del evento aquí
// Formato: Año, Mes (0-11), Día, Hora, Minuto, Segundo
// 14 de febrero de 2026 a las 21:30
const eventDate = new Date(2026, 1, 14, 21, 30, 0);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate.getTime() - now;

    if (distance < 0) {
        // Si la fecha ya pasó
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar los valores sin padding (mostrar números naturales)
    document.getElementById('days').textContent = String(days);
    document.getElementById('hours').textContent = String(hours);
    document.getElementById('minutes').textContent = String(minutes);
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Actualizar el contador cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Control de música
const musicButton = document.getElementById('musicButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const playIcon = musicButton.querySelector('.play-icon');
const pauseIcon = musicButton.querySelector('.pause-icon');
let isPlaying = false;

// Configurar volumen (0.3 = 30% del volumen máximo)
backgroundMusic.volume = 0.3;

// Verificar si el audio está cargado
backgroundMusic.addEventListener('loadeddata', () => {
    console.log('Audio cargado correctamente');
    // Intentar reproducir automáticamente cuando esté cargado
    const playPromise = backgroundMusic.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                isPlaying = true;
            })
            .catch(error => {
                console.log('Reproducción automática bloqueada. El usuario debe interactuar primero.');
                // Si falla el autoplay, mantener el botón de play visible
            });
    }
});

backgroundMusic.addEventListener('error', (e) => {
    console.error('Error al cargar el audio:', e);
    alert('No se pudo cargar el archivo de música. Por favor, verifica que el archivo existe en la carpeta "music"');
});

// Intentar reproducir cuando el usuario interactúe por primera vez
document.addEventListener('click', () => {
    if (!isPlaying && backgroundMusic.paused) {
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    isPlaying = true;
                })
                .catch(error => {
                    console.log('Error al reproducir:', error);
                });
        }
    }
}, { once: true });

musicButton.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        isPlaying = false;
    } else {
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // La reproducción comenzó correctamente
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    isPlaying = true;
                })
                .catch(error => {
                    console.error('Error al reproducir música:', error);
                    alert('No se pudo reproducir la música. Asegúrate de que el archivo existe y que tu navegador permite la reproducción automática.');
                });
        }
    }
});

// Botón de ubicación
const locationButton = document.getElementById('locationButton');
locationButton.addEventListener('click', () => {
    // Aquí puedes agregar la URL de Google Maps o la acción que quieras
    // Ejemplo: window.open('https://maps.google.com/?q=BIOFAR+BAJO+LA+VIÑA', '_blank');
    alert('Agrega aquí la URL de Google Maps o la acción que desees');
});

// Formulario de confirmación de asistencia
const confirmationForm = document.querySelector('.confirmation-form');
if (confirmationForm) {
    confirmationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const numPeople = document.getElementById('numPeople').value;
        const nombre = confirmationForm.querySelector('input[placeholder="Nombre *"]').value;
        const apellido = confirmationForm.querySelector('input[placeholder="Apellido *"]').value;
        const attendance = confirmationForm.querySelector('input[name="attendance1"]:checked').value;
        const cancion = confirmationForm.querySelector('input[placeholder="Nombre de la canción"]').value;
        
        // Validar campos requeridos
        if (!nombre || !apellido) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }
        
        // Formatear mensaje
        let mensaje = `*Confirmación de Asistencia - Mis 15 Esmeralda*\n\n`;
        mensaje += `*Cantidad de personas:* ${numPeople}\n\n`;
        mensaje += `*Responsable:*\n`;
        mensaje += `Nombre: ${nombre}\n`;
        mensaje += `Apellido: ${apellido}\n\n`;
        mensaje += `*Asistencia:* `;
        if (attendance === 'confirm') {
            mensaje += `*¡Confirmo!*`;
        } else {
            mensaje += `*No podré asistir*`;
        }
        mensaje += `\n\n`;
        
        if (cancion && cancion.trim() !== '') {
            mensaje += `*Canción sugerida:* ${cancion}\n`;
        }
        
        // Número de WhatsApp
        const phoneNumber = '5493436228191';
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(mensaje);
        
        // Crear URL de WhatsApp
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Opcional: mostrar confirmación
        alert('Redirigiendo a WhatsApp para enviar la confirmación...');
    });
}
