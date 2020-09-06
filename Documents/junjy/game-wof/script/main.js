'use strict'
// SEIF3 - PROJECT #1 - WOF
// console.log('linked');

// **Part 2A:**
// 1. Declare play new game function + player variable (user)
//    - User to input name
// 2. Write player function
//    - **Option A: Spin Wheel** 
//    - If not bankrupt, User to input letter
//      - If correct, to add to earnings. User to input next letter until puzzle is completed or if player solves puzzle correctly
//      - If wrong or repeated, next player to take over
//    - If bankrupt or lose a turn, next player to take over

// **COMMIT WORK:-**
// "Commit #2: Set up user and spin wheel/input letter function"


//--------- PUZZLE & WHEEL SETUP ---------//

//To update css & design later
const puzzleArray = ['DAIRY QUEEN OF HEARTS', 'CLASH OF THE TITANS', 'CHOCOLATE MACADAMIA NUT COOKIES', 'DELICIOUS DECADENT DESSERTS', 'CASHING IN A HUGE STACK OF CHIPS', 'ALL-DAY SKI LIFT TICKETS', 'CASABLANCA MOROCCO', 'THE VIEW FROM THE TOP OF A MOUNTAIN', 'PERSONALIZED STATIONERY', 'ST. ELMO\'S FIRE EXTINGUISHER'];

//To update values later. Note 18 so far
const wheelValues = [300, 400, 500, 600, 700, 800, 900, 1000, 2500, 'BANKRUPT', 300, 400, 500, 600, 700, 800, 900, 1000];

const puzzleBoard = document.querySelector('#puzzle-board');
const wheelBoard = document.querySelector('#wheel-board');
const playerStand = document.querySelector('#player-stand');
const scoreBoard = document.querySelector('#score-board');

// Initialize player data
let playerCurrent = {
    name: "",
    earnedTotal: 0,   // total for all games
    earnedCurrent: 0  // for current game only
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
// Validate user input
function initPlayer() {

    playerCurrent.name = prompt('Please enter your name');
    let playerDiv = document.createElement('div');
    let playerName = document.createTextNode(playerCurrent.name);

    playerDiv.append(playerName);
    playerStand.append(playerDiv);

}

// To update function later & hide letters
// Review no. of variables declared later
function initPuzzle() {

    let randNum = Math.floor(Math.random() * puzzleArray.length);
    puzzleCurrent = puzzleArray[randNum];

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
// Collect player data: name, total earnings, current earnings
// Add event listeners to buttons below
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
        console.log(errorMsg);
        alert(errorMsg);
        exitGame();
    }

}


// Update consonant letter check later
// Validate user input later
function guessLetter() {
    let letter = prompt('Guess a letter');
    console.log('Current guess: ' + letter);

    guessLettersCurrent.push(letter);
    console.log('Guessed letters to-date: ' + guessLettersCurrent);
    // check letter against current puzzle
    // if () {


    // } 

}


// Update vowel letter check later
// Validate user input later
function buyVowel() {

    // Cost of each vowel = $250
    if (playerCurrent.earnedCurrent >= 250) {
        let letter = prompt('Guess a letter');

        // check letter against current puzzle
        // if () {

        // } 

    } else {
        let errorMsg = 'GAME OVER: Sorry, you do not have sufficient money to buy a vowel.';
        console.log(errorMsg);
        alert(errorMsg);
        exitGame();
    }

}

// Rephrase question to player later
// Validate user input later
function solvePuzzle() {

    let answer = prompt('Type the puzzle answer below');

    if (answer === puzzleCurrent) {
        if (playerCurrent.earnedCurrent === 0) {
            playerCurrent.earnedCurrent = 1000; // minimum earnings
        }

        let successMsg = 'Congrats! You solved the puzzle! You\'ve earned ' + playerCurrent.earnedCurrent + ' for this game!';
        console.log(successMsg);
        alert(successMsg);
        
    } else {
        let errorMsg = 'GAME OVER: Sorry, wrong guess! Better luck next time!';
        console.log(errorMsg);
        alert(errorMsg);
        exitGame();
        
    }

}

// validate user input or insert Y/N buttons
function checkIfExit() {

    let checkMsg = prompt(playerCurrent.name + ', are you sure you want to exit?');
    if (checkMsg === 'y') {
        exitGame();
    }

}

function exitGame() {

    let exitMsg = 'Bye ' + playerCurrent.name + '! See you next time!';
    console.log(exitMsg);
    alert(exitMsg);

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


// INITIALIZE NEW GAME
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






