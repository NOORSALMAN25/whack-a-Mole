// Cached elements references
const playButton = document.querySelector('.play')
const replayButton = document.querySelector('.replay')

const hole = document.querySelector('.holes')
const score = document.querySelector('.score h3')

// Global variables
const targetScore = 10
let gameActive = false
let isChange = false

// functions

const playTheGame = () => {
  gameActive = true
  moleAppearing()
}

const moleAppearing = () => {
  setInterval(() => {
    if (!isChange) {
      hole.style.backgroundColor = 'pink'
      isChange = true
      setTimeout(() => {
        hole.style.backgroundColor = ''
        isChange = false
      }, 2000) // 2 seconds
    }
  }, 4000)
}

const scoreCalculator = () => {}

// testing
