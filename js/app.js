
// DECLARE CONSTANTS
const overlay = document.getElementById('overlay'); //start screen
const qwerty = document.getElementById('qwerty'); //keyboard section
const phrase = document.getElementById('phrase'); //phrase section
const phraseUL = phrase.querySelector('ul'); // ul to hold li
const startButton = document.querySelector('.btn__reset'); //start button
const phrases = [ //create array of phrases
  'life before death',
  'strength before weakness',
  'journey before destination',
  'there is always another secret',
  'every man is a hero of his own story'
]
let missed = 0; //number of incorrect guesses
let letterFound = null; // null is default value for letter found by checkLetter

// HIDE OVERLAY TO BEGIN GAME ON CLICK OF START BUTTON
startButton.addEventListener('click', (e) => {
  overlay.style.display = 'none';
});

function contains(src, test) {
  return src.indexOf(test) !== -1;
}

// INPUT AN ARRAY AND RETURN A STRING OF A RANDOM PHRASE FROM THAT ARRAY
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  const randomPhraseArray = randomPhrase.split('');
  return randomPhraseArray;
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
  const lettersObject = document.getElementsByClassName('letter');
  const lettersArray = Array.from(lettersObject);
  const singleLetters = lettersArray.map(a => a.textContent);
  for (let i = 0; i < singleLetters.length; i += 1) {
    if (singleLetters[i] === keyPress) {
      lettersArray[i].classList.add('show');
      letterFound = singleLetters[i];
    } else if (contains(singleLetters, keyPress) === false) {
      letterFound = null;
    }
  }
  return letterFound;
}

addPhraseToDisplay(getRandomPhraseAsArray(phrases));
