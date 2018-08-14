/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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

let openCardArray= [],
	openCardIndex= 0;

let  timerInterval;
	
let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
 
let cardArray= document.querySelectorAll(".deck .card");

let gameInProgress = false;

/* ************************ Start logic ********************************** */

 //set up an event listener for all cards
for(let index = 0; index < cardArray.length; index++){
	
cardArray[index].addEventListener('click',function(){
	
	document.querySelector('h1').innerHTML="New Game Started";
	
	isCardClicked = true;
	
	displayCard(this);
	
	
});
	}
	
//display a pair of cards for 2 seconds and then hide	
function countdown_init() {
			
	setTimeout('timeout_trigger()', 2000);
}

function timeout_trigger() {
  
  for(let index = openCardArray.length -1; index > -1 ; index--){    
	  
	  openCardArray[index].classList.remove("open", "show");
  }
 
	resetOpenCardArray();
 
 }

 function resetOpenCardArray(){
	 
	openCardArray=[];   //reset openCardArray
	openCardIndex= 0;  //reset index 
	 
 }
 function displayCard(card){
	 
	 
	let cardInFocus = card;
	  
	let buttonClasses = cardInFocus.classList;
	
	console.log(buttonClasses);
	
	
	if(isCardClicked){
		
		card.classList.add("open", "show");
		
	}
	 gameInProgress = true;
	
	
	openCardArray[openCardIndex++] = card;
	
	//start game timer
	startGameTimer();
	//check if the 2 open cards match
	if(openCardArray.length == 2){
		
		//get the class names of the <i> elements
		let cardZeroClass = openCardArray[1].getElementsByTagName("i")[0].className;
		let cardOneClass = openCardArray[0].getElementsByTagName("i")[0].className;
				
		//check if the classes of the 2 cards match.
		if(cardZeroClass === cardOneClass){
			
			openCardArray[0].classList.remove("open", "show"); 
			openCardArray[0].classList.add("match");
			
			openCardArray[1].classList.remove("open", "show");
			openCardArray[1].classList.add("match");
			
			resetOpenCardArray();
		}
		else{
			countdown_init();  // start counting down and hide the card again
			
		}
		
	}
	
	
 }
 function startGameTimer(){
	 
		timerInterval = setInterval(function(){
		 
		document.getElementById("seconds").innerHTML = pad(++totalSeconds % 60); 
		document.getElementById("minutes").innerHTML = pad(parseInt(totalSeconds / 60),10);
	 		 
	 }, 1000);

	
 }

let restartButton = document.querySelector(".restart" ,".fa fa-repeat");
	 
	 
restartButton.addEventListener('click',reStart);

function reStart(){
		 
		 document.querySelector('h1').innerHTML="Memory Game";
		 console.log(timerInterval);
		clearInterval(timerInterval);
		 
		 document.getElementById("seconds").innerHTML = "00";
		 
		 document.getElementById("minutes").innerHTML = "00";
	 }
 
 
 function pad(timeValue) {
	 
  return timeValue > 9 ? timeValue : "0" + timeValue;
 }