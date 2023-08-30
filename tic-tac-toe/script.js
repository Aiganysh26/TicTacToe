const COMBINATIONS = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const PLAYERS = {
    'first': 'X',
    'second': 'O'
};

const FILLED_FIELDS = {
    'X': [],
    'O': []
};

let CURRENT_PLAYER = PLAYERS.first;

const subContainer = document.getElementById('sub-container');

initializeGame();

// Генерация полей (3 x 3)
function initializeGame() {
    for (let i = 0; i < 9; i++) {
        let block = createBlock(i);
        handleEventListener(block);
        subContainer.append(block);
    }
}

// Создание одного поля
function createBlock(id) {
    let block = document.createElement('div');
    block.classList.add('block');
    block.id = id;
    return block;
}

// Создание текста для X O
function createText(text) {
    let element = document.createElement('p');
    element.innerText = text;
    element.classList.add('symbol');
    return element;
}

// Добавление слушателя на клик
function handleEventListener(element) {
    const listener = (event) => {
        let block = event.target;
        let textElement = createText(CURRENT_PLAYER);
        block.append(textElement);
        block.removeEventListener('click', listener, false);
        pushClickedFieldToArray(block);
        checkVictory();
        swapPlayers();
    };
    element.addEventListener('click', listener);
}

// Очередь игроков
function swapPlayers() {
    let players = Object.keys(PLAYERS);
    for (let i = 0; i < players.length; i++) {
        if (PLAYERS[players[i]] !== CURRENT_PLAYER) {
            CURRENT_PLAYER = PLAYERS[players[i]];
            return;
        }
    }
}


// Обработка победы
function checkVictory() {
    if (isVictory()) {
        alert(`Player "${getPlayerBySymbol()}" HAS WON!`);
        window.location.reload();
    }
}

// Проверка, победил ли игрок
function isVictory() {
    const filledFields = FILLED_FIELDS[CURRENT_PLAYER];

    for (let combination of COMBINATIONS) {
        let counter = 0;
        for (let number of combination) {
            if (filledFields.indexOf(number) === -1) break;
            counter++;
        }
        if (counter === 3) return true;
    }

    return false;
}

// Добавление выбранного поля в массив
function pushClickedFieldToArray(block) {
    FILLED_FIELDS[CURRENT_PLAYER].push(parseInt(block.id));
}

// Получить номер игрока по его символу
function getPlayerBySymbol() {
    let players = Object.keys(PLAYERS);
    for (let i = 0; i < players.length; i++) {
        if (PLAYERS[players[i]] === CURRENT_PLAYER) {
            return players[i]
        }
    }
    return null;
}