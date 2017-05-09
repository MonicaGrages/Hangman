$(document).ready(function() {



  var game = {
    isOngoing : false,
    startGame : function () {
      // called by start button click handler
      //should call generateRandomSecretWord and createLetterBoard
      if (game.isOngoing === false) {
        game.isOngoing = true;
        game.createLetterBoard();
        game.secretWord();
      } else if (game.isOngoing === true) {
        return;
      }
    },

    secretWord : function () {
      createAndShowSecretWord.generateRandomSecretWord();
      createAndShowSecretWord.showHiddenLetterList();

    },


    createLetterBoard : function() {
      //will make the letter board show up after game starts
      //could just add a class to an already existing letter board that makes its visibility not hidden?
      letterBoard.showLetters();
    },

    endGame : function () {
      //win vs loss?
      //need to have a reset button pop up
      game.isOngoing = false;
    },

    resetGame : function () {
      //
    }

  };



  var letterBoard = {
    lettersArray : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    showLetters : function() {
      for (var i=0; i<letterBoard.lettersArray.length; i++) {
        $('#letterBoard').append('<button>'+letterBoard.lettersArray[i]+'</button>');
      }
    },
  };




  var createAndShowSecretWord = {
    wordBank : ['tacos', 'banana', 'hat', 'array'],
    generateRandomSecretWord : function () {
      //will get random secret word from word bank and
      //add hidden letter list to game board
      //math.random?
      var randomIndexNumber = Math.floor(createAndShowSecretWord.wordBank.length*(Math.random()));
      var theSecretWord = createAndShowSecretWord.wordBank[randomIndexNumber];
      return theSecretWord;

    },
    showHiddenLetterList : function() {
      //takes return from secret word generator
      var theSecretWord = createAndShowSecretWord.generateRandomSecretWord();
      console.log(theSecretWord);
      for (var i=0; i<theSecretWord.length; i++) {
        $('#hiddenLetterList').append('_ ');
      }
  };




  var scoreBoard = {
    //Ice Box
  };



  var buttonHandlers = {
    startClickHandler : function() {
      game.startGame();
    },
    resetClickHandler : function() {
      //event handler for reset button click
    },
    letterClickHandler : function () {
      //called by event handler for letter clicks
      //should call letter evaluating function(s)
    }
  };




  $('#startButton').on('click', buttonHandlers.startClickHandler);
  //put reset button click event handler here and call resetClickHandler
  //put letter click event handler here and call letterClickHandler



//below is the end of the document.ready function
});
