const gameContainer = document.getElementById("game");

const COLORS = ["red","blue","green","orange","purple","red","blue","green","orange","purple"];

let card1 = null;
let card2 = null;
let noClicking = false;
let cardsFlipped = 0;



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  // checks if no click is true, if so return, do not run subsequent lines of code
  if(noClicking) return;
  // if the click target has already been assigned flipped, return
  if(event.target.classList.contains("flipped")) return;


  const selectedCard = event.target;
  //sets background color of card to the assigned color from shuffle
  selectedCard.style.backgroundColor = selectedCard.classList[0];

  // checks if card1 or card 2 has been assigned, if not then the 'flipped' class is added to current card 
  // both card1 and 2 are initially set to null so the condition is true 
  if(!card1 || !card2){

    // if card 1 or 2 or both are not set the class flipped is added to the selected card
    selectedCard.classList.add('flipped');
    // || opperator returns the first truthy value, hence if card1 has already been assigned a value it will remain
    // card1 otherwise if card1 is null, selectedCard will be assigned to card1
    card1 = card1 || selectedCard;
    
    // checks if selectedCard is equal to card1, if true then card2 is set to null
    // otherwise card2 is set to selectedCard card
    // if same card is clicked twice in a row, this logic prevents it being assigned both card1 & card2
    card2 = selectedCard === card1 ? null : selectedCard;
  }


  // if card1 and card2 are both assigned i.e. not null
  if(card1 && card2){
    
    noClicking = true;
    let gif1 = card1.className;
    let gif2 = card2.className;

    if(gif1 === gif2){
      cardsFlipped += 2;
      card1.removeEventListener('click',handleCardClick);
      card2.removeEventListener('click',handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else{
      setTimeout(function(){
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        noClicking = false;
      },1000);
    }
  }

  if(cardsFlipped === COLORS.length){
    alert("Game Over");
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
