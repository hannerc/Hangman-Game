  
var wins = 0 ;
var lost = 0 ;
var lives; //this is the number of lives or guesses the user has
var ABCsArrayMaster;//this is the main bank of words for the user to guess
var wordToDisplay;
var wordChosenArray;
var DashStringArray;

var GIFArrayDamage = ["damage1.gif","damage2.gif","damage3.gif","damage4.gif","damage5.gif","damage6.gif","damage7.gif","damage8.gif","damage9.gif","damage10.gif" ];
var GIFArrayWin = ["win1.gif","win2.gif","win3.gif","win4.gif","win5.gif","win6.gif","win7.gif","win8.gif","win9.gif","win10.gif",]

var wordBankArray = ['ENTERPRISE' , 'SPOCK' , 'KIRK' , 'STARTREK' , 'ROMULANS', 'KLINGONS', 'PHASER', 'PHOTON', 'TRANSPORTER', 'TREK', 'SPACE', 'NACELLE', 'DAYSTROM', 'AUTODESTRUCT', 'DILITHIUM', 'WHALES', 'SANFRANCISCO', 'STARFLEET', 'UHURA', 'SHATNER', 'RODDENBERRY', 'TRIBBLE', 'WESLEY', 'CRUSHER', 'PICARD', 'TROI', 'RIKER', 'FERENGI', 'ANDORIAN', 'VULCAN', 'HUMAN', 'BETAZOID', 'DEFLECTOR'];
ResetGame();


function ResetGame(argument) {
 
 lives = 10;
 
 ABCsArray = ["A", "B", "C", "D", "E", "F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  wordToDisplay = wordBankArray[Math.floor(Math.random()*wordBankArray.length)];
  
  console.log("The secret word is: "+ wordToDisplay); //randomly select one word from the wordbank to which will then be masked and displayed to the user

  wordChosenArray = Array.from(wordToDisplay); //creates an array from word chosen
  console.log(wordChosenArray);//logs the secret word

  DashStringArray = wordChosenArray.fill("-");//creates a dashed string to display in the game
   
};

  //put a funciton here asking the user to press a key to start
  
  console.log(DashStringArray);
  console.log(wordChosenArray);
  console.log(wordToDisplay);

  //everything below here happens when the key is pressed

  //listens for the letters typed by the user
document.onkeyup = function(KeyUpEvent){
 

  //display the players lives  
  document.getElementById("GuessesLeft").innerHTML = lives;  

  //creates user guess
  var userGuess = event.key.toUpperCase();
  console.log(typeof event.key)
  console.log("The user has guessed: " + userGuess);
 
  //writes the wins to the page so the user can see,
  document.getElementById("Won").innerHTML = wins;

  //writes the losses to the page so the user can see,
  document.getElementById("Lost").innerHTML = lost;

  //display the letters guessed by the user
  var replaceLetter = ABCsArray.indexOf(userGuess); 

  //replaces the letters in the ABC array with a space so the user can see what letter to guess next
  if(~replaceLetter){
  ABCsArray[replaceLetter] = "*";
  };

  var LettersGuessedByUser = ABCsArray.join(" ");

  var damageGIF = GIFArrayDamage[Math.floor(Math.random()* GIFArrayDamage.length)];
  var WinGIF = GIFArrayWin[Math.floor(Math.random()* GIFArrayWin.length)];

  document.getElementById("DisplayLetterGuesses").innerHTML = LettersGuessedByUser; //writes the array as a string to the page so the user can see which letters remain

  var matchIndex = wordToDisplay.search(event.key.toUpperCase()); //searches for the letter within the displayed word and gives the index a match index of -1 means the letter is not present in the word. This is used to calculate the remaining guesses

  if (matchIndex === -1){
  lives = lives - 1;
  console.log(lives);//calculates the remaining guesses the player has 
  document.getElementById("GIF_Placeholder").innerHTML="<img class='main_gif thumbnail' src='Assets/Images/"+damageGIF+"' style='border: none;'>";
  
  };
  
  //displays the Win Gif
  if (matchIndex !==-1){document.getElementById("GIF_Placeholder").innerHTML="<img class='main_gif thumbnail' src='Assets/Images/"+WinGIF+"' style='border: none;'>";};
  //display the players lives
  document.getElementById("GuessesLeft").innerHTML = (lives)+""+((Math.floor((Math.random() * 9) + 1)))+"%";

  var matchLetter = wordToDisplay.charAt(matchIndex); //returns the matched letter 

  console.log(matchLetter);
  console.log(matchIndex);
  console.log(lives);


  //finds the indexes of all the occurances of a letter, dont really need this anymore but it took me forever to figure out so I'm keeping it in the code for now
  var indices = [];
  for(var i=0; i<wordToDisplay.length;i++) {
    if (wordToDisplay[i] === event.key.toUpperCase()) {
      indices.push(i);
  }
  };
  console.log(indices);
  console.log(wordToDisplay)

  //loop to replace dash with matched letter if sucessful, this piece of code took me hours and hours to figure out, I actually cried when it started working, now it looks hilariously simple
  for(var j=0; j<wordChosenArray.length;j++) {
  if(matchLetter === wordToDisplay[j]){
  DashStringArray[j] = matchLetter;
  };
  };

  var Dashwordstring = DashStringArray.join(" ");
  console.log(Dashwordstring);

  //writes the array to the page so the user can see , displays the dashed word
  document.getElementById("DisplayWord").innerHTML = Dashwordstring;
 

  //Displays the word chosen when the user incorrectly guesses
  console.log(wordToDisplay);

  // add to the lost counter when lives reach zero
  if (lives === 0){
  document.getElementById("ChosenWord").innerHTML = wordToDisplay; 
  lost = lost + 1;
  };


//resets the display once all guesses are gone

if (lives === -1){
  
  document.getElementById("AlertStatus").innerHTML = "<h3>DESTROYED</h3>";
  document.getElementById("GuessesLeft").innerHTML = " "; 
  document.getElementById("DisplayWord").innerHTML = wordToDisplay; 
 // document.getElementById("ChosenWord").innerHTML = " "; 
  document.getElementById("DisplayLetterGuesses").innerHTML = " ";
  //display destrct gif here
  document.getElementById("GIF_Placeholder").innerHTML="<img class='main_gif thumbnail' src='Assets/Images/destr1.gif'>";
  ResetGame();
}

  //check to see if the player has won
  //calculates wins

  var winIndex = Dashwordstring.search("-");
  if (winIndex === -1){
  wins = wins +1; //adds one to the win score
  
  document.getElementById("GuessesLeft").innerHTML = "100%"; 
  document.getElementById("DisplayWord").innerHTML = wordToDisplay; 
  document.getElementById("ChosenWord").innerHTML = " "; 
  document.getElementById("DisplayLetterGuesses").innerHTML = " ";
document.getElementById("GIF_Placeholder").innerHTML="<img class='main_gif thumbnail' src='Assets/Images/flyby.gif'>";
  
  //display winning photo here
  ResetGame();
  };
  console.log(wins);


  //display alert status
  //document.getElementById("AlertStatus").innerHTML = "<h3 id='green_alert'>CONDITION GREEN</h3>";
  if(lives<10){
    document.getElementById("AlertStatus").innerHTML = "<h3 id='red_alert'>ALERT </h3><br><p id='red_alert'>CONDITON RED</p>"; 

  }
};

