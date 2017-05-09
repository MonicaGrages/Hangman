$(document).ready(function() {



  var gameBoard = {
    startGame : function () {
      // called by start button click handler
      //should call generateRandomSecretWord and createLetterBoard
      gameBoard.createLetterBoard();
    },

    showHiddenLetterList : function () {
      secretWord.generateRandomSecretWord();
      //also call letterButtons object here?
    },


    createLetterBoard : function() {
      //will make the letter board show up after game starts
      //could just add a class to an already existing letter board that makes its visibility not hidden?
    },

    endGame : function () {
      //win vs loss?
      //need to have a reset button pop up
    },

    resetGame : function () {
      //will be called when user clicks reset button
    }

  };



  var letterBoard = {
    lettersArray : [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z],
    showLetters : function() {

    },

  }




  var secretWord = {
    wordBank : ['tacos', 'banana', 'hat', 'array'],
    generateRandomSecretWord : function () {
      //will get random secret word from word bank and
      //add hidden letter list to game board
      //math.random?
      var randomIndexNumber = Math.floor(secretWord.wordBank.length*(Math.random()));
      var theSecretWord = secretWord.wordBank[randomIndexNumber];
      console.log(theSecretWord);
    },

  };




  var scoreBoard = {

  };



  var buttonHandlers = {
    startClickHandler : function() {
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
