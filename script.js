const card = document.querySelector('.card');

const randomizeNumber = () => Math.floor(Math.random() * 100);

card.style.left = `${randomizeNumber()} px`;
console.log('done1');