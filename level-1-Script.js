// Cached elements references
const playButton = document.querySelector('.play')
const replayButton = document.querySelector('.replay')

const hole = document.querySelector('.holes')
const score = document.querySelector('.score h3')

const timer = document.querySelector('.timer h3')

// Global variables
const targetScore = 10
let target = false
let currentScore = 0
let gameActive = false
let isChange = false
let startTimer = false

//time count
const timeCount = () => {
  if ((startTimer = true)) {
    for (let i = 20; i >= 0; i--) {
      setTimeout(() => {
        timer.innerText = i === 0 || target ? ' ⌛ Done!' : `⌛ ${i} `
      }, (20 - i) * 1000)
    }
  }
}

// functions

const endGame = () => {}

const playTheGame = (Event) => {
  if ((gameActive = true) && (startTimer = true)) {
    score.innerText = `⭐ SCORE : ${currentScore}`
    timer.innerText = `⌛`
    timeCount()
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
  }, 3000)
}

const scoreCalculator = () => {
  currentScore += 2
  score.innerText = `⭐ SCORE : ${currentScore}`
  if (currentScore >= 10) {
    target = true
    startTimer = false
    gameActive = false
  }
}

const replayFunction = () => {}

// Event Listeners Here

playButton.addEventListener('click', () => {
  playTheGame()
})

replayButton.addEventListener('click', () => {
  console.log('replay')
})
