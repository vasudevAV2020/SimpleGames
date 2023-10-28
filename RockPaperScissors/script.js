const startGameButton = document.getElementById('startGameButton');
const gameContainer = document.getElementById('game');
const choices = document.querySelectorAll('.choice');

let userChoice = null;

startGameButton.addEventListener('click', () => {
    showGamePopup();
    gameContainer.classList.remove('hidden');
    startGameButton.disabled = true;
});

const showGamePopup = () => {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Rock, Paper, Scissors</h2>
            
            <p>Make your choice:</p>
            <button class="popup-choice" id="rock">Rock</button>
            <button class="popup-choice" id="paper">Paper</button>
            <button class="popup-choice" id="scissors">Scissors</button>
        </div>
    `;

    const popupChoices = popup.querySelectorAll('.popup-choice');
    popupChoices.forEach(choice => {
        choice.addEventListener('click', (e) => {
            userChoice = e.target.id;
            playGame();
        });
    });

    document.body.appendChild(popup);
};

const playGame = () => {
    const computerChoice = getComputerChoice();
    const resultMessage = determineWinner(userChoice, computerChoice);
    const message = `You chose ${userChoice}. Computer chose ${computerChoice}. ${resultMessage}`;
    showGameResultPopup(message);
};

const getComputerChoice = () => {
    const computerChoices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return computerChoices[randomIndex];
};

const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
};

const showGameResultPopup = (message) => {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Game Result</h2>
            <p>${message}</p>
            <button id="playAgainButton">Play Again</button>
        </div>
    `;

    const playAgainButton = popup.querySelector('#playAgainButton');
    playAgainButton.addEventListener('click', () => {
        document.body.removeChild(popup);
        userChoice = null;
        showGamePopup();
    });

    document.body.appendChild(popup);
};
