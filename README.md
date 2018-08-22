# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).


##Core functionality:


* displayCard()--contains logic that is used when a card is clicked to display it to the user

* startGameTimer()-- contains logic for the timer that measures time elapsed

* updateNumberofMovesMade()--  contains logic that is used to keep updating the moves made as the user clicks a card and the stars

* addCardToOpenCardArray()-- contains logic that checks if the array contains 2 cards, if so , check that have the same class but different ids. If true, lock them in place else start countdown to hide open cards.

* resetOpenCardArray()-- contains logic that removes displayed card from the global open card array

* countdown_init()-- contains logic that starts countdown to hide cards

* checkGameOver()-- contains logic that keeps checking in the background if the game is over, display modal to user with congratulatory is message

* reStart()-- contains logic that resets everything
