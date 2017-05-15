      // object for game info
      var game = {       
            words: ["PHILLIP J FRY", "BENDER",],
            wordChosen: "",
            wordGuess: [],
            guesses: 6,
            wins: 0,
            letter: "",
            letterUsed: [],
            letterResult: false,
            txtResult: false,
            idWord: document.getElementById("word"),
            idComment: document.getElementById("comment"),
            idLetter: document.getElementById("letterUsed"),
            idGuess: document.getElementById("guesses"),


            //checks to see if letter has already been used
            usedCheck: function() {
              for  (var i = 0; i < this.letterUsed.length && this.letterResult === false; i++) {
                if (this.letter === this.letterUsed[i]){
                  this.letterResult = true;
                }
              }  

              console.log("letter: " + this.letter);
              console.log("letter used status: " + this.letterResult);
              console.log("--------");
            },

            //resets result to false
            resetResult: function(){
              this.letterResult = false;
            },

            //resets text check
            txtReset: function(){
              this.txtResult = false;
            },

            // fromats the guessed word into an array
            txtStart: function() {
              for (var i = 0; i < this.wordChosen.length; i++){
                if (this.wordChosen[i] === " "){
                  this.wordGuess[i] = " - ";
                } 
                else { 
                  this.wordGuess[i] = " _ ";
                }
              }
            },

            txtCheck: function() {
              for (var i = 0; i < this.wordChosen.length && this.txtResult === false; i++){
                if (this.wordChosen[i] === this.letter){
                  this.txtResult = true;
                }
              }
            },

            // adds the the letter(s) to correct spot
            txtRun: function(){
              for (var i = 0; i < this.wordChosen.length; i++){
                if (this.wordChosen[i] === this.letter){
                  this.wordGuess[i] = this.letter;
                } 
              }
            },
      }
    
      // randomly select word for game
      game.wordChosen = game.words[Math.floor(Math.random() * game.words.length)];
      

      // log name for game
      console.log("Game Word: " + game.wordChosen);
     
      // word split into array
      game.wordChosen = game.wordChosen.split("");
    
      // make a loop to go through 
      
     
      //places the dashes for the start
      game.txtStart();

      console.log(game.wordChosen);
      game.idWord.innerHTML = game.wordGuess.join(" ");
      
      // This function is run whenever the user presses a key.
      document.onkeyup = function(event) {

        // Determines which key was pressed and make lower case
        game.letter = String.fromCharCode(event.keyCode).toUpperCase();
        
        
        // Checks to see if a letter was pressed   
        if (game.letter.match(/[A-Z]/) != null) {

        
          //Checks to see if you have used letter 
          game.usedCheck();   

          // if yes .....
          if (game.letterResult) {
            
            //placed comment on page
            game.idComment.innerHTML = "you already used this!";
            
            //set result back to false
            game.resetResult() ;
          }

          // If not .....
          else { 
            
            // add the letter to the letters used array
            game.letterUsed.push(game.letter);

            //removes any comment placed 
            game.idComment.innerHTML = "";

            //join the letters used into string and place on page
            game.idLetter.innerHTML = game.letterUsed.join(" ");
            console.log(game.wordGuess);

            //check to see if letter is in chosen word
            game.txtCheck();
            
            //if yes .....
             if (game.txtResult) {

              game.txtRun();

              console.log("text result: " + game.txtResult)
              
              //places the found letters on the page
              game.idWord.innerHTML = game.wordGuess.join(" ");

              //resets txt check to false
              game.txtReset();
            }

            // If not .....
            else {
             
              //removes 1 guess from guesses
              game.guesses = game.guesses - 1;

              //place on page
              game.idGuess.innerHTML = game.guesses; 


            }
          } 
        }
        console.log(game.guesses);
      }
  
  console.log(game.letterUsed);
