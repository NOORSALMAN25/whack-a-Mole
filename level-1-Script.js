// Cached elements references
const playButton = document.querySelector('.play')
const replayButton = document.querySelector('.replay')

const hole = document.querySelector('.holes')
const score = document.querySelector('.score h3')

// Global variables
const targetScore = 10
let currentScore = 0
let gameActive = false
let isChange = false

// functions

const playTheGame = () => {
  if ((gameActive = true)) {
    score.innerText = `SCORE : ${currentScore}`
    moleAppearing()
    hole.addEventListener('click', () => {
      if (isChange) {
        scoreCalculator()
      }
    })
  }
}

const moleAppearing = () => {
  setInterval(() => {
    if (gameActive === true) {
      if (!isChange) {
        hole.style.backgroundColor = 'pink'
        isChange = true
        setTimeout(() => {
          hole.style.backgroundColor = ''
          isChange = false
        }, 1000) // 1 second
      }
    }
  }, 4000)
}

const scoreCalculator = () => {
  currentScore += 2
  score.innerText = `SCORE : ${currentScore}`
  if (currentScore >= 10) {
    gameActive = false
  }
}

// Event Listeners Here

playButton.addEventListener('click', () => {
  playTheGame()
})
