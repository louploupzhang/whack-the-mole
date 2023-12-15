//Declare the variables
let mole; //1 mole = 1 td(table cell)
let total; //The variable to count score
let time; //The variable to countdown timer
let interSpawn; //The time interval of mole spawn rate
let interClear; //The time interval of table clear rate
let interTimer; //The time interval of timer countdown

//Create sound effects const
const audioHit = document.createElement("audio");
audioHit.src = "sound/Hit.wav"; //Effect for hit
const audioPop = document.createElement("audio");
audioPop.src = "sound/Pop.wav"; //Effect for mole show up

//Spawn a mole randomly in the table cells
function spawn(){  
    //Generate a random const integer from 0 to 9 as the current index of the table cells array
    const pos = Math.floor(Math.random() * 10);
    //pos is the current <td>'s id, assign this cell to mole
    mole = document.getElementById(pos);
    //Change the current cell's background to the mole's image
    mole.style.backgroundImage="url(image/mole.png)";
    //Fill the image in the cell
    mole.style.backgroundSize="cover"; 
    //Anchcor the image to center
    mole.style.backgroundPosition="center";
    //Play sound effect
    audioPop.play();
    //Change the current cell's state to 1, in order to mark it as active
    mole.state = "1";
}

//Click to hit the moles
/*
document.addEventListener("click", function(){
    cell.style.backgroundSize="cover";
    cell.style.backgroundImage="url(image/mole_hit.png)";
    total++;
    });
*/
function hit(cell){
    //Check if the current cell has a mole in it
    if(cell.state == "1"){
    //Change the current cell's background to the mole_hit's image
    cell.style.backgroundImage="url(image/mole_hit.png)";    
    cell.style.backgroundSize="cover";
    mole.style.backgroundPosition="center";
    //Play sound effect
    audioHit.play();
    //Score increment when the mole get hit
    total++;
    //Change the cell's state back to inactive when the mole get hit, to fix the score stack bug (when the player click multiply times at a mole before it is get cleared, the score keeps increasing)
    cell.state = "0";
    }        
    //Display the current score
    document.querySelector(".score").value="Score: " + total;     
}

//Clear the table
function clear(){
    //Since the 9 table cells are in an array, here use a for loop to clear the whole table
    for(let i = 0; i < 9; i++){
        //Get the current cell
        const cell = document.getElementById(i);
        //Clear the current cell's image
        cell.style.backgroundImage="";
        //Disable the current cell
        cell.state = "0";
    }
}

//Timer
function timer(){
    if(time > 0){
        //Decrement only when there's time left (time>0)
        time--;
        //Display the time left
        document.querySelector(".time").value = "Time Left: " + time + "s";               
    }else{
        //Clear the table when no time left
        clear();
        //Fix the bug: game over message keeps popping up
        clearInterval(interTimer);
        //Fix the bug: game restart automatically after closing the pop-up message
        clearInterval(interSpawn);
        //Pop the game over message
        alert("Game over!\nYou hit " + total + " moles!");
    }
}

//Set time intervals at the beginning of the game
function start(){
    //Inital time = 10 sec
    time = 10;
    //Inital score = 0
    total = 0;
    //Set time intervals for mole spawn
    interSpawn = setInterval("spawn()",500);
    //Set time intervals for clear table
    interClear = setInterval("clear()",2000);
    //Set time intervals for countdown
    interTimer = setInterval("timer()",1000);
}