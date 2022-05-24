// const card = document.querySelector('.card');
const cardList = document.querySelector('.cardList');
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
let hoverIndex = 0;

const randomizeNumber = (min, max) => min + Math.floor(Math.random() * max);


const addCard = value => {
    let card = document.createElement('div');
    card.classList.add('card');
    const cardWidth = card.offsetWidth;
    card.innerHTML = value;

    let randomXPos = randomizeNumber(0, screenWidth - cardWidth);
    let randomYPos = randomizeNumber(0, screenHeight - 5 * cardWidth);

    card.style.left = `${randomXPos}px`;
    card.style.top = `${randomYPos}px`;
    cardList.appendChild(card);

    card.addEventListener('mouseover', function(){
        card.style.zIndex = `${hoverIndex}`;
        hoverIndex++;
        console.log(hoverIndex);
    })
};

console.log('Screen Width', screenWidth);
console.log('Screen Height', screenHeight);

for (var i = 1; i < 10; i++){
    addCard(i);
}