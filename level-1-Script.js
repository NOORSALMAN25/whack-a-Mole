// --------------- Cached elements references ---------------
const playButton = document.querySelector('.play')
const replayButton = document.querySelector('.replay')

const hole = document.querySelector('.holes')
const score = document.querySelector('.score h3')

const timer = document.querySelector('.timer h3')

// --------------- Global variables ---------------
const targetScore = 10
let target = false
let currentScore = 0
let gameActive = false
let isChange = false
let startTimer = false
let moleInterval = null
let timerTimeouts = []

// --------------- time count ---------------
const timeCount = () => {
  if (startTimer) {
    timerTimeouts.forEach((timeout) => clearTimeout(timeout))
    timerTimeouts = []

    for (let i = 20; i >= 0; i--) {
      const timeout = setTimeout(() => {
        if (startTimer) {
          if (i === 0) {
            timer.innerText = "⌛ Time's Up!"
            endGame()
          } else {
            timer.innerText = `⌛ ${i}`
          }
        }
      }, (20 - i) * 1000)
      timerTimeouts.push(timeout)
    }
  }
}

// --------------- functions ---------------

const endGame = () => {
  gameActive = false
  startTimer = false
  target = false

  if (moleInterval) {
    clearInterval(moleInterval)
    moleInterval = null
  }

  timerTimeouts.forEach((timeout) => clearTimeout(timeout))
  timerTimeouts = []

  hole.style.backgroundColor = ''
  isChange = false

  if (currentScore >= targetScore) {
    timer.innerText = '🎉 You Won!'
  }
}

const playTheGame = () => {
  gameActive = true
  startTimer = true
  score.innerText = `⭐ SCORE : ${currentScore}`
  timer.innerText = `⌛ 20`
  timeCount()
  moleAppearing()
}

const moleAppearing = () => {
  if (moleInterval) {
    clearInterval(moleInterval)
  }

  moleInterval = setInterval(() => {
    if (gameActive && startTimer) {
      if (!isChange) {
        hole.style.backgroundColor = 'pink'
        isChange = true
        setTimeout(() => {
          if (gameActive) {
            hole.style.backgroundColor = ''
            isChange = false
          }
        }, 1000) // 1 second
      }
    } else {
      clearInterval(moleInterval)
      moleInterval = null
    }
  }, 3000)
}

const scoreCalculator = () => {
  currentScore += 2
  score.innerText = `⭐ SCORE : ${currentScore}`
  if (currentScore >= 10) {
    timer.innerText = '🎉 Target Reached!'
    endGame()
  }
}

const replayFunction = () => {
  currentScore = 0
  target = false
  gameActive = false
  isChange = false
  startTimer = false

  if (moleInterval) {
    clearInterval(moleInterval)
    moleInterval = null
  }
  timerTimeouts.forEach((timeout) => clearTimeout(timeout))
  timerTimeouts = []

  score.innerText = `⭐ SCORE : 0`
  timer.innerText = `⌛ Ready!`
  hole.style.backgroundColor = ''

  console.log('Game replay')
}

//--------------- Event Listeners Here ---------------

playButton.addEventListener('click', () => {
  if (!gameActive) {
    playTheGame()
  }
})

replayButton.addEventListener('click', () => {
  replayFunction()
})

hole.addEventListener('click', () => {
  if (isChange && gameActive) {
    scoreCalculator()
  }
})
