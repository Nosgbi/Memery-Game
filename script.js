const gameBoard = document.getElementById('game-board');
const cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let firstCard = null;
let secondCard = null;

// Shuffle the cards
cards.sort(() => 0.5 - Math.random());

// Create the cards
for (let i = 0; i < cards.length; i++) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = cards[i];
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
}

// Flip the card
function flipCard() {
  if (this === firstCard) return;
  
  this.classList.add('flip');
  
  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

// Check if the cards match
function checkMatch() {
  const isMatch = firstCard.card === secondCard.card;
  
  isMatch ? disableCards() : unflipCards();
}

// Disable the cards if they match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  reset();
}

// Unflip the cards if they don't match
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    reset();
  }, 1000);
}

// Reset the cards
function reset() {
  firstCard = null;
  secondCard = null;
  const flippedCards = document.querySelectorAll('.flip');
  flippedCards.forEach(card => card.classList.remove('flip'));
  cards.sort(() => 0.5 - Math.random());
  gameBoard.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = cards[i];
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  }
}
