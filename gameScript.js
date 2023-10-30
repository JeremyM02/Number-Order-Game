const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const cardWidth = 154;
let currentNum = 1;
let playGame = false;

const cardList = document.querySelector('.cardList');
const gameButton = document.getElementById('game-button');
const gameText = document.getElementById('game-text');
const resultText = document.getElementById('result-text');
const topBar = document.querySelector('.topbar');
const resetButton = document.getElementById('reset-game');

const difficultyDiv = document.querySelector('.difficulty');
const easy = document.getElementById('easy');
const normal = document.getElementById('normal');
const hard = document.getElementById('hard');
const ultimate = document.getElementById('ultimate');
const secret = document.getElementById('secret');

let numCards;
let difficulty;

easy.addEventListener('click', function(){
    gameStart('easy');
    difficulty = 'easy';
});
normal.addEventListener('click', function(){
    gameStart('normal');
    difficulty = 'normal';
});
hard.addEventListener('click', function(){
    gameStart('hard');
    difficulty = 'hard';
});
ultimate.addEventListener('click', function(){
    gameStart('ultimate');
    difficulty = 'ultimate';
});
secret.addEventListener('click', function(){
    ultimate.style.display = "block";
    secret.style.color = "purple";
});

resetButton.addEventListener('click', function(){
    removeAllChildNodes(cardList);
    resetButton.style.display = 'none';
    gameButton.disabled = true;
    topBar.style.left = '10px';
    playGame = false;
    currentNum = 1;

    switch (difficulty){
        case 'easy':
            gameStart('easy');
            break;

        case 'normal':
            gameStart('normal');
            break;

        case 'hard':
            gameStart('hard');
            break;
        case 'ultimate':
            gameStart('ultimate');
            break;
    }
})

function gameStart(difficulty){
    console.log('lets play!');
    if (difficulty === 'easy'){
        numCards = 7;
        gameText.style.borderColor = 'green';

    } else if (difficulty === 'normal') {
        numCards = 10;

    } else if (difficulty === 'hard'){
        numCards = 15;
        gameText.style.borderColor = 'red';
    } else if (difficulty === "ultimate"){
        numCards = 50;
        gameText.style.borderColor = 'purple';
    }
    easy.remove();
    normal.remove();
    hard.remove();
    ultimate.remove();

    gameText.textContent = 'Memorize the order of the cards!';

    playCards();
}

function winGame(){
    if (difficulty === "ultimate"){
        resultText.textContent = `The codeword is SANDHILL`;
    } else if(difficulty === "hard"){
        resultText.textContent = `Wow! Restart the site and click the 'u' for the Ultimate Challenge!`;
    } else {
        resultText.textContent = `Congratulations! You counted to ${numCards}!`;
    }
    
    resultText.style.display = "block";
    resultText.style.color = "green";
    setTimeout(function(){
        resultText.style.opacity = '1';
    }, 100)
}

function checkCorrect(num){
    num = Number(num);
    console.log('num:', num);
    console.log('currentNum: ',currentNum);
    if (num === currentNum){
        if (currentNum === numCards){
            winGame();
        } else {
            currentNum++;
            gameText.textContent = `Click the cards in order from 1 to ${numCards}! (Current Number: ${currentNum})`;   
        }
        return true;
    } else {
        return false;
    }
}


const addCard = value => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = value;
    card.id = value;

    let randomXPos = randomizeNumber(0, screenWidth - cardWidth);
    let randomYPos = randomizeNumber(90, screenHeight - cardWidth);

    card.style.left = `${randomXPos}px`;
    card.style.top = `${randomYPos}px`;
    cardList.appendChild(card);

    card.addEventListener('click', function(){
        if (playGame === true){
            let isCorrect = checkCorrect(card.id);
            if (isCorrect === true){
                console.log('CORRECT');
                card.style.backgroundColor = 'green';   
                card.textContent = card.id;

                if (Number(card.id) != numCards) {
                    card.style.opacity = '0';
                    card.style.pointerEvents = 'none';
                    setTimeout(function(){
                        card.remove();
                    
                    }, 1000);
                }
            } else {
                console.log('NOT CORRECT');
                card.style.backgroundColor = 'red';
                card.textContent = card.id;
                card.style.zIndex = '2';
                playGame = false;

                const correctCard = document.getElementById(currentNum);
                correctCard.style.backgroundColor = 'gray';
                correctCard.textContent = currentNum;
                correctCard.style.zIndex = '3';

                resetButton.style.display = 'block';
            }
        }
    })
};

console.log('Screen Width', screenWidth);
console.log('Screen Height', screenHeight);

function playCards(){
    let i = numCards
    gameButton.style.display = "block";

    let addCardsInterval = setInterval(() => {
        addCard(i);
        i--;
        if (i === 0){
            clearInterval(addCardsInterval);
            gameButton.disabled = false;
            gameButton.textContent = 'Ready!';
            gameButton.addEventListener('click', function(){    
                gameButton.style.display = 'none';
                topBar.style.left = '0';
                gameText.textContent = `Click the cards in order from 1 to ${numCards}! (Current Number: ${currentNum})`;

                for (let i = 0; i < cardList.children.length; i++){
                    let card = cardList.children[i];
                    card.textContent = '?';
                    playGame = true;
                }
            })
        }
    }, 250);
}

//"Borrowed"
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function randomizeNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}