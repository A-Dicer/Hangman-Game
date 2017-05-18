
// object for game info ------------------------------------

          var game = {       
            words: ["PHILIP-J-FRY", "BENDER", "TURANGA-LEELA", "DR-ZOIDBERG", "AMY-WONG", "PROF-FARNSWORTH", "KIF-KROKER", "ZAPP-BRANNIGAN", "SCRUFFY", "NIBBLER", "HERMES-CONRAD", "HYPNOTOAD", "LRRR", "MOM", "ROBOT-DEVIL", "URL", "CALCULON", "HEDIONISMBOT"],
            
            hints: [ "He is generally very lazy at work, spending most of his time in the office sitting on the couch: watching TV and drinking Slurm.",
                    "He gambles, smokes cigars, consorts with hookerbots, has 100,000 terabytes of porn on his hard drive.",
                    "She has a 'no rain or sleet' attitude and a 'kick-your-arse' grace.",
                    "He was born on the Planet Decapod 10 and moved to Earth to practice medicine after giving up comedy once.",
                    "She is a cute (though less cute as she has previously had cuteness reduction surgery).",
                    "He is pushing the limits of even the 31st century at an agе of well over 160.",
                    "He is an undisclosed Amphibiosan alien of light green color from the planеt Amphibios 9.",
                    "He is an egotistical military officer for the Democratic Order of Planets(DOoP).",
                    "He is the Planet Express janitor.",
                    "He is a Nibblonian who has existed since the beginning of time.",
                    "He is the accountant for Planet Express and a long time friend of Professor Farnsworth.",
                    "All glory to the Hypnotoad!",
                    "He is an Omicronian and is Emperor of the planet Omicron Persei 8.",
                    "As one of the richest people on Earth, she maintains her public image as a sweet, matronly figure.",
                    "He owns a golden fiddle and lives in a New Jersey amusement park.",
                    "He is a robotic peace officer for the New New York Police Department.",
                    "Aslo know as Acting Unit 0.8, Thespo-mat, and David Duchovny.  He was also given his 'Un-holy acting talent' from the Robot Devil.",
                    "He is a robot modeled after an ancient Roman hedonist."],
          
            wordChosen: "",
            wordGuess: [],
            wordNumber: 0,
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
            idInfo: document.getElementById("info"),
            idName: document.getElementById("name"),
            idWordImg: document.getElementById("wordImg"),
            idWordBio: document.getElementById("wordBio"),
            idWorL: document.getElementById("WorL"),
            idHint: document.getElementById("hint"),

            info: function(){
              for (var i = 0; i < this.words.length; i++){
                if(this.wordChosen.join("") === this.words[i]){ this.wordNumber = i}
              }

              this.idName.innerHTML = this.wordChosen.join("");
              this.idWordImg.src = "assets/images/" + this.wordNumber + ".png";
              this.idWordBio.innerHTML = this.hints[this.wordNumber];
            },

            Percent: function(){
              this.winP = this.wins / (this.wins + this.losses) *100 ; 
              this.lossP = this.losses / (this.losses + this.wins) *100;
            },
            
            //code to start / restart the game
            start: function(){
              this.idInfo.style.display = "none";
              this.wordGuess = [];
              this.letterUsed = [];
              this.guesses = 8;
              this.idHint.innerHTML = ""
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

              //places info into div
              this.info();
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
                this.idInfo.style.display = "block";
                this.idWorL.innerHTML = "You Won!";
                setTimeout(myFunction , 10000);
              }
            },

            //checks to see if you lost
            lossCheck: function(){

              //check to see if you need a hint
              if(this.guesses < 5){
                this.idHint.innerHTML = this.hints[this.wordNumber];
              }

              if (this.guesses === 0){
                this.losses = this.losses + 1;
                this.Percent();
                this.idWins.innerHTML = "Wins: " + this.wins + " - (" + this.winP.toFixed() + "%)";
                this.idLosses.innerHTML = "Losses: " + this.losses + " - (" + this.lossP.toFixed() + "%)";
                this.idInfo.style.display = "block";
                this.idWorL.innerHTML = "You Lost!";
                setTimeout(myFunction , 10000);
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

    //timer to restart the game
    function myFunction() {
    game.start();
}
