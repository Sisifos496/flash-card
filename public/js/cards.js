if (!('indexedDB' in window)) {
    alert('IndexedDB is not supported by your browser');
} else {
    const request = window.indexedDB.open('Cards-Database', 5);

    request.onerror = (event) => {
        alert('Problem happened in the database: ' + event.target.errorCode);
    };

    request.onupgradeneeded = (event) => {
        const database = event.target.result;
        const objectStore = database.createObjectStore('card-values', { keyPath: 'id', autoIncrement: true });

        objectStore.createIndex('front-value', 'front', { unique: false });
        objectStore.createIndex('back-value', 'back', { unique: false });
    };

    request.onsuccess = (event) => {
        const database = event.target.result;

        const transaction = database.transaction('card-values', "readwrite");
        const cardStore = transaction.objectStore('card-values');

        const mainCardPlace = document.getElementById('cards');

        const cardAmount = parseInt(localStorage.getItem('cardAmount')) || 0;

        for (let i = 1; i <= cardAmount; i++) {
            const card = document.createElement('div');
            card.className = 'card';

            const idTextDiv = document.createElement('div');
            idTextDiv.className = 'id-text-div';

            const idText = document.createElement('h1');
            idText.className = 'id-text';
            idText.textContent = i;

            idTextDiv.appendChild(idText);

            const frontTextDiv = document.createElement('div');
            frontTextDiv.className = 'front-text-div';

            const backTextDiv = document.createElement('div');
            backTextDiv.className = 'back-text-div';

            const requestGet = cardStore.get(i);

            requestGet.onsuccess = (event) => {
                const cardData = event.target.result;

                if (cardData) {
                    const frontText = document.createElement('h1');
                    frontText.className = 'front-text';
                    frontText.textContent = cardData.front;

                    frontTextDiv.appendChild(frontText);

                    const backText = document.createElement('h1');
                    backText.className = 'back-text';
                    backText.textContent = cardData.back;

                    backTextDiv.appendChild(backText);
                }
            };

            card.appendChild(idTextDiv);
            card.appendChild(frontTextDiv);
            card.appendChild(backTextDiv);

            mainCardPlace.appendChild(card);
        }
    };
}

