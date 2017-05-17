
// object for game info ------------------------------------

          var game = {       
            words: ["PHILIP-J-FRY", "BENDER", "TURANGA-LEELA", "DR-ZOIDBERG", "AMY-WONG", "PROFESSOR-FARNSWORTH", "KIF-KROKER", "ZAPP-BRANNIGAN", "SCRUFFY", "NIBBLER", "HERMES-CONRAD", "HYPNOTOAD", "LRRR", "MOM", "ROBOT-DEVIL", "URL", "CALCULON", "HEDIONISM-BOT"],
            wordChosen: "",
            wordGuess: [],
            guesses: 8,
            wins: 0,
            winP: "",
            losses: 0,
            lossP: "",
            letter: "",
            letterUsed: [],
            letterResult: false,
            txtResult: false,
            idWord: document.getElementById("word"),
            idComment: document.getElementById("comment"),
            idLetter: document.getElementById("letterUsed"),
            idGuess: document.getElementById("guesses"),
            idWins: document.getElementById("wins"),
            idLosses: document.getElementById("losses"),

            Percent: function(){
              this.winP = this.wins / (this.wins + this.losses) *100 ; 
              this.lossP = this.losses / (this.losses + this.wins) *100;
            },
            
            //code to start / restart the game
            start: function(){
              this.wordGuess = [];
              this.letterUsed = [];
              this.guesses = 8;
              this.idComment.innerHTML = "";
              this.idWord.innerHTML = "";
              this.idGuess.innerHTML = "Guesses Remaining: " + 8;
              this.idLetter.innerHTML ="";

              //get random word
              this.random();

              // log name for game
              console.log("Game Word: " + this.wordChosen);
     
              // word split into array
              this.wordChosen = this.wordChosen.split("");
     
              //places the dashes for the start on screen
              this.txtStart();
              this.idWord.innerHTML = this.wordGuess.join(" ");
            },

            //gets randome word for game
            random: function(){
              this.wordChosen = this.words[Math.floor(Math.random() * this.words.length)];
            },

            
            //checks to see if letter has already been used
            usedCheck: function() {
              for  (var i = 0; i < this.letterUsed.length && this.letterResult === false; i++) {
                if (this.letter === this.letterUsed[i]){
                  this.letterResult = true;
                }
              }  

              console.log("---------------------------");
              console.log("Letter: " + this.letter);
              console.log("Previously Used: " + this.letterResult);
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
                if (this.wordChosen[i] === "-"){
                  this.wordGuess[i] = "-";
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

            //checks to see if you won
            winCheck: function(){
              if (this.wordChosen.join("") === this.wordGuess.join("")){
                this.wins = 1 + this.wins;
                this.Percent();
                this.idWins.innerHTML = "Wins: " + this.wins + " - (" + this.winP.toFixed() + "%)";
                this.idLosses.innerHTML = "Losses: " + this.losses + " - (" + this.lossP.toFixed() + "%)";
                this.start();
              }
            },

            //checks to see if you lost
            lossCheck: function(){
              if (this.guesses === 0){
                this.losses = this.losses + 1;
                this.Percent();
                this.idWins.innerHTML = "Wins: " + this.wins + " - (" + this.winP.toFixed() + "%)";
                this.idLosses.innerHTML = "Losses: " + this.losses + " - (" + this.lossP.toFixed() + "%)";
                this.start();
              }
            },

            txtLoweCase: function(){
              this.letter = String.fromCharCode(event.keyCode).toUpperCase();
            },

            keyRun: function(){

              // Determines which key was pressed and make lower case
              this.txtLoweCase();

              //checks to if you typed a letter
              if (this.letter.match(/[A-Z]/) != null) {

        
                //Checks to see if you have used letter previosly 
                this.usedCheck();   

                // if yes .....
                if (this.letterResult) {
            
                  //place comment on page
                  this.idComment.innerHTML = "You already used the letter " + this.letter + "!";
            
                  //set result back to false
                  this.resetResult() ;
                }

                // If not .....
                else { 
            
                  // add the letter to the letters used array
                  this.letterUsed.push(this.letter);

                  //removes any comment placed 
                  this.idComment.innerHTML = "";

                  //join the letters used into string and place on page
                  this.idLetter.innerHTML = this.letterUsed.join(" ");

                  //check to see if letter is in chosen word
                  this.txtCheck();
            
                  //if yes .....
                  if (this.txtResult) {

                    this.txtRun();

                    console.log("In Word: " + this.txtResult)
              
                    //places the found letters on the page
                    this.idWord.innerHTML = this.wordGuess.join(" ");

                    //resets txt check to false
                    this.txtReset();
                  }

                  // If not .....
                  else {
             
                    //removes 1 guess from guesses
                    this.guesses = this.guesses - 1;

                    //place on page
                    this.idGuess.innerHTML = "Guesses Remaining: " + this.guesses; 

                    console.log("In Word: " + this.txtResult);
                  }
                } 
              } 
            },
          }
    

// calls for game to work ------------------


      // start the game on load
      game.start();
      
      // This function is run whenever the user presses a key.
      document.onkeyup = function(event) {
        
        // Checks to see if a letter was pressed   
        game.keyRun();

        //check to see if you won
        game.winCheck();

        //check to see if you lost
        game.lossCheck();
      }
  
  
