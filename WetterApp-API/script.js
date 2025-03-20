document.getElementById('wetterButton').addEventListener('click', ladeWetter);
document.getElementById('stadtInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        ladeWetter();
    }
});

async function ladeWetter() {
    const stadt = document.getElementById('stadtInput').value.trim();
    
    if (!stadt) {
        zeigeFehler('Bitte gib einen Stadtnamen ein.');
        return;
    }
    
    try {
        // Hier würde normalerweise Ihr API-Schlüssel stehen
        const apiKey = 'api-key-den-ich-nicht-habe';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${stadt}&units=metric&lang=de&appid=${apiKey}`;
        
        // Da wir keinen echten API-Schlüssel haben, simulieren wir die Antwort
        // Im realen Einsatz würden Sie diesen Teil durch einen echten fetch-Aufruf ersetzen
        const data = await simuliereWetterDaten(stadt);
        
        document.getElementById('wetterContainer').classList.remove('hidden');
        document.getElementById('fehlerContainer').classList.add('hidden');
        
        document.getElementById('stadtName').textContent = data.name;
        document.getElementById('beschreibung').textContent = data.weather[0].description;
        document.getElementById('temperatur').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('gefuehlt').textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById('luftfeuchtigkeit').textContent = `${data.main.humidity}%`;
        document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        
    } catch (error) {
        console.error('Fehler beim Laden der Wetterdaten:', error);
        zeigeFehler('Stadt nicht gefunden oder Fehler beim Laden der Wetterdaten.');
    }
}

function zeigeFehler(text) {
    document.getElementById('wetterContainer').classList.add('hidden');
    document.getElementById('fehlerContainer').classList.remove('hidden');
    document.getElementById('fehlerText').textContent = text;
}

// Simulierte Wetterdaten für Demo-Zwecke
// Im realen Einsatz würden Sie stattdessen die fetch API verwenden
function simuliereWetterDaten(stadt) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Zufällige Wetterdaten generieren
            const temp = Math.random() * 30 - 5;
            const data = {
                name: stadt,
                weather: [{
                    description: ['sonnig', 'bewölkt', 'regnerisch', 'neblig'][Math.floor(Math.random() * 4)]
                }],
                main: {
                    temp: temp,
                    feels_like: temp - (Math.random() * 3) + 1,
                    humidity: Math.floor(Math.random() * 100)
                },
                wind: {
                    speed: Math.random() * 10
                }
            };
            
            if (stadt.toLowerCase() === 'fehler') {
                reject(new Error('Simulierter Fehler'));
            } else {
                resolve(data);
            }
        }, 500);
    });
}