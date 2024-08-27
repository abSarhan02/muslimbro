async function fetchQuran() {
    let res = await fetch('https://api.alquran.cloud/v1/quran/it.piccardo');
    let data = await res.json();
    return data.data.surahs;  // Return the surahs for later use
}

// Fetch the Quran data and initialize the app
fetchQuran().then(surahs => {
    displaySurahs(surahs);
});

function displaySurahs(surahs) {
    const app = document.getElementById('app');

    // Clear previous content to avoid duplication
    app.innerHTML = '';

    surahs.forEach(surah => {
        let surahDiv = document.createElement('div');
        surahDiv.className = 'card';
        surahDiv.innerHTML = `
            <h4 class="card-title blue">${surah.name}</h4>
            <p class="card-text">${surah.englishNameTranslation}</p>
            <p class="card-text">${surah.number}</p>
        `;
        surahDiv.onclick = () => showSurah(surah, 'it');
        app.appendChild(surahDiv);
    });
}

function showSurah(surah, lang) {
    // Creazione del contenuto della surah con solo il numero della ayah
    let surahContent = surah.ayahs.map(ayah => `${ayah.text} <span class="ayah-number">${ayah.numberInSurah}</span>`).join(' ');
    
    // Aggiornamento dei contenuti nell'HTML
    document.getElementById('surahTitleAr').innerText = surah.name;
    document.getElementById('surahTitleIt').innerText = surah.englishNameTranslation;
    document.getElementById('surahContent').innerHTML = surahContent;
    document.getElementById('surahModal').style.display = 'flex';

    // Aggiunta dell'evento al pulsante di cambio lingua
    document.getElementById('toggleLanguageButton').onclick = function() {
        toggleLanguage(surah);
    };
}function toggleLanguage(surah) {
    const currentLang = document.getElementById('toggleLanguageButton').innerText.includes('Ar') ? 'it' : 'ar';
    const newLang = currentLang === 'it' ? 'ar' : 'it';
    const buttonLabel = newLang === 'it' ? 'Ar' : 'It';

    // Fetch the corresponding translation
    fetch(`https://api.alquran.cloud/v1/quran/${newLang === 'it' ? 'it.piccardo' : 'ar.alafasy'}`)
        .then(response => response.json())
        .then(data => {
            const surahData = data.data.surahs.find(s => s.number === surah.number);

            // Map each ayah to preserve the original numberInSurah and update text only
            let surahContent = surahData.ayahs.map(ayah => {
                // Find the original ayah object from the original surah
                const originalAyah = surah.ayahs.find(a => a.number === ayah.number);

                // Return the text with the original numberInSurah
                return `${ayah.text} <span class="ayah-number">${originalAyah.numberInSurah}</span>`;
            }).join(' ');

            // Update the surah content in the modal
            document.getElementById('surahContent').innerHTML = surahContent;
            document.getElementById('toggleLanguageButton').innerText = buttonLabel;
        });
}

const modal = document.getElementById('surahModal');
const span = document.getElementsByClassName('close')[0];
span.onclick = function() {
    modal.style.display = 'none';
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Event listener for the back button
document.getElementById('backButton').onclick = function() {
    window.location.href = '../index.html';    
}