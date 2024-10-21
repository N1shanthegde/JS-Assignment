const card = document.querySelector("#cardContainer");
const searchInput = document.querySelector(".search-input");
const languageFilter = document.querySelector("#languageFilter");
const ratingFilter = document.querySelector(".rating-filter");

const languages = ['English', 'Kannada', 'Hindi', 'Telugu', 'Tamil', 'Malayalam'];

async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    renderCards(data);
}

function renderCards(data) {
    card.innerHTML = '';
    data.forEach(item => {
        const cardBody = document.createElement('div');
        cardBody.classList.add('card1');
        cardBody.innerHTML = `
            <h2>${item.title}</h2>
            <p>Likes: ${Math.floor(Math.random() * 1000) + 1}</p>
            <p>Language: ${languages[Math.floor(Math.random() * languages.length)]}</p>
            <button onclick="deleteCard(this)">Delete</button>
        `;
        card.appendChild(cardBody);
    });
}


// Delete card function
function deleteCard(button) {
    const card = button.parentElement;
    cardContainer.removeChild(card);
}

// Search functionality
// searchInput.addEventListener('input', (e) => {
//     const msg = "not found";
//     const query = e.target.value.toLowerCase();
//     const cards = cardContainer.children;
//     Array.from(cards).forEach(card => {
//         const title = card.querySelector('h2').textContent.toLowerCase();
//         card.style.display = title.includes(query) ? 'block' : `${msg}`;
//     });
// });

searchInput.addEventListener('input', (e) => {

    const query = e.target.value.toLowerCase();
    const cards = card.children;
    Array.from(cards).forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});

languageFilter.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    const cards = card.children;
    Array.from(cards).forEach(card => {
        const language = card.querySelector('p:nth-child(3)').textContent.split(': ')[1];
        card.style.display = selectedLanguage === '' || language === selectedLanguage ? 'block' : 'none';
    });
});

fetchData();