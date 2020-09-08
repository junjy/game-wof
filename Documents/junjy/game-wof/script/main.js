'use strict'
// SEIF3 - PROJECT #1 - WOF
// console.log('linked');

// 7. Set up user progress board and messages
//     - dynamically update earnings onscreen
//     - 'no such letter/vowel', 'bankrupt', 'Congrats! You've won $XXX!' etc.
//     - consider contain msgs in array or object

// **COMMIT WORK:-**
// "Commit #9: Set up user progress message board"


//--------- PUZZLE & WHEEL SETUP ---------//

// Set up board
// Set up msg board later
const puzzleBoard = document.querySelector('#puzzle-board');
const wheelBoard = document.querySelector('#wheel-board');
const playerStand = document.querySelector('#player-stand');
const scoreBoard = document.querySelector('#score-board');

const puzzleDiv = document.querySelector('#puzzle-div');
const wheelDiv = document.querySelector('#wheel-div');
const playerDiv = document.querySelector('#player-div');
const scoreDiv = document.querySelector('#score-div');

// let puzzleDiv = document.createElement('div');
// let wheelDiv = document.createElement('div');
// let playerDiv = document.createElement('div');


const vowelsRegex = /^[aeiou]$/i; 
const consonantsRegex = /^[bcdfghjklmnpqrstvwxyz]$/i; 

//To update css & design later
const puzzleArray = ['DAIRY QUEEN OF HEARTS', 'CLASH OF THE TITANS', 'CHOCOLATE MACADAMIA NUT COOKIES', 'DELICIOUS DECADENT DESSERTS', 'CASHING IN A HUGE STACK OF CHIPS', 'ALL-DAY SKI LIFT TICKETS', 'CASABLANCA MOROCCO', 'THE VIEW FROM THE TOP OF A MOUNTAIN', 'PERSONALIZED STATIONERY', 'ST. ELMO\'S FIRE EXTINGUISHER'];

//To update values later. Note 18 so far
const wheelValues = [300, 400, 500, 600, 700, 800, 900, 1000, 2500, 'BANKRUPT', 300, 400, 500, 600, 700, 800, 900, 1000];
const vowelCost = 250;

// Initialize player data
let playerCurrent = {
    name: "",
    earnedTotal: 0,   // total for all games
    earnedCurrent: 0 // for current game only
}

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

// Reset player data for subseq games
const playerReset = {
    name: "",
    earnedTotal: 0,   // total for all games
    earnedCurrent: 0  // for current game only
}

const puzzleReset = {
    text: "",
    split: [],
    vowels: [],
    consonants: []
};

const guessLettersCurrentReset = {
    vowels: [],
    consonants: []
};

// Set up player stand - TBC

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

let btnNewGame = document.createElement('button');
    btnNewGame.setAttribute('id', 'btn-new-game');
    btnNewGame.innerHTML = 'Start New Game';

playerStand.append(btnSpinWheel, btnBuyVowel, btnSolvePuzzle, btnExitGame);

// Set up message board
const msgError = {
    1: 'Name must not be empty'
}

// to update later
// const msgProgress = {
//     // guess: 'You guessed', 

// }

// add timelimit msgs later
const msgGameOver = {
    spinBankrupt: 'GAME OVER: Sorry, you spinned BANKRUPT. Better luck next time!',
    noInputLetter: 'GAME OVER: You did not enter a letter!',
    invalidLetter: 'GAME OVER: You entered an invalid letter!',
    invalidConsonant: 'GAME OVER: No such consonant in puzzle.',
    invalidVowel: 'GAME OVER: No such vowel in puzzle.',
    repeatedConsonant: 'GAME OVER: You entered a repeated consonant.',
    repeatedVowel: 'GAME OVER: You entered a repeated vowel.',
    noMoneyForVowel: 'GAME OVER: Sorry, you do not have enough money to buy a vowel.',
    noInputGuess: 'GAME OVER: You did not enter anything to solve the puzzle!',
    invalidGuess: 'GAME OVER: Sorry, wrong guess on the puzzle! Better luck next time!'
}

// const msgSuccess = {
//     1: 'Congrats! You solved the puzzle! You\'ve earned ' + playerCurrent.earnedCurrent + ' for this game! See you again!'
// }



//--------- CHECK LETTER FUNCTIONS ---------//
// 1. Check vowel, consonant or other
// 2. Check if letter exists in array
// 3. Check if letter is unique/not repeated
// 4. Check letter count in puzzle


function isVowelOrConsonant(input) {
    if (vowelsRegex.test(input) === true) {
        return 'vowel';
    } else if (consonantsRegex.test(input) === true) {
        return 'consonant';
    } else {
        return false;
    }

}

// refine function later
function checkIfLetterExist(array, input) {
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
function checkIfLetterUnique(array, input) {
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

function letterCount(array, input) {
    let count = 0;

    array.forEach((element) => {
        if (input === element) {
            count += 1;
        }
    })
    return count;
}



//--------- MAIN BOARD & PLAYER SETUP ---------//
// 1. Start New Game
// 2. Initialize Player (single-player)
// 3. Initialize Puzzle



// Remove previous player info
// Refine playerstand setup and CSS later
// Improve validate user input prompt
function initPlayer(name) {

    // remove previous player info
    playerCurrent = playerReset;
    guessLettersCurrent = guessLettersCurrentReset;

    playerCurrent.name = prompt('Please enter your name');

    // change to while loop to prompt
    if (playerCurrent.name === "") {
        alert("Name must not be empty");
        return

    } else {

        let playerInfo = document.createElement('div');
        let playerEarnings = document.createElement('div');
        playerInfo.setAttribute('id', 'player-info');
        playerEarnings.setAttribute('id', 'player-earnings');

        let playerInfoText = document.createTextNode(`Player Name: ${playerCurrent.name}`);
        let playerEarningsText = document.createTextNode(`Current Earnings: $${playerCurrent.earnedCurrent}`);

        playerInfo.append(playerInfoText);
        playerEarnings.append(playerEarningsText);

        playerDiv.append(playerInfo, playerEarnings);
        playerStand.prepend(playerDiv);

    }

}

// Remove previous puzzle
// To update function later & hide letters
// Review no. of variables declared later
// Store puzzle consonants & vowels in separate array
function initPuzzle() {

    // Remove previous puzzle ---->
    puzzleCurrent = puzzleReset;

    let randNum = Math.floor(Math.random() * puzzleArray.length);
    puzzleCurrent.text = puzzleArray[randNum];
    puzzleCurrent.splitText = puzzleCurrent.text.toUpperCase().split('');

    // Generate squares for each letter
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
        let isVowelUnique = checkIfLetterUnique(puzzleCurrent.vowels, element);
        let isConsonantUnique = checkIfLetterUnique(puzzleCurrent.consonants, element);
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


// Refine function later
function startNewGame() {

    btnNewGame.remove();
        
    initPlayer();
    initPuzzle();
    playerStand.append(btnSpinWheel, btnBuyVowel, btnSolvePuzzle, btnExitGame);

}


function showMsg(input) {
    scoreDiv.innerHTML = input;

}


//--------- PLAYER FUNCTIONS ---------//
// 1. Spin Wheel
// 2. Guess Letter
// 3. Buy Vowel
// 4. Solve Letter
// 5. Exit Game


// Update bankrupt earnings
// Remove previous wheel values
// To upgrade spin wheel function later
function spinWheel() {

    // Remove previous wheel values
    
    let randNum = Math.floor(Math.random() * wheelValues.length);
    let spinValueCurrent = wheelValues[randNum];
    let wheelText = document.createTextNode('Current Spin: $' + spinValueCurrent);    

    wheelDiv.append(wheelText);
    wheelBoard.append(wheelDiv);

    if (spinValueCurrent != 'BANKRUPT') {
        guessLetter(spinValueCurrent);

    } else {
        playerCurrent.earnedCurrent = 0;
        exitGame(msgGameOver.spinBankrupt);
    }

}


function guessLetter(spinValue) {
    let input = prompt('Guess a letter (consonant)');
    let letter = input.toUpperCase();
    let letterCheck = isVowelOrConsonant(letter);

    // consider condense into if statement
    let doesLetterExist = checkIfLetterExist(puzzleCurrent.consonants, letter);
    let isLetterUnique = checkIfLetterUnique(guessLettersCurrent.consonants, letter);

    // Validate player input
    if (letter === "") {
        exitGame(msgGameOver.noInputLetter);

    } // Check for vowels or special char
    else if (letterCheck === false || letterCheck === 'vowel'){
        exitGame(msgGameOver.invalidLetter);

    } // Check if consonant, exists in puzzle & if repeated
    else if (letterCheck === 'consonant') {

        if (doesLetterExist ===  true) {

            if (isLetterUnique === true) {                
                let numLetters = letterCount(puzzleCurrent.splitText, letter);                
                guessLettersCurrent.consonants.push(letter);
                
                // update player earnings
                let thisSpin = spinValue * numLetters;
                playerCurrent.earnedCurrent += thisSpin;

                // try push to showMsg function later
                if (numLetters === 1) {                      
                    scoreDiv.innerHTML = 'Current guess:  ' + letter + '.<br>There is 1 ' + letter + '.<br> You earned $' + thisSpin;

                } else {
                    scoreDiv.innerHTML = 'Current guess:  ' + letter + '.<br>There are ' + numLetters + ' ' + letter + 's.<br> You earned $' + thisSpin;

                }
                

                let playerEarnings = document.querySelector('#player-earnings');
                playerEarnings.innerHTML = 'Current Earnings: $' + playerCurrent.earnedCurrent;
                
                console.log('Guessed consonants to-date: ' + guessLettersCurrent.consonants);
                console.log('Current Earnings: ' + playerCurrent.earnedCurrent);

            } else {
                exitGame(msgGameOver.repeatedConsonant);  
            }
 
        } else {
            exitGame(msgGameOver.invalidConsonant);
        }

    }

} // END of function guessLetter


function buyVowel() {

    // Check if earnings > 250
    if (playerCurrent.earnedCurrent >= 250) {
        let input = prompt('Guess a letter (vowel)');
        let letter = input.toUpperCase();
        let letterCheck = isVowelOrConsonant(letter);

        // consider condense into if statement
        let doesLetterExist = checkIfLetterExist(puzzleCurrent.vowels, letter);
        let isLetterUnique = checkIfLetterUnique(guessLettersCurrent.vowels, letter);

        // Validate player input
        if (letter === "") {
            exitMsg(msgGameOver.noInputLetter);

        } // Check for consonants or special char
        else if (letterCheck === false || letterCheck === 'consonant'){
            exitGame(msgGameOver.invalidLetter);

        } // Check if vowel, exists in puzzle & if repeated
        else if (letterCheck === 'vowel') {
            console.log('you entered a vowel');

            if (doesLetterExist ===  true) {

                if (isLetterUnique === true) {

                    let numLetters = letterCount(puzzleCurrent.splitText, letter);
                    guessLettersCurrent.vowels.push(letter);

                    // update player earnings
                    playerCurrent.earnedCurrent -= vowelCost;

                    if (numLetters === 1) {
                        scoreDiv.innerHTML = 'Current guess:  ' + letter + '.<br>There is 1 ' + letter + '.<br>  Deduct: $' + vowelCost;

                    } else {
                        scoreDiv.innerHTML = 'Current guess:  ' + letter + '.<br>There are ' + numLetters + ' ' + letter + 's.<br> Deduct: $' + vowelCost;

                    }

                    let playerEarnings = document.querySelector('#player-earnings');
                    playerEarnings.innerHTML = 'Current Earnings: $' + playerCurrent.earnedCurrent;

                    console.log('Guessed vowels to-date: ' + guessLettersCurrent.vowels);
                    console.log('Current Earnings: ' + playerCurrent.earnedCurrent);       

                } else {
                    exitGame(msgGameOver.repeatedVowel);  
                }
    
            } else {
                exitGame(msgGameOver.invalidVowel);
            }

        }

    } else {
        exitGame(msgGameOver.noMoneyForVowel);

    }

} // END of function buyVowel


// OK button gives default correct answer: to check!!!
// Change prompt to modal with buttons?
// Rephrase question to player later
// Show earned total later
function solvePuzzle() {

    let input = prompt('Solve the puzzle by typing the answer below');
    let answer = input.toUpperCase();
    console.log('you entered: ' + answer);

    // Validate player input
    if (answer === '') {
        exitGame(msgGameOver.noInputGuess);

    } else if (answer === puzzleCurrent.text) {
        if (playerCurrent.earnedCurrent === 0) {
            playerCurrent.earnedCurrent = 1000; // min earning

        }

        playerCurrent.earnedTotal += playerCurrent.earnedCurrent;

        let successMsg = 'Congrats! You solved the puzzle! You\'ve earned $' + playerCurrent.earnedCurrent + ' for this game! See you again!';
        exitGame(successMsg);
        
    } else {
        exitGame(msgGameOver.invalidGuess);
        
    }

}

// validate user input or insert Y/N buttons
function checkIfExitGame() {

    let checkMsg = prompt(playerCurrent.name + ', are you sure you want to exit?');
    if (checkMsg === 'y') {
        exitGame('default');
    } else {
        return
    }

}

function exitGame(msg) {

    // clear UI
    btnSpinWheel.remove();
    btnBuyVowel.remove();
    btnSolvePuzzle.remove();
    btnExitGame.remove();

    // show new game btn
    playerStand.append(btnNewGame);

    if (msg === 'default') {
        let exitMsg = 'Bye ' + playerCurrent.name + '! See you next time!';
        // console.log(exitMsg);
        // alert(exitMsg);
        scoreDiv.innerHTML = exitMsg;

    } else {
        // console.log(msg);
        // alert(msg);
        scoreDiv.innerHTML = msg;
    
    }

}


//--------- INITIALIZE NEW GAME ---------//

startNewGame();
// initPlayer();
// initPuzzle();
// console.log(msgGameOver.invalidConsonant);


// to update UI & function later
btnNewGame.addEventListener('click', (event) => {
    console.log('start new game btn clicked');
    wheelDiv.innerHTML = "";
    playerDiv.innerHTML = "";
    scoreDiv.innerHTML = "";

    // remove previous puzzle
    let puzzlePrev = document.querySelectorAll('.square-box');

    for (let i = 0; i < puzzlePrev.length; i++) {
        puzzlePrev[i].remove();

    }
    
    startNewGame();
})

btnSpinWheel.addEventListener('click', (event) => {
    console.log('spin wheel btn clicked');
    wheelDiv.innerHTML = "";
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
    checkIfExitGame();
})