const CARD_PAIRS = 8;
const IMAGES = [
    'images/memory-1.jpg',
    'images/memory-2.jpg',
    'images/memory-3.jpg',
    'images/memory-4.jpg',
    'images/memory-5.jpg',
    'images/memory-6.jpg',
    'images/memory-7.jpg',
    'images/memory-8.jpg'
];

let gameState = {
    cards: [],
    flippedCards: [],
    moves: 0,
    timer: 0,
    timerInterval: null,
    matchedPairs: 0
};

function initGame() {
    createCards();
    startTimer();
    document.getElementById('restartBtn').addEventListener('click', resetGame);
}

function createCards() {
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';
    
    // 创建卡片对
    let cardImages = [];
    for (let i = 0; i < CARD_PAIRS; i++) {
        cardImages.push(IMAGES[i]);
        cardImages.push(IMAGES[i]);
    }
    
    // 打乱卡片顺序
    cardImages = shuffleArray(cardImages);
    
    // 创建卡片元素
    gameState.cards = cardImages.map((image, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        
        const front = document.createElement('div');
        front.className = 'memory-card-front';
        front.textContent = '?';
        
        const back = document.createElement('div');
        back.className = 'memory-card-back';
        const img = document.createElement('img');
        img.src = image;
        back.appendChild(img);
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.addEventListener('click', () => flipCard(card, index));
        board.appendChild(card);
        
        return {
            element: card,
            image: image,
            isFlipped: false,
            isMatched: false
        };
    });
}

function flipCard(card, index) {
    if (gameState.flippedCards.length >= 2 || 
        gameState.cards[index].isFlipped || 
        gameState.cards[index].isMatched) {
        return;
    }
    
    card.classList.add('flipped');
    gameState.cards[index].isFlipped = true;
    gameState.flippedCards.push({ card, index });
    
    if (gameState.flippedCards.length === 2) {
        gameState.moves++;
        document.getElementById('moves').textContent = gameState.moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = gameState.flippedCards;
    
    if (gameState.cards[card1.index].image === gameState.cards[card2.index].image) {
        // 匹配成功
        gameState.cards[card1.index].isMatched = true;
        gameState.cards[card2.index].isMatched = true;
        gameState.matchedPairs++;
        
        if (gameState.matchedPairs === CARD_PAIRS) {
            showSummary();
        }
        
        gameState.flippedCards = [];
    } else {
        // 匹配失败，翻回卡片
        setTimeout(() => {
            card1.card.classList.remove('flipped');
            card2.card.classList.remove('flipped');
            gameState.cards[card1.index].isFlipped = false;
            gameState.cards[card2.index].isFlipped = false;
            gameState.flippedCards = [];
        }, 1000);
    }
}

function showSummary() {
    clearInterval(gameState.timerInterval);
    alert(`恭喜完成！\n用时：${formatTime(gameState.timer)}\n移动次数：${gameState.moves}`);
}

function startTimer() {
    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        document.getElementById('timer').textContent = formatTime(gameState.timer);
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function resetGame() {
    clearInterval(gameState.timerInterval);
    gameState.moves = 0;
    gameState.timer = 0;
    gameState.matchedPairs = 0;
    gameState.flippedCards = [];
    document.getElementById('moves').textContent = '0';
    document.getElementById('timer').textContent = '00:00';
    createCards();
    startTimer();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 初始化游戏
initGame(); 