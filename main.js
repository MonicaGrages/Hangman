$(document).ready(function() {



  var gameBoard = {
    startGame : function () {
      // called by start button click handler
      //should call generateRandomSecretWord and createLetterBoard
      gameBoard.generateRandomSecretWord();
      gameBoard.createLetterBoard();
    },
    generateRandomSecretWord : function () {
      //will get random secret word from word bank and
      //add hidden letter list to game board

    },
    createLetterBoard : function() {
      //will make the letter board show up after game starts

    },
    endGame : function () {
      //win vs loss?
    },
    resetGame : function () {
      //will be called when user clicks reset button
    }

  };


var scoreBoard = {

};








var buttonHandlers = {
  startClickHandler : function() {
    //event handler for start button click
    //should call gameBoard.startGame() from here
    gameBoard.startGame();
  },
  resetClickHandler : function() {
    //event handler for reset button click
  },
  letterClickHandler : function () {
    //add event handler for letter clicks
    //should call letter evaluating function(s)
  }
};




  $('#startButton').on('click', buttonHandlers.startClickHandler);
  //put reset button click event handler here and call resetClickHandler
  //put letter click event handler here and call letterClickHandler



//below is the end of the document.ready function
});
