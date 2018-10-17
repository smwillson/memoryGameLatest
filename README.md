# Memory Game Project

# How to download the project?

In order to clone the project onto your computer via HTTPS URLs (recommended) do the following:

1.  Open a new command prompt window

2.  Type git clone https://github.com/smwillson/memoryGameLatest.git at the prompt.

More information : https://help.github.com/articles/which-remote-url-should-i-use/

# How to play the game?

To run the game, simply open the index.html file.

Click on any one of the tiles to start a new game. Enjoy!

## Core functionality:

The following methods hold the core functionality for the project.

* displayCard: contains logic that is used when a card is clicked to display it to the user

* startGameTimer: contains logic for the timer that measures time elapsed

* updateNumberofMovesMade: contains logic that is used to keep updating the moves made as the user clicks a card and the stars

* addCardToOpenCardArray: contains logic that checks if the array contains 2 cards, if so , check that have the same class but different ids. If true, lock them in place else start countdown to hide open cards.

* resetOpenCardArray: contains logic that removes displayed card from the global open card array

* countdown_init: contains logic that starts countdown to hide cards

* checkGameOver: contains logic that keeps checking in the background if the game is over, display modal to user with congratulatory is message

* reStart: contains logic that resets everything
