// List of animals and their corresponding images and sounds
const animals = [
  { name: 'Cat', img: 'images/cat.jpg', sound: 'sounds/cat.mp3' },
  { name: 'Dog', img: 'images/dog.jpg', sound: 'sounds/dog.mp3' },
  { name: 'Elephant', img: 'images/elephant.jpg', sound: 'sounds/elephant.mp3' },
  { name: 'Lion', img: 'images/lion.jpg', sound: 'sounds/lion.mp3' },
  { name: 'Tiger', img: 'images/tiger.jpg', sound: 'sounds/tiger.mp3' },
  { name: 'Monkey', img: 'images/monkey.jpg', sound: 'sounds/monkey.mp3' },
  { name: 'Horse', img: 'images/horse.jpg', sound: 'sounds/horse.mp3' },
  { name: 'Bear', img: 'images/bear.jpg', sound: 'sounds/bear.mp3' },
  { name: 'Kangaroo', img: 'images/kangaroo.jpg', sound: 'sounds/kangaroo.mp3' },
  { name: 'Penguin', img: 'images/penguin.jpg', sound: 'sounds/penguin.mp3' }
];

let currentQuestionIndex = 0;
let currentAnimal = animals[currentQuestionIndex];
let letterButtons = [];

// Access audio elements for letter sounds
const letterSounds = {
  'A': new Audio('sounds/a.mp3'),
  'B': new Audio('sounds/b.mp3'),
  'C': new Audio('sounds/c.mp3'),
  'D': new Audio('sounds/d.mp3'),
  'E': new Audio('sounds/e.mp3'),
  'F': new Audio('sounds/f.mp3'),
  'G': new Audio('sounds/g.mp3'),
  'H': new Audio('sounds/h.mp3'),
  'I': new Audio('sounds/i.mp3'),
  'J': new Audio('sounds/j.mp3'),
  'K': new Audio('sounds/k.mp3'),
  'L': new Audio('sounds/l.mp3'),
  'M': new Audio('sounds/m.mp3'),
  'N': new Audio('sounds/n.mp3'),
  'O': new Audio('sounds/o.mp3'),
  'P': new Audio('sounds/p.mp3'),
  'Q': new Audio('sounds/q.mp3'),
  'R': new Audio('sounds/r.mp3'),
  'S': new Audio('sounds/s.mp3'),
  'T': new Audio('sounds/t.mp3'),
  'U': new Audio('sounds/u.mp3'),
  'V': new Audio('sounds/v.mp3'),
  'W': new Audio('sounds/w.mp3'),
  'X': new Audio('sounds/x.mp3'),
  'Y': new Audio('sounds/y.mp3'),
  'Z': new Audio('sounds/z.mp3')
};

function loadQuestion() {
  currentAnimal = animals[currentQuestionIndex];

  const imageElement = document.getElementById('image-to-match');
  imageElement.src = currentAnimal.img;

  const word = currentAnimal.name;

  const wordsContainer = document.getElementById('words-container');
  wordsContainer.innerHTML = '';

  letterButtons = [];

  word.split('').forEach((letter, index, arr) => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.classList.add('letter-button');

    button.onclick = () => {
      playLetterSound(letter);

      if (index === arr.length - 1) {
        const letterAudio = letterSounds[letter.toUpperCase()];
        letterAudio.onended = () => {
          playAnimalSound(currentAnimal.sound);
          letterAudio.onended = null;
        };
      }
    };

    wordsContainer.appendChild(button);
    letterButtons.push(button);
  });

  // Manage visibility of Prev and Next buttons
  document.getElementById('prev-question').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
  document.getElementById('next-question').style.display = currentQuestionIndex === animals.length -1 ? 'none' : 'inline-block';

  // Clear feedback if you have it
  const feedback = document.getElementById('feedback');
  if (feedback) feedback.textContent = '';
}

function playLetterSound(letter) {
  const sound = letterSounds[letter.toUpperCase()];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function playAnimalSound(src) {
  const animalAudio = new Audio(src);
  animalAudio.play();
}

function nextQuestion() {
  if (currentQuestionIndex < animals.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
});
