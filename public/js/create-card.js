const frontArea = document.getElementById("front-page-input");
const backArea = document.getElementById("back-page-input");

const saveButton = document.getElementById("button");

const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const request = indexedDB.open("Cards-Database", 5)

request.onerror = () => {
    alert("Problem happened in the database");
};

request.onupgradeneeded = () => {
    const database = request.result;
    const DbObjectStore = database.createObjectStore("card-values", { keyPath: "id" })

    DbObjectStore.createIndex("front-value", ["front"], { unique: false })
    DbObjectStore.createIndex("back-value", ["back"], { unique: false })
};

request.onsuccess = () => {
    const database = request.result;

    saveButton.addEventListener("click", () => {
        const frontValue = frontArea.value;
        const backValue = backArea.value;

        const cardAmount = parseInt(localStorage.getItem("cardAmount")) + 1 || 1;
        localStorage.removeItem("cardAmount");
        localStorage.setItem("cardAmount", cardAmount);

        const transaction = database.transaction("card-values", "readwrite");
        const cardStore = transaction.objectStore("card-values");

        cardStore.add({ id: cardAmount, front: frontValue, back: backValue});

        transaction.oncomplete = (event) => {
            alert("Card Add Successfully");
        };
    
        transaction.onerror = (event) => {
            alert("Same Card");
        };

        frontArea.value = "";
        backArea.value = "";
    });
}
    
