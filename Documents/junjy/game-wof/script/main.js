'use strict'

console.log('linked');

// **Part 1A:**
// 1. Declare word puzzle array (10 nos. 1st)
// 2. Declare wheel values (12 nos. 1st. Note: actual: 24 nos.)
// 3. Write function to randomize word puzzles => print to UI
// 4. Write function to randomize wheel => print to UI
// 5. Set up word puzzle board
// 6. Set up player stand and display name, earnings, 'Spin Wheel', 'Buy a vowel', 'Solve It!' and 'Exit Game' buttons

// **COMMIT WORK:-**
// "Commit #1: Set up puzzle and wheel functions, as well as single-player stand"

//To update css & design later
const puzzleArray = ['DAIRY QUEEN OF HEARTS', 'CLASH OF THE TITANS', 'CHOCOLATE MACADAMIA NUT COOKIES', 'DELICIOUS DECADENT DESSERTS', 'CASHING IN A HUGE STACK OF CHIPS', 'ALL-DAY SKI LIFT TICKETS', 'CASABLANCA MOROCCO', 'THE VIEW FROM THE TOP OF A MOUNTAIN', 'PERSONALIZED STATIONERY', 'ST. ELMO\'S FIRE EXTINGUISHER'];

//To update values later. Note 18 so far
const wheelValues = [300, 400, 500, 600, 700, 800, 900, 1000, 2500, 'BANKRUPT', 300, 400, 500, 600, 700, 800, 900, 1000];

const puzzleBoard = document.querySelector('#puzzle-board');
const wheelBoard = document.querySelector('#wheel-board');
const playerStand = document.querySelector('#player-stand');
const scoreBoard = document.querySelector('#score-board');

// Refine playerstand setup and CSS later
function initPlayer() {

    let name = prompt('Please enter your name');

    let playerDiv = document.createElement('div');
    let playerName = document.createTextNode(name);
    playerDiv.append(playerName);

    // Set up buttons 1.Spin Wheel 2.Buy a vowel 3.Solve It! 4.Exit Game
    let lineBreak = document.createElement('br');
    let btnSpinWheel = document.createElement('button');
    btnSpinWheel.innerHTML = 'Spin Wheel';

    let btnBuyVowel = document.createElement('button');
    btnBuyVowel.innerHTML = 'Buy Vowel';

    let btnSolvePuzzle = document.createElement('button');
    btnSolvePuzzle.innerHTML = 'Solve It!';

    let btnExitGame = document.createElement('button');
    btnExitGame.innerHTML = 'Exit Game!';   

    playerStand.append(playerDiv, btnSpinWheel, btnBuyVowel, btnSolvePuzzle, btnExitGame);

}

//To update function later & hide letters
function initPuzzle() {

    // Q: Review no. of variables later
    let randNum = Math.floor(Math.random() * puzzleArray.length);
    let puzzleDiv = document.createElement('div');
    let puzzleNew = puzzleArray[randNum];
    let puzzleText = document.createTextNode(puzzleNew);
    console.log(puzzleNew);

    // Generate squares for each letter
    let puzzleSplit = puzzleNew.split('');

    puzzleSplit.forEach((element) => {
        // console.log(element);

        let sqDiv = document.createElement('div');
        sqDiv.setAttribute('class', 'square-box');

        // let letterDiv = document.createElement('div');
        let letter = document.createTextNode(element);
        sqDiv.append(letter);

        if (element === ' ') {
            console.log('space');
            sqDiv.classList.add('class', 'square-blank');            

        } else {
            sqDiv.classList.add('class', 'square-text');
        }

        puzzleDiv.append(sqDiv);

    })

    puzzleBoard.append(puzzleDiv);
    
}


// To upgrade spin wheel function later
function randSpinValue() {

    let randNum = Math.floor(Math.random() * wheelValues.length);
    let wheelDiv = document.createElement('div');
    let wheelValueNew = document.createTextNode(wheelValues[randNum]);    

    wheelDiv.append(wheelValueNew);
    wheelBoard.append(wheelDiv);


}


// INITIALIZE NEW GAME

initPlayer();
initPuzzle();
randSpinValue();



