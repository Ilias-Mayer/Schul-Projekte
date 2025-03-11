// Taschenrechner
function berechnen() {
  const zahl1 = parseFloat(document.getElementById('zahl1').value);
  const zahl2 = parseFloat(document.getElementById('zahl2').value);
  const ausgabe = document.getElementById('taschenrechner-ausgabe');

  if (isNaN(zahl1) || isNaN(zahl2)) {
      ausgabe.innerHTML = "<span class='fehler'>⚠️ Bitte geben Sie gültige Zahlen ein!</span>";
      return;
  }

  const ergebnisse = 
      `<div class="ergebnis-box">
          <div>➕ Summe: ${(zahl1 + zahl2).toLocaleString()}</div>
          <div>➖ Differenz: ${(zahl1 - zahl2).toLocaleString()}</div>
          <div>✖️ Produkt: ${(zahl1 * zahl2).toLocaleString()}</div>
          <div>➗ Quotient: ${zahl2 !== 0 ? (zahl1 / zahl2).toFixed(2) : "⛔ Undefiniert"}</div>
      </div>`;

  ausgabe.innerHTML = ergebnisse;
}

// BMI-Rechner
function berechneBMI() {
  const groesse = parseFloat(document.getElementById('groesse').value);
  const gewicht = parseFloat(document.getElementById('gewicht').value);
  const ausgabe = document.getElementById('bmi-ausgabe');

  if (isNaN(groesse) || isNaN(gewicht) || groesse <= 0 || gewicht <= 0) {
      ausgabe.innerHTML = "<span class='fehler'>⚠️ Nur positive Werte erlaubt!</span>";
      return;
  }

  const bmi = (gewicht / ((groesse/100) ** 2)).toFixed(1);
  let bewertung = "";
  let klasse = "";
  let istNormalgewicht = false;

  if (bmi < 16) {
    bewertung = "🚨 Starkes Untergewicht";
    klasse = "untergewicht-stark";
  } else if (bmi < 18.5) {
    bewertung = "⚠️ Untergewicht";
    klasse = "untergewicht";
  } else if (bmi < 25) {
    bewertung = "✅ Normalgewicht";
    klasse = "normalgewicht";
    istNormalgewicht = true;
  } else if (bmi < 30) {
    bewertung = "⚠️ Übergewicht";
    klasse = "uebergewicht";
  } else {
    bewertung = "🚨 Adipositas";
    klasse = "adipositas";
  }

  ausgabe.innerHTML = 
      `<div class="ergebnis-box">
          <div>📏 BMI: <strong>${bmi}</strong></div>
          <div>📌 Kategorie: ${bewertung}</div>
      </div>`;// Konfetti für Normalgewicht 🎉
      if (istNormalgewicht) {
        erzeugeKonfetti();
        
        // Füge Celebration-Nachricht nach kurzer Verzögerung hinzu
        setTimeout(() => {
          const ergebnisBox = ausgabe.querySelector('.ergebnis-box');
          if (ergebnisBox) {
            ergebnisBox.innerHTML += `
              <div class="celebration-message">
                🏆 Herzlichen Glückwunsch zum gesunden Gewicht! 🎉
              </div>
            `;
          }
        }, 1000);
      }
    }
    
    // Funktion zum Erzeugen von Konfetti
    function erzeugeKonfetti() {
      // Erstelle Konfetti-Container
      const konfettiContainer = document.createElement('div');
      konfettiContainer.className = 'konfetti-container';
      document.body.appendChild(konfettiContainer);
      
      // Konfetti-Farben
      const farben = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c'];
      
      // Erstelle 50 Konfetti-Partikel
      for (let i = 0; i < 100; i++) {
        const konfetti = document.createElement('div');
        konfetti.className = 'konfetti';
        
        // Zufällige Position, Farbe und Verzögerung
        konfetti.style.left = Math.random() * 100 + 'vw';
        konfetti.style.backgroundColor = farben[Math.floor(Math.random() * farben.length)];
        konfetti.style.animationDelay = Math.random() * 2 + 's';
        
        // Zufällige Größe
        const size = Math.random() * 10 + 10;
        konfetti.style.width = size + 'px';
        konfetti.style.height = size + 'px';
        
        // Zufällige Form (Kreis oder Quadrat)
        konfetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Füge zum Container hinzu
        konfettiContainer.appendChild(konfetti);
      }
      
      // Entferne Konfetti nach Animation
      setTimeout(entferneKonfetti, 5000);
    }
    
    // Funktion zum Entfernen von Konfetti
    function entferneKonfetti() {
      const container = document.querySelector('.konfetti-container');
      if (container) {
        container.remove();
      }
    }
    
    function validiereZahlen(...zahlen) {
      return zahlen.every(zahl => 
          !isNaN(zahl) && 
          zahl >= 0 && 
          zahl !== Infinity
      );
    }