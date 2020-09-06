'use strict'
// SEIF3 - PROJECT #1 - WOF
// console.log('linked');

// 3. **Option B: Buy A Vowel** 
//     - (N.A. for 1st round)
//     - Check if have sufficient money
//     - If have, input vowel
//         If input correct, to continue spin wheel 

// **COMMIT WORK:-**
// "Commit #3: Set up user-buy vowel function"


//--------- PUZZLE & WHEEL SETUP ---------//

const puzzleBoard = document.querySelector('#puzzle-board');
const wheelBoard = document.querySelector('#wheel-board');
const playerStand = document.querySelector('#player-stand');
const scoreBoard = document.querySelector('#score-board');

// Recheck regex
const vowelsRegex = /^[aeiou]$/gi; 
const consonantsRegex = /^[bcdfghjklmnpqrstvwxyz]$/gi; 

//To update css & design later
const puzzleArray = ['DAIRY QUEEN OF HEARTS', 'CLASH OF THE TITANS', 'CHOCOLATE MACADAMIA NUT COOKIES', 'DELICIOUS DECADENT DESSERTS', 'CASHING IN A HUGE STACK OF CHIPS', 'ALL-DAY SKI LIFT TICKETS', 'CASABLANCA MOROCCO', 'THE VIEW FROM THE TOP OF A MOUNTAIN', 'PERSONALIZED STATIONERY', 'ST. ELMO\'S FIRE EXTINGUISHER'];

//To update values later. Note 18 so far
const wheelValues = [300, 400, 500, 600, 700, 800, 900, 1000, 2500, 'BANKRUPT', 300, 400, 500, 600, 700, 800, 900, 1000];

// Initialize player data
let playerCurrent = {
    name: "",
    earnedTotal: 0,   // total for all games
    earnedCurrent: 0 // for current game only
}

let puzzleCurrent = "";
let guessLettersCurrent = []; // letters guessed for current game only


// Set up buttons 1.Spin Wheel 2.Buy a vowel 3.Solve It! 4.Exit Game
let lineBreak = document.createElement('br');
let btnSpinWheel = document.createElement('button');
btnSpinWheel.setAttribute('id', 'btn-spin-wheel');
btnSpinWheel.innerHTML = 'Spin Wheel';

let btnBuyVowel = document.createElement('button');
btnBuyVowel.setAttribute('id', 'btn-buy-vowel');
btnBuyVowel.innerHTML = 'Buy Vowel';

let btnSolvePuzzle = document.createElement('button');
btnSolvePuzzle.setAttribute('id', 'btn-solve-puzzle');    
btnSolvePuzzle.innerHTML = 'Solve It!';

let btnExitGame = document.createElement('button');
btnExitGame.setAttribute('id', 'btn-exit-game');  
btnExitGame.innerHTML = 'Exit Game';   

playerStand.append(btnSpinWheel, btnBuyVowel, btnSolvePuzzle, btnExitGame);


//--------- MAIN BOARD & PLAYER SETUP ---------//
// 1. Start New Game
// 2. Initialize Player (single-player)
// 3. Initialize Puzzle


// Add function later
function startNewGame() {



}

// Refine playerstand setup and CSS later
// Improve validate user input prompt
function initPlayer() {

    playerCurrent.name = prompt('Please enter your name');
    if (playerCurrent.name === "") {
        alert("Name must not be empty");
        return

    } else {
        let playerDiv = document.createElement('div');
        let playerName = document.createTextNode(playerCurrent.name);

        playerDiv.append(playerName);
        playerStand.append(playerDiv);

    }

}

// To update function later & hide letters
// Review no. of variables declared later
function initPuzzle() {

    let randNum = Math.floor(Math.random() * puzzleArray.length);
    puzzleCurrent = puzzleArray[randNum];
    console.log(puzzleCurrent);

    let puzzleDiv = document.createElement('div');

    // Generate squares for each letter
    let puzzleSplit = puzzleCurrent.split('');
    puzzleSplit.forEach((element) => {
        // console.log(element);
        let sqDiv = document.createElement('div');
        sqDiv.setAttribute('class', 'square-box');

        let letter = document.createTextNode(element);
        sqDiv.append(letter);

        if (element === ' ') {
            // console.log('space');
            sqDiv.classList.add('class', 'square-blank');            
        } else {
            sqDiv.classList.add('class', 'square-text');
        }
        puzzleDiv.append(sqDiv);
    })
    puzzleBoard.append(puzzleDiv);

}

//--------- PLAYER FUNCTIONS ---------//
// 1. Spin Wheel
// 2. Guess Letter
// 3. Buy Vowel
// 4. Solve Letter
// 5. Exit Game


// To upgrade spin wheel function later
function spinWheel() {

    let randNum = Math.floor(Math.random() * wheelValues.length);
    let wheelDiv = document.createElement('div');
    let spinValueCurrent = wheelValues[randNum];
    let wheelText = document.createTextNode(spinValueCurrent);    

    wheelDiv.append(wheelText);
    wheelBoard.append(wheelDiv);
    console.log('Current spin: ' + spinValueCurrent)

    if (spinValueCurrent != 'BANKRUPT') {
        guessLetter();

    } else {
        let errorMsg = "GAME OVER: Sorry, you spinned BANKRUPT. Better luck next time!";
        exitGame(errorMsg);
    }

}

function isVowelOrConsonant(input) {
    if (vowelsRegex.test(input)) {
        return 'vowel';
    } else if (consonantsRegex.test(input)) {
        return 'consonant';
    } else {
        return false;
    }

}

// Validate user input later for other char #$%$#^%. 
// Also change to lowercase
function guessLetter() {
    let letter = prompt('Guess a letter (consonant)');
    let letterCheck = isVowelOrConsonant(letter);

    // Validate player input
    if (letter === "") {
        let errorMsg = 'GAME OVER: You did not enter a letter!';
        exitMsg(errorMsg);

    } else if (letterCheck === false || letterCheck === 'vowel'){
        let errorMsg = 'GAME OVER: You entered an invalid letter!';
        exitGame(errorMsg);

    } else {
        guessLettersCurrent.push(letter);
        console.log('Current guess: ' + letter);
        console.log('Guessed letters to-date: ' + guessLettersCurrent);

        // check if letter is a consonant
        if (letterCheck === 'consonant') {
            console.log('you entered a consonant');

            // then check if consonant exists in current puzzle
            // if () {
            // } 

        } else {
            let errorMsg = 'GAME OVER: You entered a vowel instead of a consonant.';
            exitGame(errorMsg);

        }

    }


}


// Validate user input later
function buyVowel() {

    // Cost of each vowel = $250
    if (playerCurrent.earnedCurrent >= 250) {
        let letter = prompt('Guess a letter (vowel)');

        // check if letter is a vowel first
        let vowelCheck = isVowelOrConsonant(letter);
        if (vowelCheck === 'vowel') {
            console.log('you entered a vowel');

            // then check if vowel exists in current puzzle
            // if () {

            // } 

        } else {
            let errorMsg = 'GAME OVER: You entered a consonant instead of a vowel.'
            exitGame(errorMsg);
        }


    } else {
        let errorMsg = 'GAME OVER: Sorry, you do not have sufficient money to buy a vowel.';
        exitGame(errorMsg);
    }

}


// OK button gives default correct answer: to check!!!
// Rephrase question to player later
// Validate user input later
function solvePuzzle() {

    let answer = prompt('Type the puzzle answer below');

    if (answer === puzzleCurrent) {
        if (playerCurrent.earnedCurrent === 0) {
            playerCurrent.earnedCurrent = 1000; // minimum earnings
        }

        let successMsg = 'Congrats! You solved the puzzle! You\'ve earned ' + playerCurrent.earnedCurrent + ' for this game! See you again!';
        exitGame(successMsg);
        
    } else {
        let errorMsg = 'GAME OVER: Sorry, wrong guess! Better luck next time!';
        exitGame(errorMsg);
        
    }

}

// validate user input or insert Y/N buttons
function checkIfExit() {

    let checkMsg = prompt(playerCurrent.name + ', are you sure you want to exit?');
    if (checkMsg === 'y') {
        exitGame();
    }

}

function exitGame(msg) {

    if (msg !== "") {
        console.log(msg);
        alert(msg);

    } else {
        let exitMsg = 'Bye ' + playerCurrent.name + '! See you next time!';
        console.log(exitMsg);
        alert(exitMsg);
    
    }

    // reset player data
    let playerReset = {
        name: "",
        earnedTotal: 0,   // total for all games
        earnedCurrent: 0  // for current game only
    }

    playerCurrent = playerReset;
    puzzleCurrent = "";
    guessLettersCurrent = [];

}


//--------- INITIALIZE NEW GAME ---------//

initPlayer();
initPuzzle();

btnSpinWheel.addEventListener('click', (event) => {
    console.log('spin wheel btn clicked');
    spinWheel();
})

btnBuyVowel.addEventListener('click', (event) => {
    console.log('buy vowel btn clicked');
    buyVowel();
})

btnSolvePuzzle.addEventListener('click', (event) => {
    console.log('solve puzzle btn clicked');
    solvePuzzle();
})

btnExitGame.addEventListener('click', (event) => {
    console.log('exit game btn clicked');
    checkIfExit();
})






