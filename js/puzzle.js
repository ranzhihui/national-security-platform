// 拼图游戏配置
const PUZZLE_SIZE = 3;
const IMAGE_URL = 'images/puzzle.jpg';

// 游戏状态
let gameState = {
    moves: 0,
    timer: 0,
    timerInterval: null,
    emptyPosition: { row: 2, col: 2 }
};

// 初始化游戏
function initGame() {
    createPuzzlePieces();
    startTimer();
    document.getElementById('shuffleBtn').addEventListener('click', shufflePuzzle);
    document.getElementById('hintBtn').addEventListener('click', showHint);
}

// 创建拼图块
function createPuzzlePieces() {
    const board = document.getElementById('puzzleBoard');
    board.innerHTML = '';
    
    for (let row = 0; row < PUZZLE_SIZE; row++) {
        for (let col = 0; col < PUZZLE_SIZE; col++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.dataset.row = row;
            piece.dataset.col = col;
            
            if (row === PUZZLE_SIZE - 1 && col === PUZZLE_SIZE - 1) {
                piece.style.backgroundColor = '#333';
            } else {
                const img = document.createElement('img');
                img.src = IMAGE_URL;
                img.style.objectPosition = `-${col * 100}% -${row * 100}%`;
                piece.appendChild(img);
            }
            
            piece.addEventListener('click', () => movePiece(row, col));
            board.appendChild(piece);
        }
    }
}

// 移动拼图块
function movePiece(row, col) {
    const emptyRow = gameState.emptyPosition.row;
    const emptyCol = gameState.emptyPosition.col;
    
    if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
        // 移动拼图块
        gameState.moves++;
        document.getElementById('moves').textContent = gameState.moves;
        
        // 更新空位位置
        gameState.emptyPosition = { row, col };
        
        // 检查是否完成
        if (checkCompletion()) {
            showSummary();
        }
    }
}

// 检查拼图是否完成
function checkCompletion() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    let isComplete = true;
    
    pieces.forEach(piece => {
        const row = parseInt(piece.dataset.row);
        const col = parseInt(piece.dataset.col);
        const expectedRow = Math.floor(parseInt(piece.dataset.index) / PUZZLE_SIZE);
        const expectedCol = parseInt(piece.dataset.index) % PUZZLE_SIZE;
        
        if (row !== expectedRow || col !== expectedCol) {
            isComplete = false;
        }
    });
    
    return isComplete;
}

// 显示游戏总结
function showSummary() {
    clearInterval(gameState.timerInterval);
    alert(`恭喜完成！\n用时：${formatTime(gameState.timer)}\n移动次数：${gameState.moves}`);
}

// 开始计时器
function startTimer() {
    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        document.getElementById('timer').textContent = formatTime(gameState.timer);
    }, 1000);
}

// 格式化时间
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// 显示提示
function showHint() {
    alert('提示：尝试将右下角的拼图块移动到正确位置');
}

// 重置游戏
function resetGame() {
    clearInterval(gameState.timerInterval);
    gameState.moves = 0;
    gameState.timer = 0;
    gameState.emptyPosition = { row: 2, col: 2 };
    document.getElementById('moves').textContent = '0';
    document.getElementById('timer').textContent = '00:00';
    createPuzzlePieces();
    startTimer();
}

// 初始化游戏
initGame(); 