const RPS = ['Rock', 'Paper', 'Scissors']
const pickRPS = () => RPS[Math.floor(Math.random() * RPS.length)]
const losesTo = {
  'rock': 'paper',
  'paper': 'scissors',
  'scissors': 'rock'
}

let wins = 0
const resetMind = (self) => {
  const thought = pickRPS()
  self.mind = {
    getThought() { return thought }
  }
}

const format = (answer) => answer && answer.toLowerCase ? answer.toLowerCase() : null
module.exports =  {
  before(self) {
    wins = 0
    resetMind(self)
  },

  after(self) {
    delete self.mind
  },

  run(answer, { onComplete, self }) {
    if (!answer) {
      return 'Let’s see if you can beat me in a game of Rock, Paper, Scissors five times in a row. Just call me with your choice whenever you are ready, no countdown needed!'
    }

    if (!self.mind || !self.mind.getThought || typeof self.mind.getThought !== 'function') {
      resetMind(self)
      return 'Wait you caught me off guard! Let’s try again.'
    }

    const nonsenseThought = losesTo[format(self.mind.getThought())] === undefined
    const nonsenseAnswer = losesTo[format(answer)] === undefined
    const win = losesTo[format(self.mind.getThought())] === format(answer)
    const loss = losesTo[format(answer)] === format(self.mind.getThought())
    const draw = !win && !loss

    let response = null
    if (nonsenseThought) {
      const res = `${self.mind.getThought()}! Oh sorry, not sure how that slipped into my mind. Let’s try again.`
      resetMind(self)
      return res
    }
    if (nonsenseAnswer) {
      wins = 0
      const res = `${self.mind.getThought()}! Uh, you are not taking this seriously are you? Well that’s a loss for you.`
      resetMind(self)
      return res
    }
    if (win && wins === 4) {
      const res =  `${self.mind.getThought()}! Wow you beat me five times in a row, that’s impressive!`
      onComplete()
      return res
    }
    if (win) {
      wins += 1
      const res = `${self.mind.getThought()}! You got me this time, let’s keep going.`
      resetMind(self)
      return res
    }
    if (loss) {
      const res = `${self.mind.getThought()}! Oh, looks like you lost...`
      resetMind(self)
      return res
    }
    if (draw) {
      const res = `${self.mind.getThought()}! That’s a draw.`
      resetMind(self)
      return res
    }
  },
}