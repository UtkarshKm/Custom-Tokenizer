const textInput = document.getElementById('text-input');
const clearBtn = document.getElementById('clear-btn');
const tokenCountEl = document.getElementById('token-count');
const charCountEl = document.getElementById('char-count');
const textView = document.getElementById('text-view');
const idsView = document.getElementById('ids-view');
const tabBtns = document.querySelectorAll('.tab-btn');
const viewVocabBtn = document.getElementById('view-vocab-btn');
const vocabModal = document.getElementById('vocab-modal');
const closeBtn = document.querySelector('.close-btn');
const vocabContent = document.getElementById('vocab-content');
const examplesDiv = document.getElementById('examples');

const colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];
const wordColorMap = {};
let colorIndex = 0;

function getWordColor(word) {
    if (!wordColorMap[word]) {
        wordColorMap[word] = colors[colorIndex % colors.length];
        colorIndex++;
    }
    return wordColorMap[word];
}

textInput.addEventListener('input', () => {
    const text = textInput.value;
    charCountEl.textContent = text.length;
    tokenize(text);
});

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    tokenCountEl.textContent = 0;
    charCountEl.textContent = 0;
    textView.innerHTML = '';
    idsView.innerHTML = '';
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`${btn.dataset.view}-view`).classList.add('active');
    });
});

async function tokenize(text) {
    if (!text) {
        tokenCountEl.textContent = 0;
        textView.innerHTML = '';
        idsView.innerHTML = '';
        return;
    }

    const response = await fetch('/tokenize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });

    const data = await response.json();

    tokenCountEl.textContent = data.tokens.length;

    textView.innerHTML = '';
    idsView.innerHTML = '';

    data.tokens.forEach((token) => {
        // Text view
        const tokenEl = document.createElement('span');
        tokenEl.classList.add('token');
        tokenEl.textContent = token.word;
        tokenEl.style.backgroundColor = getWordColor(token.word);
        textView.appendChild(tokenEl);

        // IDs view
        const tokenIdEl = document.createElement('span');
        tokenIdEl.classList.add('token-id');
        tokenIdEl.textContent = token.id;
        idsView.appendChild(tokenIdEl);
    });
}

viewVocabBtn.addEventListener('click', async () => {
    const response = await fetch('/vocab');
    const data = await response.json();

    vocabContent.innerHTML = '';
    for (const [word, id] of Object.entries(data.vocab)) {
        const vocabItem = document.createElement('div');
        vocabItem.textContent = `${id}: ${word}`;
        vocabContent.appendChild(vocabItem);
    }

    vocabModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    vocabModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == vocabModal) {
        vocabModal.style.display = 'none';
    }
});

async function fetchExamples() {
    const response = await fetch('/examples');
    const data = await response.json();

    data.examples.forEach(example => {
        const p = document.createElement('p');
        p.textContent = example;
        p.addEventListener('click', () => {
            textInput.value = example;
            charCountEl.textContent = example.length;
            tokenize(example);
        });
        examplesDiv.appendChild(p);
    });
}

fetchExamples();