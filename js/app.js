
// DECLARE CONSTANTS
const overlay = document.getElementById('overlay'); //start screen
const qwerty = document.getElementById('qwerty'); //keyboard section
const phrase = document.getElementById('phrase'); //phrase section
const phraseUL = phrase.querySelector('ul'); // ul to hold li
const startButton = document.querySelector('.btn__reset'); //start button
const tries = document.getElementsByClassName('tries');
const phrases = [ //create array of phrases
  'life before death',
  'strength before weakness',
  'journey before destination',
  'there is always another secret',
  'every man is a hero of his own story'
]
let missed = 0; //number of incorrect guesses
let letterFound = null; // null is default value for letter found by checkLetter

// HIDE OVERLAY TO BEGIN OR RESET GAME ON CLICK OF START BUTTON
startButton.addEventListener('click', (e) => { // listen for clicks on start button
  missed = 0; // reset missed counter
  for (i = 0; i < tries.length; i += 1) { // loop through hearts
    tries[i].firstChild.src = 'images/liveHeart.png'; // replenish hearts
  }
  const buttons = qwerty.getElementsByTagName('button'); // retrieve all buttons
  for (i = 0; i < buttons.length; i += 1) { // loop through all buttons
    buttons[i].className = ''; // remove .show
    buttons[i].disabled = false; // remove disabled state
  }
  overlay.style.display = 'none'; // hide overlay
  phraseUL.innerHTML = ''; // remove previous phrase
  addPhraseToDisplay(getRandomPhraseAsArray(phrases)); //add new phrase
});

// SEARCH THROUGH AN ARRAY FOR ITEM, RETURN TRUE OR FALSE
function contains(src, test) {
  return src.indexOf(test) !== -1;
}

// INPUT AN ARRAY AND RETURN A STRING OF A RANDOM PHRASE FROM THAT ARRAY
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)]; // store random item from phrases
  const randomPhraseArray = randomPhrase.split(''); // turn that phrase into an array of individual letters
  return randomPhraseArray; // return array of letters
}

// ITERATE THROUGH PHRASE LETTERS, AND DISPLAY THEM ON DOM
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let letter = arr[i]; // one letter at a time
    const li = document.createElement('li'); // li to hold letter
    li.textContent = letter; // li content is now the letter
    // if the letter is a space, it is formatted as one
    // if it is a letter, it is classed as .letter
    if (letter === ' ') {
      li.className = '';
      li.style.width = '15px';
    } else {
      li.className = 'letter';
    }
    // append li to phrase ul
    phraseUL.appendChild(li);
  }
}

// IF PRESSED LETTER IS IN PHRASE, SHOW THAT LETTER
function checkLetter(keyPress) {
  const lettersObject = document.getElementsByClassName('letter'); //object of letters in phrase
  const lettersArray = Array.from(lettersObject); //more specific object of letters
  const singleLetters = lettersArray.map(a => a.textContent); //array of only letters
  for (let i = 0; i < singleLetters.length; i += 1) { // loops through all letters in phrase
    if (singleLetters[i] === keyPress) { // if pressed letter is on page,
      lettersArray[i].classList.add('show'); // add class '.show'
      letterFound = singleLetters[i]; // change letterFound to letter
    } else if (contains(singleLetters, keyPress) === false) { // if pressed letter is NOT on page,
      letterFound = null; // change letterFound to letter
    }
  }
  return letterFound; // return value of letterFound (found letter or null)
}

// WHAT HAPPENS WHEN LETTER IS CHOSEN ON SCREEN TO BE GUESSED
qwerty.addEventListener('click', (e) => { // listen for click
  if (e.target.tagName === 'BUTTON') { // only button presses work
    const button = e.target; // e.target = the pressed button
    const keyPress = button.textContent; //keyPress is the letter inside the button element
    button.className = 'chosen'; // add .chosen to button to display it has been used
    button.disabled = true; // disable button so it cannt be used again
    checkLetter(keyPress); // check if letter is in phrase
    if (letterFound === null) { // letter not in phrase?
      missed += 1; // update missed count
      tries[tries.length - missed].firstChild.src = 'images/lostHeart.png'; // lose a heart
    }
    checkWin(); // check if game is over
  }
});

// WHAT HAPPENS WHEN LETTER IS PRESSED ON KEYBOARD TO BE GUESSED
document.addEventListener('keydown', (e) => { // listen for keypress
  const keyCode = e.keyCode; // store keycode
  const key = e.key.toString(); // store key value and make it a string
  const buttonsObject = qwerty.getElementsByTagName('button'); // retrieve the buttons on qwerty
  const buttonsArray = Array.from(buttonsObject); // make it into an array
  const keyboardButtonsArray = buttonsArray.map(a => a.textContent) // make an array of JUST the letters
  if (keyCode >= 65 && keyCode <= 90) { // if the key pressed is a letter
    for (i = 0; i < keyboardButtonsArray.length; i += 1) { // loop through all letters on keyboard
      if (contains(keyboardButtonsArray[i], key)) { // if the pressed key is on the keyboard,
        buttonsArray[i].className = 'chosen'; // add chosen class
        buttonsArray[i].disabled = true; // disable
      }
    }
    checkLetter(key); // check if letter is in phrase
    if (letterFound === null) { // if letter is not in phrase
      missed += 1; // update missed count
      tries[tries.length - missed].firstChild.src = 'images/lostHeart.png'; // lose a heart
    }
    checkWin(); // check for end of game
  }
});

// CHECK IF GAME IS OVER BY NUMBER OF CORRECT GUESSES VS NUMBER OF MISSES
function checkWin() {
  const shown = document.getElementsByClassName('show'); // all correctly guessed letters
  const letters = document.getElementsByClassName('letter'); // all correct letters
  function winOrLose(winlose, message) { // function to change overlay depending on win or lose
    overlay.className = winlose; // change overlay to new version
    overlay.querySelector('h2').textContent = message; // change overlay text to new version
    startButton.textContent = 'Reset'; // change text of start button
    overlay.style.display = 'flex'; // display new overlay
  }
  if (shown.length === letters.length) { // if all correct letters have been guessed,
    winOrLose('win', 'CONGRATULATIONS!!! YOU WON!!!');
  } else if (missed === 5) { // if game is not won, but all 5 misses are used
    winOrLose('lose', 'YOU LOSE. BUMMER. TRY AGAIN?');
  }
}
