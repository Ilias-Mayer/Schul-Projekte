function erstelleRechnung() {
  // Werte auslesen
  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const product = document.getElementById('product').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const express = document.getElementById('express').checked;
  const discountCode = document.getElementById('discount').value.trim();
  const output = document.getElementById('output');

  // Validierung
  if (!name || !address || product === "" || isNaN(quantity) || quantity < 1) {
      output.innerHTML = "<p style='color: red;'>Bitte füllen Sie alle Pflichtfelder korrekt aus.</p>";
      return;
  }

  // Produktpreis ermitteln
  let price;
  switch (product) {
      case 'buch':
          price = 10;
          break;
      case 'stifte':
          price = 5;
          break;
      case 'block':
          price = 15;
          break;
      default:
          output.innerHTML = "<p style='color: red;'>Ungültiges Produkt.</p>";
          return;
  }

  // Gesamtpreis berechnen
  let total = quantity * price;
  if (express) total += 5;

  // Rabatt anwenden
  if (discountCode === 'DISCOUNT10') {
      total *= 0.9;
  }

  // Ausgabe generieren
  const productText = document.getElementById('product').options[document.getElementById('product').selectedIndex].text;
  output.innerHTML = `
      <h2>Rechnung</h2>
      <p>Name: ${name}</p>
      <p>Adresse: ${address}</p>
      <p>Produkt: ${productText}</p>
      <p>Menge: ${quantity}</p>
      <p>Express-Versand: ${express ? 'Ja (+€5)' : 'Nein'}</p>
      ${discountCode === 'DISCOUNT10' ? `<p>Rabattcode: DISCOUNT10 (-10%)</p>` : ''}
      <p><strong>Gesamtpreis: €${total.toFixed(2)}</strong></p>
  `;
}

// Event-Handler hinzufügen
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.action-button').addEventListener('click', erstelleRechnung);
});