/*
 * Create a list that holds all of your cards
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/* ****************** Global Variables ************************** */
let isCardClicked = false;

let totalSeconds = 0;

let cardZeroClass,
    cardOneClass;

let openCardArray = [],
    openCardIndex = 0;

let timerInterval;

let gameInProgress = false;

let numberOfMoves = numberOfMatchedCardPairs = 0;

let restartButton = document.querySelector(".restart", ".fa fa-repeat");

let numberOfStars = 3;

let gameWonTimer;

let cardIndexNumber = 1;

const winMsg = `Congrats... You won!`;
/* ************************ Start logic ********************************** */

//create the document body


let cardArray = document.querySelectorAll(".deck .card");

cardArray = shuffle(cardArray);
reshuffle();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function reshuffle() {
    //lets give all the cards unique ids first

    for (let cardIndex = 0; cardIndex < cardArray.length; cardIndex++) {
        cardArray[cardIndex].setAttribute("id", cardIndexNumber++);

    }

    //create a list of all the child elements of the <li> tags, this will be the new cards that will eventually be displayed
    let elementsArray = [];
    for (let cardIndex = 0; cardIndex < cardArray.length; cardIndex++) {

        let newChildElement = cardArray[cardIndex].firstElementChild;
        elementsArray[cardIndex] = newChildElement;

    }

    //remove the current child from the list of <li> elements and add the new child element instead
    for (let cardIndex = 0; cardIndex < cardArray.length; cardIndex++) {

        let elementToRemove = cardArray[cardIndex].firstElementChild;
        cardArray[cardIndex].removeChild(elementToRemove);
        cardArray[cardIndex].insertAdjacentElement('afterbegin', elementsArray[cardIndex]);

    }

    let liArray = []; //array of new <li> elements we are about to create

    //create a new <li> tag, add the class attribute "card" to it and the append the child <li> element to it
    for (let cardIndex = 0; cardIndex < cardArray.length; cardIndex++) {

        let newListElement = document.createElement('li');
        newListElement.classList.add("card");
        newListElement.appendChild(cardArray[cardIndex]);
        liArray[cardIndex] = newListElement;
    }

    //append the array of <li> items to parent class "deck"
    for (let cardIndex = 0; cardIndex < cardArray.length; cardIndex++) {

        document.body.getElementsByClassName("deck")[0].append(liArray[cardIndex]);

    }
}
//set up an event listener for all cards
for (let index = 0; index < cardArray.length; index++) {

    cardArray[index].addEventListener('click', function() {

        document.querySelector('h1').innerHTML = "New Game Started";

        isCardClicked = true;

        //display the card clicked on
        displayCard(cardArray[index]);

        //start game timer
        startGameTimer();


        //update the number of moves
        updateNumberofMovesMade();

        //add open card to an array of cards
        addCardToOpenCardArray(this);


    });
}

//display a pair of cards for 2 seconds and then hide
function countdown_init() {

    setTimeout(timeout_trigger, 2000);
}

function timeout_trigger() {

    for (let index = openCardArray.length - 1; index > -1; index--) {

        openCardArray[index].classList.remove("open", "show");
    }

    resetOpenCardArray();

}

function resetOpenCardArray() {

    openCardArray = []; //reset openCardArray
    openCardIndex = 0; //reset index


}
//when a user clicks a card, display it for the user
function displayCard(card) {


    let cardInFocus = card;
    let buttonClasses = cardInFocus.classList;

    if (isCardClicked) {

        card.classList.add("open", "show");

    }

    gameWonTimer = setTimeout(checkGameOver, 1000);
}

//start the timer that counts the total elapsed time since game start

//timer logic https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function startGameTimer() {

    if (gameInProgress) {

        return;
    } else {

        gameInProgress = true;

        let start = Date.now();

        timerInterval = setInterval(function() {

            document.getElementById("seconds").innerHTML = pad(Math.floor((Date.now() - start) / 1000) % 60);

            document.getElementById("minutes").innerHTML = pad(parseInt(Math.floor((Date.now() - start) / 1000) / 60), 10);

        }, 200);

    }
}

restartButton.addEventListener('click', reStart);

//what happens when a user restarts or starts a new game after winning the game

/*
  1. set the variable which drives the timer to false.
  2. clear out the timer Variables
  3. reset all the labels on the document
  4. reset all the cards
  5. reload the page from server
 */
function reStart() {

    gameInProgress = false;

    clearInterval(timerInterval);

    document.querySelector('h1').innerHTML = "Memory Game";

    document.getElementById("seconds").innerHTML = "00";

    document.getElementById("minutes").innerHTML = "00";

    document.querySelector(".moves").innerHTML = "0";

    numberOfMoves = 0;
    numberOfMatchedCardPairs = 0;

    resetOpenCardArray();

    for (let cardIndex = 0; cardIndex < cardArray.length; cardIndex++) {

        cardArray[cardIndex].classList.remove("open", "show", "match");


    }
    location.reload(true);
}

//time formatting
//if the value of seconds is greater than 9, then pad the number with a 0, otherwise do nothing
function pad(timeValue) {

    return timeValue > 9 ? timeValue : "0" + timeValue;

}

//adds +1 to the moves everytime the user clicks on a card
function updateNumberofMovesMade() {

    //change text to reflect the  number of moves made
    document.querySelector(".moves").innerHTML = ++numberOfMoves;

    let starArray = document.getElementsByClassName("fa fa-star");

    //take a star away for every 20 moves made
    if (numberOfMoves == 40) {

        starArray[1].classList.add("checked");

        numberOfStars--;

    } else if (numberOfMoves == 20) {

        starArray[2].classList.add("checked");

        numberOfStars--;
    }

}

// to check two cards that are open for a match
function addCardToOpenCardArray(card) {

    openCardArray[openCardIndex++] = card;

    //check if the 2 open cards match
    if (openCardArray.length == 2) {

        //get the class names of the <i> elements
        let cardZeroClass = openCardArray[1].getElementsByTagName("i")[0].className;
        let cardOneClass = openCardArray[0].getElementsByTagName("i")[0].className;

        //check if the classes of the 2 cards match and the same card isnt clicked twice
        if (cardZeroClass === cardOneClass &&
            openCardArray[0].getAttribute("id") !==
            openCardArray[1].getAttribute("id")) {

            openCardArray[0].classList.remove("open", "show");
            openCardArray[0].classList.add("match");

            openCardArray[1].classList.remove("open", "show");
            openCardArray[1].classList.add("match");

            numberOfMatchedCardPairs++;

            resetOpenCardArray();
        } else {
            countdown_init(); // start counting down and hide the cards

        }

    }

}
//keep checking after the interval of a second if the game is over
function checkGameOver() {

    if (numberOfMatchedCardPairs == 8) {
        gameInProgress = 0;

        // how to use a modal: https://www.w3schools.com/howto/howto_css_modals.asp
        // Get the modal
        let modal = document.getElementById('myModal');
        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];

        // When the user wins, open the modal

        modal.style.display = "block";

      // when the use clicks new game button, reset

        $(document).on("click", "#new-game-button", function(event) {
            reStart();
            modal.style.display = "none";
        });

        let tempVar = (numberOfStars > 1) ? "stars" : "star";
        document.getElementsByClassName("game-win-msg")[0].innerHTML = `${winMsg}
You won in ${numberOfMoves} moves and ${numberOfStars} ${tempVar}!`;

        clearInterval(timerInterval);
        clearInterval(gameWonTimer);
    }
}

//function to shuffle array
// Shuffle function from http://stackoverflow.com/a/2450976(updated for ES6 / ECMAScript 2015)
function shuffle(array) {
    array = Array.from(array);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
