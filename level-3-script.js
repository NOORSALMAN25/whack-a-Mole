// --------------- Cached elements references ---------------
const playButton = document.querySelector('.play')
const replayButton = document.querySelector('.replay')
const hole = document.querySelectorAll('.holes')
const score = document.querySelector('.score h3')
const timer = document.querySelector('.timer h3')

// --------------- Global variables ---------------
const targetScore = 35
let target = false
let currentScore = 0
let gameActive = false
let activeMoles = new Set()
let isChange = false
let startTimer = false
let moleInterval = null
let timerTimeouts = []
const colors = ['pink', 'red', '#945034']
let activeColors = []

// --------------- time count ---------------
const timeCount = () => {
  if (startTimer) {
    timerTimeouts.forEach((timeout) => clearTimeout(timeout))
    timerTimeouts = []

    for (let i = 40; i >= 0; i--) {
      const timeout = setTimeout(() => {
        if (startTimer) {
          if (i === 0) {
            timer.innerText = "⌛ Time's Up!"
            endGame()
          } else {
            timer.innerText = `⌛ ${i}`
          }
        }
      }, (40 - i) * 1000)
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
  activeColors.clear()

  if (currentScore >= targetScore) {
    timer.innerText = '🎉 You Won!'
  }

  playButton.disabled = true
}

const playTheGame = () => {
  gameActive = true
  startTimer = true
  score.innerText = `⭐ SCORE : ${currentScore}`
  timer.innerText = `⌛`
  timeCount()
  moleAppearing()
}

const randomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
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
        const randomC = randomColor()
        selectedHole.style.backgroundColor = randomC // here should random appear pink and red
        activeMoles.add(randomHole)
        activeColors[randomHole] = randomC

        setTimeout(() => {
          if (gameActive) {
            selectedHole.style.backgroundColor = ''
            activeMoles.delete(randomHole)
            activeColors[randomHole] = null
          }
        }, 1000)
      }
    } else {
      clearInterval(moleInterval)
      moleInterval = null
    }
  }, 1000)
}

// Reference , like : https://www.w3schools.com/js/js_timing.asp , https://www.programiz.com/javascript/setInterval

const scoreCalculator = (index) => {
  const moleColor = activeColors[index]
  if (moleColor === 'red') {
    currentScore -= 5
  } else if (moleColor === 'pink') {
    currentScore += 2
  } else if (moleColor === '#945034') {
    currentScore += 4
  }

  if (currentScore < 0) {
    currentScore = 0
  }
  score.innerText = `⭐ SCORE : ${currentScore}`
  if (currentScore >= 35) {
    timer.innerText = '🎉 You Won!'
    endGame()
  }
  activeColors[index] = null
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
  activeColors.clear()

  playButton.disabled = false
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
      scoreCalculator(index)
      holeEl.style.backgroundColor = ''
      activeMoles.delete(index)
      activeColors.delete(index)
    }
  })
})
