 // Recupera il parametro 'type' dall'URL
 const urlParams = new URLSearchParams(window.location.search);
 const type = urlParams.get('type');

 // Funzione per fetch Azkar in base al tipo
 function fetchAzkarByType(type) {
     fetch(`http://localhost:8080/api/azkar/type/${type}`)
         .then(response => response.json())
         .then(data => {
             const azkarContainer = document.getElementById('app');
             azkarContainer.innerHTML = '';

             data.forEach(item => {
                 const card = document.createElement('div');
                 card.classList.add('card');

                 const arabicContent = document.createElement('h3');
                 arabicContent.textContent = item.arabicContent;

                 const italianContent = document.createElement('h3');
                 italianContent.textContent = item.transliteration;

                 const type = document.createElement('small');
                 type.textContent = item.type;
                 type.classList.add('type')

                 const counterButton = document.createElement('button');
                 counterButton.textContent = `Counter: 0 / ${item.maxNumber}`;
                 let counter = 0;

                 counterButton.addEventListener('click', function() {
                     counter++;
                     counterButton.textContent = `Counter: ${counter} / Max: ${item.maxNumber}`;

                     if (counter >= item.maxNumber) {
                         card.classList.add('clicked');
                         counterButton.disabled = true;
                     }
                 });
                 card.appendChild(arabicContent);
                 card.appendChild(italianContent);
                 card.appendChild(counterButton);
                 card.appendChild(type)
                 azkarContainer.appendChild(card);
             });
         })
         .catch(error => {
             console.error('Error fetching data:', error);
         });
 }

 // Fetch Azkar in base al tipo recuperato dall'URL
 fetchAzkarByType(type);

 // Event listener per il pulsante "Home"
 document.getElementById('backButton').onclick = function() {
     window.location.href = '../index.html';
 };