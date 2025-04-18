// Game difficulty settings
const difficultySettings = {
    easy: {
        options: 3, // Number of colors to choose from
        colorVariance: 150,  // Colors will still be identifiable
        lives: 5
    },
    medium: {
        options: 4,
        colorVariance: 80,
        lives: 3
    },
    hard: {
        options: 5,
        colorVariance: 30,  // Colors will be very similar
        lives: 2
    }
};

// Game state
let score = 0;
let lives = 3;
let correctColor = null; // Stores the RGB color players need to guess
let currentDifficulty = 'easy';
let colorOptions = []; // Array of color choices for each round

// DOM elements stored in constant variables for better execution
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const targetRgbDisplay = document.getElementById('target-rgb');
const colorOptionsContainer = document.getElementById('color-options');
const feedbackDisplay = document.getElementById('feedback');
const gameOverModal = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');
const difficultyButtons = document.querySelectorAll('.difficulty-button');

// Initialize game whent he DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupDifficultyButtons();
    resetGame();
});

// Set up difficulty buttons
function setupDifficultyButtons() {
    difficultyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update UI and game state for new difficulty
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Set new difficulty and restart game
            currentDifficulty = this.dataset.difficulty;
            resetGame();
        });
    });
}

// Generates a random RGB color to be guessed
function generateRandomRGB() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

// Functions to help the main functions of the script

// Clamp function from MDN Math.max and Math.min examples (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Shuffle algorithm from StackOverflow (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Function to compare two RGB color objects 
function colorsEqual(color1, color2) {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
}

// Main function to generate a similar (but incorrect) color based on the difficulty
function generateSimilarColor(baseColor) {
    const variance = difficultySettings[currentDifficulty].colorVariance;
    return {
        r: clamp(baseColor.r + Math.floor(Math.random() * variance * 2) - variance, 0, 255),
        g: clamp(baseColor.g + Math.floor(Math.random() * variance * 2) - variance, 0, 255),
        b: clamp(baseColor.b + Math.floor(Math.random() * variance * 2) - variance, 0, 255)
    };
}

// Regenerates new set of colors when a new round has started
function newRound() {
    // Clears the previous state or resets the UI elements
    colorOptionsContainer.innerHTML = '';
    feedbackDisplay.textContent = '';
    feedbackDisplay.className = 'feedback-message';
    
    // Set the class for current difficulty
    colorOptionsContainer.className = `color-options ${currentDifficulty}`;
    
    // Generates a new target color
    correctColor = generateRandomRGB();
    targetRgbDisplay.textContent = `RGB(${correctColor.r}, ${correctColor.g}, ${correctColor.b})`;
    
    // Generate color options including the correct one
    colorOptions = [{...correctColor}]; // Start with correct color
    const settings = difficultySettings[currentDifficulty];
    
    // Will generate incorrect options and stops if it is equal to the number of options given for the difficulty mode
    while (colorOptions.length < settings.options) { 
        const similarColor = generateSimilarColor(correctColor);
        // Ensure we don't have duplicate colors
        if (!colorOptions.some(c => colorsEqual(c, similarColor))) {
            colorOptions.push(similarColor);
        }
    }
    
    // Shuffle and display the color options
    colorOptions = shuffleArray(colorOptions);
    
    // Create color option elements
    colorOptions.forEach(color => {
        const colorElement = document.createElement('div');
        colorElement.className = 'color-chosen';
        colorElement.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        colorElement.addEventListener('click', () => handleColorSelection(color));
        colorOptionsContainer.appendChild(colorElement);
    });
}

// Displays the result according to the selected color
function handleColorSelection(selectedColor) {
    if (colorsEqual(selectedColor, correctColor)) {
        // Correct answer
        score++;
        scoreDisplay.textContent = score; // Updates the score
        feedbackDisplay.textContent = 'Correct!';
        feedbackDisplay.className = 'feedback-message correct-feedback';
        setTimeout(newRound, 1000); // Proceed to new round after a brief delay
    } else {
        // Wrong answer
        lives--;
        livesDisplay.textContent = lives; // Updates the lives
        feedbackDisplay.textContent = 'Wrong! Try again.';
        feedbackDisplay.className = 'feedback-message incorrect-feedback';
        
        // Ends the game if the lives count is equal to 0
        if (lives <= 0) {
            endGame();
        }
    }
}

// Modal pattern is from W3Schools How TO - CSS/JS Modal (https://www.w3schools.com/howto/howto_css_modals.asp)
function endGame() { // Show game over modal with final score
    finalScoreDisplay.textContent = score; 
    gameOverModal.style.display = 'flex'; //Game over modal will popup when the game ends
}


// Resets the game settings to its original state and starts a new round
function resetGame() {
    const settings = difficultySettings[currentDifficulty];
    score = 0;
    lives = settings.lives;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    gameOverModal.style.display = 'none'; // Hides the modal display
    newRound();
}

// Event listener to play a new game
playAgainButton.addEventListener('click', resetGame);