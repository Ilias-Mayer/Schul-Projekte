// Event-Listener für den Button hinzufügen
document.getElementById('witzButton').addEventListener('click', ladeWitz);

// Asynchrone Funktion zum Laden eines Witzes
async function ladeWitz() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        document.getElementById('witzContainer').textContent = data.value;
    } catch (error) {
        console.error('Fehler beim Laden des Witzes:', error);
        document.getElementById('witzContainer').textContent = 'Fehler beim Laden des Witzes. Bitte versuche es erneut.';
    }
}

ladeWitz();