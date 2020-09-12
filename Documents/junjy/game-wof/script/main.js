'use strict'
// SEIF3 - PROJECT #1 - WOF
// console.log('linked main.js');

//--------- PUZZLE & WHEEL SETUP ---------//
// Set up board
const puzzleBoard = document.querySelector('#puzzle-board');
const wheelBoard = document.querySelector('#wheel-board');
const playerStand = document.querySelector('#player-stand');
const scoreBoard = document.querySelector('#score-board');

const puzzleDiv = document.querySelector('#puzzle-div');
const wheelDiv = document.querySelector('#wheel-div');
const playerDiv = document.querySelector('#player-div');
const scoreDiv = document.querySelector('#score-div');
const inputDiv = document.querySelector('#input-div');
const timerDiv = document.querySelector('#timer-display');

const wheelImg = document.querySelector('#wheel-img');
const wheelActual = document.querySelector('#chart');


const vowelsRegex = /^[aeiou]$/i; 
const consonantsRegex = /^[bcdfghjklmnpqrstvwxyz]$/i; 
//To update css & design later

// Transferred puzzleArray to puzzles.js

//To update values later
// const wheelValues = [300, 400, 500, 600, 700, 800, 900, 1000, 2500, 'BANKRUPT', 300, 400, 500, 600, 700, 800, 900, 1000];
const wheelValues = [300, 400, 500, 600, 700, 800, 900, 1000, 2500, 300, 400, 500, 600, 700, 800, 900, 1000];
const vowelCost = 250;


// For Game Timer Functions
let countdownTimer; // for checkTime function
const timerBtn = 8; // timer to select buttons
const timerLetter = 5;
const timerSolve = 10;

// For Msg Display Timer
const typMsgDelay = 1000; // 1 sec
const spinMsgDelay = 3000; // 3 sec
const dispLetterDelay = 100; 

// To check if needed
let tempInput = ""; //for name, guess letter, vowel, puzzle

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

let hiddenArr = [];

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


// Set up buttons 1.Spin Wheel 2.Buy a vowel 3.Solve It! 4.Exit Game
let lineBreak = document.createElement('br');

let btnNewGame = document.createElement('button');
    btnNewGame.setAttribute('id', 'btn-new-game');
    btnNewGame.innerHTML = 'Start New Game';

// NOTE: COMMENT OUT THIS PART IF USING ACTUAL WHEEL TO SPIN
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

// ------ TEST INPUT FIELD ------//

let inputName = document.createElement('input');
    inputName.setAttribute('id', 'input-name')
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('class', 'form-control');

let inputConsonant = document.createElement('input');
    inputConsonant.setAttribute('id', 'input-consonant')
    inputConsonant.setAttribute('type', 'text');
    inputConsonant.setAttribute('class', 'form-control');

let inputVowel = document.createElement('input');
    inputVowel.setAttribute('id', 'input-vowel')
    inputVowel.setAttribute('type', 'text');
    inputVowel.setAttribute('class', 'form-control');

let inputSolve = document.createElement('input');
    inputSolve.setAttribute('id', 'input-solve')
    inputSolve.setAttribute('type', 'text');
    inputSolve.setAttribute('class', 'form-control');


// add timelimit msgs later
const msgGameOver = {
    spinBankrupt: 'GAME OVER: Sorry, you spinned BANKRUPT. Better luck next time!',
    noInput: 'GAME OVER: You did not enter/select anything!',
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

//--------- CHECK TIME FUNCTIONS ---------//

// TO SWITCH ON TIMER
// Check how to exitGame if time is up

function checkTime(time) {

    countdownTimer = setInterval(timerDisplay, 1000);

    function timerDisplay() {
        console.log(time);
        timerDiv.innerHTML = 'Time left: ' + time + 's';
        time--;

        if (time < 0) {
            // isPlaying = false;
            // checkStatus();
            console.log('end countdown timer');
            clearInterval(countdownTimer);
            inputConsonant.remove();
            timerDiv.innerHTML = "";

            // update msg to be more specific later
            exitGame(msgGameOver.noInput);
        }
    }
}


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


function checkNoMoreVowels() {
    if (puzzleCurrent.vowels.length === guessLettersCurrent.vowels.length) {
        return true;
    } else {
        return false;
    }
}

function checkNoMoreConsonants() {
    if (puzzleCurrent.consonants.length === guessLettersCurrent.consonants.length) {
        return true;
    } else {
        return false;
    }
}

function checkNoMoreLetters() {
    if (checkNoMoreVowels() && checkNoMoreConsonants()) {
        return true;

    } else {
        return false;
    }
}

function checkValidConsonant(spinValue, input) {

    let letter = input.toUpperCase();
    let letterCheck = isVowelOrConsonant(letter);
    let doesLetterExist = checkIfLetterExist(puzzleCurrent.consonants, letter);
    let isLetterUnique = checkIfLetterUnique(guessLettersCurrent.consonants, letter);

    // Check for vowels or special char
    if (letterCheck !== 'consonant'){
        exitGame(msgGameOver.invalidLetter);

    } // Check if consonant, exists in puzzle & if repeated
    else {

        if (doesLetterExist ===  true) {

            if (isLetterUnique === true) {              
                let numLetters = letterCount(puzzleCurrent.splitText, letter);
                guessLettersCurrent.consonants.push(letter);

                // update puzzle board
                showCorrectLetters(input);
                
                // update player earnings, delay msg display
                let thisSpin = spinValue * numLetters;
                playerCurrent.earnedCurrent += thisSpin;

                if (numLetters === 1) {                     

                    setTimeout(function() {
                        showMsg('Current guess:  ' + letter + '.<br>There is 1 ' + letter + '.<br> You earned $' + thisSpin);

                        if (checkNoMoreLetters()) {
                            winGame();

                        } else if (checkNoMoreConsonants()) {
                            scoreDiv.innerHTML += ' There are no more consonants left.';
                        }
                        
                        enableButtons();

                    }, typMsgDelay)
                } 
                else {

                    setTimeout(function() {
                        showMsg('Current guess:  ' + letter + '.<br>There are ' + numLetters + ' ' + letter + 's.<br> You earned $' + thisSpin);

                        if (checkNoMoreLetters()) {
                            winGame();

                        } else if (checkNoMoreConsonants()) {
                            scoreDiv.innerHTML += ' There are no more consonants left.';
                        }
                        enableButtons();

                    }, typMsgDelay)

                }
                
                let playerEarnings = document.querySelector('#player-earnings');
                playerEarnings.innerHTML = 'Current Earnings: $' + playerCurrent.earnedCurrent;
                // checkTime(timerBtn);
                
                console.log('Guessed consonants to-date: ' + guessLettersCurrent.consonants);
                console.log('Current Earnings: ' + playerCurrent.earnedCurrent);

            } else {
                console.log('Guessed consonants to-date: ' + guessLettersCurrent.consonants);
                exitGame(msgGameOver.repeatedConsonant);  
            }

        } else {
            exitGame(msgGameOver.invalidConsonant);
        }

    }

}


function checkValidVowel(input) {
    let letter = input.toUpperCase();
    let letterCheck = isVowelOrConsonant(letter);
    let doesLetterExist = checkIfLetterExist(puzzleCurrent.vowels, letter);
    let isLetterUnique = checkIfLetterUnique(guessLettersCurrent.vowels, letter);

    // Check for consonants or special char
    if (letterCheck !== 'vowel'){
    exitGame(msgGameOver.invalidLetter);

    } // Check if vowel, exists in puzzle & if repeated
    else {  
        console.log('you entered a vowel');

        if (doesLetterExist ===  true) {

            if (isLetterUnique === true) {

                // update puzzle board
                showCorrectLetters(input);

                let numLetters = letterCount(puzzleCurrent.splitText, letter);
                guessLettersCurrent.vowels.push(letter);

                // update player earnings, delay msg display
                playerCurrent.earnedCurrent -= vowelCost;

                if (numLetters === 1) {

                    setTimeout(function() {
                        showMsg('Current guess:  ' + letter + '. There is 1 ' + letter + '.<br>Deduct: $' + vowelCost + '.');
                       
                        if (checkNoMoreLetters()) {
                            winGame();

                        } else if (checkNoMoreVowels()) {
                            scoreDiv.innerHTML += ' There are no more vowels left.';
                        }

                        enableButtons();

                    }, typMsgDelay);

                } else {

                    setTimeout(function() {
                        showMsg('Current guess:  ' + letter + '. There are ' + numLetters + ' ' + letter + 's.<br>Deduct: $' + vowelCost + '.');
                       
                        if (checkNoMoreLetters()) {
                            winGame();

                        } else if (checkNoMoreVowels()) {
                            scoreDiv.innerHTML += ' There are no more vowels left.';
                        }


                        enableButtons();

                    }, typMsgDelay)

                }

                let playerEarnings = document.querySelector('#player-earnings');
                playerEarnings.innerHTML = 'Current Earnings: $' + playerCurrent.earnedCurrent;
                // checkTime(timerBtn);

                console.log('Guessed vowels to-date: ' + guessLettersCurrent.vowels);
                console.log('Current Earnings: ' + playerCurrent.earnedCurrent);       

            } else {
                console.log('Guessed vowels to-date: ' + guessLettersCurrent.vowels);
                exitGame(msgGameOver.repeatedVowel);  
            }

        }  
        else {
                exitGame(msgGameOver.invalidVowel);
        }

    }

}


//--------- MAIN GAME FUNCTIONS ---------//
// 1. Start New Game
// 2. Initialize Player (single-player)
// 3. Initialize Puzzle
// 4. Reset player earnings upon bankrupt or gameover

// Refine playerstand setup and CSS later
// Improve validate user input prompt
function initPlayer(name) {

    showMsg('Please enter your name');
    inputDiv.append(inputName);
    inputName.focus();

    inputName.onkeydown = function(event) {

        if (event.keyCode === 13) { // 13 refers to 'ENTER' key

            tempInput = inputName.value.toUpperCase();
            console.log('Temp Input Name: ' + tempInput);

            // refine this later
            if (tempInput === '') {
                showMsg('Name must not be empty');
                inputName.remove();
            }
            else {

                playerCurrent.name = tempInput;
                inputName.remove();

                initPuzzle();

                //COMMENT OUT BTNSPINWHEEL IF USING WHEEL TO SPIN
                // playerStand.append(btnSpinWheel, btnBuyVowel, btnSolvePuzzle, btnExitGame);
                playerStand.append(btnBuyVowel, btnSolvePuzzle, btnExitGame);
                wheelTurnOn();
                // checkTime(timerBtn);

                // COMMENT OUT THIS PART IF USING ACTUAL WHEEL TO SPIN
                showMsg('Welcome ' + playerCurrent.name + '! Please spin the wheel to proceed.');

                let playerInfo = document.createElement('div');
                let playerEarnings = document.createElement('div');
                playerInfo.setAttribute('id', 'player-info');
                playerEarnings.setAttribute('id', 'player-earnings');
        
                let playerInfoText = document.createTextNode(`Player Name: ${playerCurrent.name}`);
                let playerEarningsText = document.createTextNode(`Current Earnings: $${playerCurrent.earnedCurrent}`);
        
                playerInfo.append(playerInfoText);
                playerEarnings.append(playerEarningsText);
        
                playerDiv.append(playerInfo, playerEarnings);
                playerStand.append(playerDiv);

                // DONT NEED 
                // playerStand.append(btnSpinWheel, btnBuyVowel, btnSolvePuzzle, btnExitGame);


            }

        } 
    }

}


// To update function later & hide letters
// Review no. of variables declared later
function initPuzzle() {

    let randNum = Math.floor(Math.random() * puzzleArray.length);
    puzzleCurrent.text = puzzleArray[randNum];
    puzzleCurrent.splitText = puzzleCurrent.text.toUpperCase().split('');

    // Generate squares for each letter
    puzzleCurrent.splitText.forEach((element) => {
        // console.log('element before: ' + element);
        let sqDiv = document.createElement('div');
        sqDiv.setAttribute('class', 'square-box');

        // Check if letter is vowel or consonant
        let letterCheck = isVowelOrConsonant(element);
        let isVowelUnique = checkIfLetterUnique(puzzleCurrent.vowels, element);
        let isConsonantUnique = checkIfLetterUnique(puzzleCurrent.consonants, element);

        if (letterCheck === 'vowel' && isVowelUnique === true) {
            puzzleCurrent.vowels.push(element);

        } else if (letterCheck === 'consonant' && isConsonantUnique === true) {
            puzzleCurrent.consonants.push(element);

        }

        // change puzzle text to hidden & store in array
        if (element === ' ') {
            // console.log('space');
            element = '*'; // ADD to vert align squares
            sqDiv.classList.add('class', 'square-blank');            
        } else if (element === '-' || element === "'" || element === '.'){
            sqDiv.classList.add('class', 'square-display');

        } else {
            element = '_'; // ADD to vert align squares
            sqDiv.classList.add('class', 'square-text');
        }

        // console.log('element after: ' + element);
        hiddenArr.push(element);

        let letter = document.createTextNode(element);
        sqDiv.append(letter);

        puzzleDiv.append(sqDiv);

        // // Check if letter is vowel or consonant
        // let letterCheck = isVowelOrConsonant(element);
        // let isVowelUnique = checkIfLetterUnique(puzzleCurrent.vowels, element);
        // let isConsonantUnique = checkIfLetterUnique(puzzleCurrent.consonants, element);
        // if (letterCheck === 'vowel' && isVowelUnique === true) {
        //     puzzleCurrent.vowels.push(element);

        // } else if (letterCheck === 'consonant' && isConsonantUnique === true) {
        //     puzzleCurrent.consonants.push(element);

        // }

    })

    console.log(puzzleCurrent);

    puzzleBoard.append(puzzleDiv);
    console.log('Current Puzzle (vowels): ' + puzzleCurrent.vowels);
    console.log('Current Puzzle (consonants): ' + puzzleCurrent.consonants);

}


function resetBoard() {

    // btnSpinWheel.remove();
    btnBuyVowel.remove();
    btnSolvePuzzle.remove();
    btnExitGame.remove();

    inputName.remove();
    inputConsonant.remove();
    inputVowel.remove();
    inputSolve.remove();

    wheelDiv.innerHTML = "";
    playerDiv.innerHTML = "";
    scoreDiv.innerHTML = "";

    // remove previous player info
    playerCurrent = playerReset;
    puzzleCurrent = puzzleReset;
    playerCurrent.earnedCurrent = 0;
    // guessLettersCurrent = guessLettersCurrentReset;
    puzzleCurrent.vowels = [];
    puzzleCurrent.consonants = [];
    guessLettersCurrent.consonants = [];
    guessLettersCurrent.vowels = [];
    hiddenArr = [];
    // console.log('Guessed letters current:' + guessLettersCurrent.consonants + guessLettersCurrent.vowels);

    // remove previous puzzle
    let puzzlePrev = document.querySelectorAll('.square-box');
    for (let i = 0; i < puzzlePrev.length; i++) {
        puzzlePrev[i].remove();
    }

}


// Refine function later
function startNewGame() {

    btnNewGame.remove(); 
    initPlayer();

}

// to update for relevant code later
function showMsg(input) {
    scoreDiv.innerHTML = input;

}



function resetEarnings() {
    playerCurrent.earnedCurrent = 0;
    let playerEarnings = document.querySelector('#player-earnings');
    playerEarnings.innerHTML = 'Current Earnings: $' + playerCurrent.earnedCurrent;

}

// recheck function
// doesn't work for 'personalized stationery'
function showCorrectLetters(letter) {

    // update hidden array with guessed letters
    for (let i = 0; i < puzzleCurrent.splitText.length; i++) {
        if (letter === puzzleCurrent.splitText[i]) {
            hiddenArr[i] = letter;
        }
    };

    // push updated blank array into sqDiv
    let puzzleLength = puzzleCurrent.splitText.length;
    
    for (let j = 0; j < puzzleLength; j++) {

        let tempSqText = puzzleDiv.children[j].innerHTML;
        let tempGuessArray = hiddenArr[j];

        // check for guessed letters only
        // * double-check on animation timing later
        if (tempSqText !== tempGuessArray) {

            // stagger light effect of each guessed letter
            setTimeout(function() {
                puzzleDiv.children[j].classList.add('square-light');
                puzzleDiv.children[j].innerHTML = hiddenArr[j];

            }, (dispLetterDelay * j));

        }

    }

}

// if puzzle solved correctly, show all letters at once
function showAllLetters() {

    // push puzzleCurrent into sqDiv
    let puzzleLength = puzzleCurrent.splitText.length;
    
    for (let i = 0; i < puzzleLength; i++) {

        let tempSqText = puzzleDiv.children[i].innerHTML;
        let puzzleText = puzzleCurrent.splitText[i];

        // * double-check on animation timing later
        if (tempSqText !== puzzleText && tempSqText !== '*' && tempSqText !== "'" && tempSqText !== '-' && tempSqText !== '.') {

            // stagger light effect of each guessed letter
            // ADD audio effect later
                puzzleDiv.children[i].classList.add('square-display');
                puzzleDiv.children[i].innerHTML = puzzleCurrent.splitText[i];

        }

    }

}


function wheelTurnOn() {
    wheelImg.style.display = 'none';
    wheelActual.style.display = 'inline';

}

function wheelTurnOff() {
    wheelImg.style.display = 'inline';
    wheelActual.style.display = 'none';

}

function disableButtons() {
    btnBuyVowel.remove();
    btnSolvePuzzle.remove();
    btnExitGame.remove();
}

function enableButtons() {
    playerDiv.append(btnBuyVowel, btnSolvePuzzle, btnExitGame);

}


//--------- PLAYER FUNCTIONS ---------//
// 1. Spin Wheel
// 2. Guess Letter
// 3. Buy Vowel
// 4. Solve Puzzle
// 5. Exit Game


// AMENDED SPIN WHEEL FUNCTION LINKED TO WHEEL
function spinWheel() {

    disableButtons();

    // let randNum = Math.floor(Math.random() * wheelValues.length);
    // let spinValueCurrent = wheelValues[randNum];
    

    //OR SET TO SPIN VALUE FROM WHEEL:
    let spinValueCurrent = spinValueFrWheel;
    console.log('Spin Value Fr Wheel: ' + spinValueCurrent);


    // let wheelText = document.createTextNode('Current Spin: $' + spinValueCurrent); 
    let wheelText = document.createTextNode('Current Spin Fr Wheel: $' + spinValueCurrent);


    // wheelDiv.append(wheelText);
    // wheelBoard.append(wheelDiv);

    if (spinValueCurrent != 'BANKRUPT') {
        // delay msg display until spin over
        setTimeout(function() {
            showMsg('You spinned $' + spinValueCurrent + '! Guess a letter (consonant).');
            guessLetter(spinValueCurrent);
        
        }, spinMsgDelay);

    } else {

        resetEarnings();
        btnBuyVowel.disabled = false;
        btnSolvePuzzle.disabled = false;
        btnExitGame.disabled = false;

        // delay msg display until spin over
        setTimeout(function(){

            exitGame(msgGameOver.spinBankrupt);

        }, spinMsgDelay);

    }


}

// ORIGINAL SPIN WHEEL RANDOM FUNCTION
// function spinWheel() {
    
//     let randNum = Math.floor(Math.random() * wheelValues.length);
//     let spinValueCurrent = wheelValues[randNum];

//     //OR SET TO SPIN VALUE FROM WHEEL:
//     // let spinValueCurrent = spinValueFrWheel;

//     let wheelText = document.createTextNode('Current Spin: $' + spinValueCurrent); 
//     // let wheelText = document.createTextNode('Current Spin Fr Wheel: $' + spinValueCurrent);      

//     wheelDiv.append(wheelText);
//     wheelBoard.append(wheelDiv);

//     if (spinValueCurrent != 'BANKRUPT') {
//         scoreDiv.innerHTML = 'You spinned $' + spinValueCurrent + '! Guess a letter (consonant).';
//         guessLetter(spinValueCurrent);

//     } else {
//         resetEarnings();
//         exitGame(msgGameOver.spinBankrupt);
//     }


// }

function guessLetter(spinValue) {

    inputDiv.append(inputConsonant);
    inputConsonant.focus();

    // checkTime(timerLetter);

    inputConsonant.onkeydown = function(event) {

        if (event.keyCode === 13) { // 13 refers to 'ENTER' key

            clearInterval(countdownTimer);
            timerDiv.innerHTML = "";

            tempInput = inputConsonant.value.toUpperCase();
            console.log('Temp Input Consonant: ' + tempInput);

            if (tempInput === '') {
                exitGame(msgGameOver.noInputLetter);

            }
            else {

                inputConsonant.remove();
                checkValidConsonant(spinValue, tempInput);
                // tempInput === '';
                inputConsonant.value = '';

            }

        } 
    }

} // END of function guessLetter


function buyVowel() {

    disableButtons();

    // Check if earnings > 250
    if (playerCurrent.earnedCurrent >= vowelCost) {
        // let input = prompt('Guess a letter (vowel)');

        inputDiv.append(inputVowel);
        inputVowel.focus();
        // checkTime(timerLetter);

        inputVowel.onkeydown = function(event) {
    
            if (event.keyCode === 13) { // 13 refers to 'ENTER' key
    
                clearInterval(countdownTimer);
                timerDiv.innerHTML = "";

                tempInput = inputVowel.value.toUpperCase();
                console.log('Temp Input Vowel: ' + tempInput);
    
                if (tempInput === '') {
                    exitGame(msgGameOver.noInputLetter);
    
                }
                else {
                    inputVowel.remove();
                    checkValidVowel(tempInput);
                    // tempInput === '';
                    inputVowel.value = '';
    
                }
    
            } 

        }
      
    } // if player has less than $250
    else {
        exitGame(msgGameOver.noMoneyForVowel);

    }

} // END of function buyVowel


// Rephrase question to player later
// Show earned total later
function solvePuzzle() {

    disableButtons();

    inputSolve.value = '';

    inputDiv.append(inputSolve);
    inputSolve.focus();
    // checkTime(timerSolve);

    inputSolve.onkeydown = function(event) {

        if (event.keyCode === 13) { // 13 refers to 'ENTER' key

            clearInterval(countdownTimer);
            timerDiv.innerHTML = "";

            tempInput = inputSolve.value.toUpperCase();
            console.log('Temp Input Solve: ' + tempInput);

            if (tempInput === '') {
                exitGame(msgGameOver.noInputGuess);
                inputSolve.remove();
                inputSolve.value = '';
            }

            else if (tempInput !== puzzleCurrent.text) {
                exitGame(msgGameOver.invalidGuess);
                inputSolve.remove();
                inputSolve.value = '';
        
            } else {

               winGame();

            }

        } 
    }

}

// validate user input or insert Y/N buttons
// function checkIfExitGame() {
//     let checkMsg = prompt(playerCurrent.name + ', are you sure you want to exit?');
//     if (checkMsg === 'y') {
//         exitGame('default');
//     } else {
//         return
//     }
// }

function winGame() {

    inputSolve.remove();

    if (playerCurrent.earnedCurrent === 0) {
        playerCurrent.earnedCurrent = 1000; // min earning

    }

    playerCurrent.earnedTotal += playerCurrent.earnedCurrent;

    setTimeout(function() {
        
        // display letters on board
        showAllLetters();
        
        // delay display msg
        showMsg('Congrats! You solved the puzzle! You\'ve earned $' + playerCurrent.earnedCurrent + ' for this game! See you again, ' + playerCurrent.name + '!');

        // To disable wheel from spin later
        // exitGame(successMsg);
        // tempInput === '';
        inputSolve.value = '';

    }, typMsgDelay);

    // let successMsg = 'Congrats! You solved the puzzle! You\'ve earned $' + playerCurrent.earnedCurrent + ' for this game! See you again, ' + playerCurrent.name + '!';
    
}



// consider not to remove puzzle at exit
// check msg showing undefined

function exitGame(msg) {

    // clear UI
    // btnSpinWheel.remove();
    btnBuyVowel.remove();
    btnSolvePuzzle.remove();
    btnExitGame.remove();
    // playerCurrent.earnedCurrent = 0;

    // show new game btn
    // resetBoard();
    playerStand.append(btnNewGame);
    wheelTurnOff();

    if (msg === 'default') {
        // let exitMsg = ;
        // console.log(exitMsg);
        // alert(exitMsg);
        showMsg('Bye, ' + playerCurrent.name + '! See you next time!');

    } 
    else {
        // console.log(msg);
        // alert(msg);
        showMsg(msg);
        resetEarnings();
    
    }

}


//--------- INITIALIZE GAME ---------//
playerStand.append(btnNewGame);
showMsg('Click on the "START NEW GAME" button to play');



//--------- BUTTON EVENT LISTENERS ---------//

// to update UI & function later
btnNewGame.addEventListener('click', (event) => {
    console.log('start new game btn clicked');
    resetBoard();
    startNewGame();
})

// NOTE: COMMENT OUT THIS PART IF USING ACTUAL WHEEL TO SPIN
btnSpinWheel.addEventListener('click', (event) => {
    console.log('spin wheel btn clicked');
    // clearInterval(countdownTimer);
    timerDiv.innerHTML = "";
    wheelDiv.innerHTML = "";
    spinWheel();
    
})

btnBuyVowel.addEventListener('click', (event) => {
    console.log('buy vowel btn clicked');
    // clearInterval(countdownTimer);
    timerDiv.innerHTML = "";
    buyVowel();
})

btnSolvePuzzle.addEventListener('click', (event) => {
    console.log('solve puzzle btn clicked');
    // clearInterval(countdownTimer);
    timerDiv.innerHTML = "";
    solvePuzzle();
})

btnExitGame.addEventListener('click', (event) => {
    console.log('exit game btn clicked');
    // clearInterval(countdownTimer);
    timerDiv.innerHTML = "";
    // checkIfExitGame();
    exitGame('default');
})



