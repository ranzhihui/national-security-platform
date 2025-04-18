// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 35, 126, 0.9)';
    } else {
        navbar.style.backgroundColor = '#1a237e';
    }
});

// 课程卡片动画
const courseCards = document.querySelectorAll('.course-card');
courseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 游戏卡片动画
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 资源下载按钮点击效果
const downloadButtons = document.querySelectorAll('.download-button');
downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        alert('资源下载功能即将上线，敬请期待！');
    });
});

// 课程观看按钮点击效果
const watchButtons = document.querySelectorAll('.watch-button');
watchButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        alert('课程观看功能即将上线，敬请期待！');
    });
});

// 游戏开始按钮点击效果
const playButtons = document.querySelectorAll('.play-button');
playButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        alert('游戏功能即将上线，敬请期待！');
    });
});

// 问答游戏数据
const quizData = [
    {
        question: "国家安全的基本内涵是什么？",
        options: [
            "国家政权、主权、统一和领土完整",
            "人民福祉、经济社会可持续发展",
            "国家其他重大利益",
            "以上都是"
        ],
        correct: 3
    },
    {
        question: "以下哪项不属于国家安全领域？",
        options: [
            "政治安全",
            "经济安全",
            "文化安全",
            "个人隐私安全"
        ],
        correct: 3
    },
    {
        question: "维护国家安全的首要任务是什么？",
        options: [
            "发展经济",
            "维护国家主权和领土完整",
            "提高人民生活水平",
            "发展科技"
        ],
        correct: 1
    },
    {
        question: "以下哪项是网络安全的基本要求？",
        options: [
            "安装杀毒软件",
            "定期更换密码",
            "不点击陌生链接",
            "以上都是"
        ],
        correct: 3
    },
    {
        question: "国土安全包括哪些方面？",
        options: [
            "领土完整",
            "边境安全",
            "海洋权益",
            "以上都是"
        ],
        correct: 3
    }
];

// 游戏状态
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let answers = [];

// DOM 元素
const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.quiz-progress p');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const quizContainer = document.querySelector('.quiz-container');
const quizSummary = document.querySelector('.quiz-summary');
const scoreDisplay = document.querySelector('.score');
const earnedPointsDisplay = document.querySelector('.earned-points');

// 初始化游戏
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    answers = [];
    showQuestion();
    updateProgress();
}

// 显示问题
function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${question.question}`;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });

    // 如果已经回答过这个问题，显示之前的答案
    if (answers[currentQuestion] !== undefined) {
        const optionButtons = document.querySelectorAll('.option');
        optionButtons[answers[currentQuestion]].classList.add('selected');
        if (answers[currentQuestion] === question.correct) {
            optionButtons[answers[currentQuestion]].classList.add('correct');
        } else {
            optionButtons[answers[currentQuestion]].classList.add('incorrect');
            optionButtons[question.correct].classList.add('correct');
        }
    }

    // 更新按钮状态
    prevButton.disabled = currentQuestion === 0;
    nextButton.textContent = currentQuestion === quizData.length - 1 ? '完成' : '下一题';
}

// 选择选项
function selectOption(index) {
    if (answers[currentQuestion] !== undefined) return;

    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.classList.remove('selected', 'correct', 'incorrect');
    });

    optionButtons[index].classList.add('selected');
    selectedOption = index;
    answers[currentQuestion] = index;

    // 显示正确答案
    const correctIndex = quizData[currentQuestion].correct;
    if (index === correctIndex) {
        optionButtons[index].classList.add('correct');
        score += 20;
    } else {
        optionButtons[index].classList.add('incorrect');
        optionButtons[correctIndex].classList.add('correct');
    }
}

// 更新进度
function updateProgress() {
    const progress = (currentQuestion / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${currentQuestion}/${quizData.length}`;
    progressText.textContent = `第${currentQuestion + 1}题/共${quizData.length}题`;
}

// 显示结果
function showResults() {
    quizContainer.style.display = 'none';
    quizSummary.style.display = 'block';
    scoreDisplay.textContent = score;
    earnedPointsDisplay.textContent = Math.floor(score / 2.5); // 每2.5分获得1积分
}

// 事件监听
nextButton.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgress();
    } else {
        showResults();
    }
});

prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgress();
    }
});

document.querySelector('.restart').addEventListener('click', () => {
    quizContainer.style.display = 'block';
    quizSummary.style.display = 'none';
    initQuiz();
});

// 初始化游戏
initQuiz(); 