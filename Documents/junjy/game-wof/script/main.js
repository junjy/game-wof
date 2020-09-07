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
const vowelsRegex = /^[aeiou]$/i; 
const consonantsRegex = /^[bcdfghjklmnpqrstvwxyz]$/i; 

//To update css & design later
const puzzleArray = ['DAIRY QUEEN OF HEARTS', 'CLASH OF THE TITANS', 'CHOCOLATE MACADAMIA NUT COOKIES', 'DELICIOUS DECADENT DESSERTS', 'CASHING IN A HUGE STACK OF CHIPS', 'ALL-DAY SKI LIFT TICKETS', 'CASABLANCA MOROCCO', 'THE VIEW FROM THE TOP OF A MOUNTAIN', 'PERSONALIZED STATIONERY', 'ST. ELMO\'S FIRE EXTINGUISHER'];

//To update values later. Note 18 so far
const wheelValues = [300, 400, 500, 600, 700, 800, 900, 1000, 2500, 'BANKRUPT', 300, 400, 500, 600, 700, 800, 900, 1000];

// Initialize player data
let playerCurrent = {
    name: "",
    earnedTotal: 0,   // total for all games
    earnedCurrent: 500 // for current game only
}

// let puzzleCurrent = [];
let puzzleCurrent = {
    text: "",
    split: [],
    vowels: [],
    consonants: []
};

// letters guessed for current game only
let guessLettersCurrent = {
    vowels: [],
    consonants: []
};


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
        let playerInfo = document.createTextNode(`Player Name: ${playerCurrent.name}, Current Earnings: ${playerCurrent.earnedCurrent}`);
        playerDiv.append(playerInfo);
        playerStand.prepend(playerDiv);

    }

}


function isVowelOrConsonant(input) {
    if (vowelsRegex.test(input) === true) {
        return 'vowel';
    } else if (consonantsRegex.test(input) === true) {
        return 'consonant';
    } else {
        return false;
    }

}

function checkIfExist(array, input) {
    let count = 0;
    array.forEach((element) => {
        if (input === element) {
            count += 1;
        }
    })

    if (count > 0) {
        return true;
    } else {
        return false;
    }
}

// Check if input letter is repeated in array
function checkIfUnique(array, input) {
    let count = 0;

    if (array !== []) {
        array.forEach((element) => {
            if (input === element) {
                count += 1;
            }
        })

        if (count === 0) {
            return true;
        } else {
            return false;
        }
    }

}

// To update function later & hide letters
// Review no. of variables declared later
// Store puzzle consonants & vowels in separate array
function initPuzzle() {

    let randNum = Math.floor(Math.random() * puzzleArray.length);
    puzzleCurrent.text = puzzleArray[randNum];
    console.log(puzzleCurrent.text);

    let puzzleDiv = document.createElement('div');

    // Generate squares for each letter
    // puzzleCurrent.split = puzzleCurrent.split('');
    puzzleCurrent.splitText = puzzleCurrent.text.toLowerCase().split('');
    puzzleCurrent.splitText.forEach((element) => {
        // console.log(element);
        let sqDiv = document.createElement('div');
        let letter = document.createTextNode(element);
        sqDiv.setAttribute('class', 'square-box');
        sqDiv.append(letter);

        if (element === ' ') {
            // console.log('space');
            sqDiv.classList.add('class', 'square-blank');            
        } else {
            sqDiv.classList.add('class', 'square-text');
        }
        puzzleDiv.append(sqDiv);

        // Check if letter is vowel or consonant
        let letterCheck = isVowelOrConsonant(element);
        let isVowelUnique = checkIfUnique(puzzleCurrent.vowels, element);
        let isConsonantUnique = checkIfUnique(puzzleCurrent.consonants, element);
        if (letterCheck === 'vowel' && isVowelUnique === true) {
            puzzleCurrent.vowels.push(element);

        } else if (letterCheck === 'consonant' && isConsonantUnique === true) {
            puzzleCurrent.consonants.push(element);

        }

    })
    puzzleBoard.append(puzzleDiv);
    console.log('Current Puzzle (vowels): ' + puzzleCurrent.vowels);
    console.log('Current Puzzle (consonants): ' + puzzleCurrent.consonants);

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



// Validate user input later for other char #$%$#^%. 
// Also change to lowercase
function guessLetter() {
    let input = prompt('Guess a letter (consonant)');
    let letter = input.toLowerCase();
    console.log('Current guess: ' + letter);
    let letterCheck = isVowelOrConsonant(letter);
    let doesLetterExist = checkIfExist(puzzleCurrent.consonants, letter);
    let isLetterUnique = checkIfUnique(guessLettersCurrent.consonants, letter);

    // Validate player input
    if (letter === "") {
        let errorMsg = 'GAME OVER: You did not enter a letter!';
        exitMsg(errorMsg);

    } // Check for vowels or special char
    else if (letterCheck === false || letterCheck === 'vowel'){
        let errorMsg = 'GAME OVER: You entered an invalid letter!';
        exitGame(errorMsg);

    } // Check if consonant
    else if (letterCheck === 'consonant') {
        console.log('you entered a consonant');

        // Check if letter exists in puzzle
        if (doesLetterExist ===  true) {

            // Check if letter has been guessed before
            if (isLetterUnique === true) {
                guessLettersCurrent.consonants.push(letter);
                console.log('Guessed consonants to-date: ' + guessLettersCurrent.consonants);

            } else {
                let errorMsg = 'GAME OVER: You entered a repeated consonant.';
                exitGame(errorMsg);  
            }
 
        } else {
            let errorMsg = 'GAME OVER: No such consonant in puzzle.';
            exitGame(errorMsg);
        }

    }

} // END of function guessLetter


// Validate user input later
// Also change to lowercase
function buyVowel() {

    // Cost of each vowel = $250
    if (playerCurrent.earnedCurrent >= 250) {
        let input = prompt('Guess a letter (vowel)');
        let letter = input.toLowerCase();
        console.log('Current guess: ' + letter);
        let letterCheck = isVowelOrConsonant(letter);
        let doesLetterExist = checkIfExist(puzzleCurrent.vowels, letter);
        let isLetterUnique = checkIfUnique(guessLettersCurrent.vowels, letter);

        // Validate player input
        if (letter === "") {
            let errorMsg = 'GAME OVER: You did not enter a letter!';
            exitMsg(errorMsg);

        } // Check for consonants or special char
        else if (letterCheck === false || letterCheck === 'consonant'){
            let errorMsg = 'GAME OVER: You entered an invalid letter!';
            exitGame(errorMsg);

        } // Check if vowel
        else if (letterCheck === 'vowel') {
            console.log('you entered a vowel');

            // Check if letter exists in puzzle
            if (doesLetterExist ===  true) {

                // Check if letter has been guessed before
                if (isLetterUnique === true) {
                    guessLettersCurrent.vowels.push(letter);
                    console.log('Guessed consonants to-date: ' + guessLettersCurrent.vowels);

                } else {
                    let errorMsg = 'GAME OVER: You entered a repeated vowel.';
                    exitGame(errorMsg);  
                }
    
            } else {
                let errorMsg = 'GAME OVER: No such vowel in puzzle.';
                exitGame(errorMsg);
            }

        }

    }

}


// OK button gives default correct answer: to check!!!
// Rephrase question to player later
// Validate user input later
function solvePuzzle() {

    let answer = prompt('Type the puzzle answer below');

    if (answer === puzzleCurrent.text) {
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
        exitGame('default');
    } else {
        return
    }

}

function exitGame(msg) {

    if (msg === 'default') {
        let exitMsg = 'Bye ' + playerCurrent.name + '! See you next time!';
        console.log(exitMsg);
        alert(exitMsg);

    } else {
        console.log(msg);
        alert(msg);
    
    }

    // clear UI later

    // reset player data
    let playerReset = {
        name: "",
        earnedTotal: 0,   // total for all games
        earnedCurrent: 0  // for current game only
    }

    let puzzleReset = {
        text: "",
        split: [],
        vowels: [],
        consonants: []
    };

    playerCurrent = playerReset;
    puzzleCurrent = puzzleReset;
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