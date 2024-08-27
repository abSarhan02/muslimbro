
document.getElementById('bars').addEventListener('click', function() {
  var dropdown = document.getElementById('dropdown-menu');
  var barsIcon = document.getElementById('bars');
  
  if (dropdown.style.display === 'none' || dropdown.style.display === '') {
    dropdown.style.display = 'block';
    barsIcon.classList.remove('fa-bars');
    barsIcon.classList.add('fa-times'); // Cambia l'icona in "X"
  } else {
    dropdown.style.display = 'none';
    barsIcon.classList.remove('fa-times');
    barsIcon.classList.add('fa-bars'); // Torna all'icona di barre
  }
});

//PRAYER SECTION START
// Funzione per ottenere la posizione geografica attuale
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
              position => {
                  resolve({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                  });
              },
              error => {
                  reject(error.message);
              }
          );
      } else {
          reject('Geolocalizzazione non supportata');
      }
  });
}

// Funzione per ottenere gli orari di preghiera in base alla posizione geografica attuale
async function getPrayerTimesByCurrentLocation() {
  try {
      const location = await getCurrentLocation();
      const { latitude, longitude } = location;
       // Ottenere la data attuale
       const now = new Date();
       const year = now.getFullYear();
       const month = ('0' + (now.getMonth() + 1)).slice(-2); // Aggiungi 1 perché i mesi sono zero-based
       const day = ('0' + now.getDate()).slice(-2);
       const date = `${year}-${month}-${day}`;

       const response = await fetch(`https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=1`);
       if (!response.ok) {
           throw new Error('Errore nel caricamento dei dati degli orari di preghiera');
       }
       const data = await response.json();

       if (!data || !data.data || !data.data.timings) {
           throw new Error('Dati degli orari di preghiera non validi ricevuti dall\'API');
       }
      const timings = data.data.timings;
      const prayers = [
          { name: 'Fajr', time: timings.Fajr },
          { name: 'Dhuhr', time: timings.Dhuhr },
          { name: 'Asr', time: timings.Asr },
          { name: 'Maghrib', time: timings.Maghrib },
          { name: 'Isha', time: timings.Isha }
      ];

      return prayers;
  } catch (error) {
      throw new Error(`Errore nel recuperare gli orari di preghiera: ${error.message}`);
  }
}

// Funzione per generare dinamicamente i div delle preghiere
async function generatePrayerDivs() {
  const container = document.getElementById('prayers');

  try {
      const prayers = await getPrayerTimesByCurrentLocation();

      prayers.forEach(prayer => {
          const ptDiv = document.createElement('div');
          ptDiv.classList.add('pt', 'flx-c');

          const prayerDiv = document.createElement('div');
          prayerDiv.classList.add('prayer');

          const img = document.createElement('img');
          img.src = `../assets/imgs/prayers/${prayer.name.toLowerCase()}.png`;

          const spanName = document.createElement('span');
          spanName.textContent = prayer.name;

          prayerDiv.appendChild(img);
          prayerDiv.appendChild(spanName);

          const hourDiv = document.createElement('div');
          hourDiv.classList.add('hour');

          const spanTime = document.createElement('span');
          spanTime.textContent = prayer.time;

          hourDiv.appendChild(spanTime);

          ptDiv.appendChild(prayerDiv);
          ptDiv.appendChild(hourDiv);

          container.appendChild(ptDiv);
      });
  } catch (error) {
      console.error(`Errore nel recuperare la posizione o gli orari di preghiera: ${error.message}`);
  }
}

// Chiamata alla funzione per generare i div delle preghiere
generatePrayerDivs();

//PRAYER SECTION END
//PILLARS SECTION START
document.getElementById('pillars-container');
const pillars = [
  { imgSrc: "../assets/imgs/pillars/bismillah.png", altText: "shahada image", title: "testimonianza di fede (shahada)" },
  { imgSrc: "../assets/imgs/pillars/islamic.png", altText: "prayer image", title: "preghiera (salat)" },
  { imgSrc: "../assets/imgs/pillars/bank.png", altText: "bank image", title: "elemosina (zakat)" },
  { imgSrc: "../assets/imgs/pillars/iftar.png", altText: "iftar image", title: "digiuno (sawm)" },
  { imgSrc: "../assets/imgs/pillars/kaaba (1).png", altText: "pilgrimage image", title: "pellegrinaggio (hajj)" }
];
 // Funzione per generare dinamicamente i div dei pilastri
 function generatePillars() {
  const container = document.getElementById('pillars-container');

  for (let i = 0; i < pillars.length; i++) {
      const pillar = pillars[i];
      const pillarDiv = document.createElement('div');
      pillarDiv.classList.add('pillar');

      const img = document.createElement('img');
      img.src = pillar.imgSrc;
      img.alt = pillar.altText;

      const h4 = document.createElement('h4');
      h4.textContent = pillar.title;

      pillarDiv.appendChild(img);
      pillarDiv.appendChild(h4);

      container.appendChild(pillarDiv);
  }
}

// Chiamata alla funzione per generare i div dei pilastri
generatePillars();

//PILLARS SECTION END