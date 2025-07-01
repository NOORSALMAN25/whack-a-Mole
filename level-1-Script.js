// Global variables
const playButton = document.querySelector('.play')
const replayButton = document.querySelector('.replay')

const hole = document.querySelector('.holes')
const score = document.querySelector('.score h3')
const targetScore = 10
gameActive = false

// functions

const playTheGame = () => {
  gameActive = true
}

const moleAppearing = () => {
  hole.style.backgroundColor = 'pink'
}

const scoreCalculator = () => {}

// testing
hole.addEventListener('click', () => {
  moleAppearing()
})
