// --------------- Cached elements references ---------------
const playButton = document.querySelector('.play')
const replayButton = document.querySelector('.replay')

const hole = document.querySelectorAll('.holes')
const score = document.querySelector('.score h3')

const timer = document.querySelector('.timer h3')

// --------------- Global variables ---------------
const targetScore = 10
let target = false
let currentScore = 0
let gameActive = false
let activeMoles = new Set()
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
// References , like : https://www.w3schools.com/js/js_timing.asp , https://www.programiz.com/javascript/setInterval

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

  hole.forEach((holeee) => {
    holeee.style.backgroundColor = ''
  })
  activeMoles.clear()

  if (currentScore >= targetScore) {
    timer.innerText = '🎉 You Won!'
  }
  playButton.disabled = true
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
      const randomHole = Math.floor(Math.random() * hole.length)
      const selectedHole = hole[randomHole]
      if (!activeMoles.has(randomHole)) {
        selectedHole.style.backgroundColor = 'pink'
        activeMoles.add(randomHole)
        setTimeout(() => {
          if (gameActive) {
            selectedHole.style.backgroundColor = ''
            activeMoles.delete(randomHole)
          }
        }, 1000)
      }
    } else {
      clearInterval(moleInterval)
      moleInterval = null
    }
  }, 2000)

  // Reference , like : https://www.w3schools.com/js/js_timing.asp , https://www.programiz.com/javascript/setInterval

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
    hole.forEach((holee) => {
      holee.style.backgroundColor = ''
    })
    activeMoles.clear()
    playButton.disabled = false
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

  hole.forEach((holeEl, index) => {
    holeEl.addEventListener('click', () => {
      if (activeMoles.has(index) && gameActive) {
        scoreCalculator()

        holeElement.style.backgroundColor = ''
        activeMoles.delete(index)
      }
    })
  })
}
