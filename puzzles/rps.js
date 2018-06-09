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
  responses: [
    'How about a simple game of rock, paper, scissors? Speak to me with your choice, let’s see if you can beat me five times in a row.'
  ],
  hints: [
    'While it’s not completely implausible to win five times in a row with blind guesses, you should consider ways to read your opponent for more consistent results.',
    'PZ-100 constantly changes, and sometimes leaves properties and methods available other than `speak()`.'
  ],
  before({self}) {
    wins = 0
    resetMind(self)
  },

  run(answer, { onComplete, self }) {
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
      wins = 0
      resetMind(self)
      return res
    }
    if (draw) {
      const res = `${self.mind.getThought()}! That’s a draw. Or actually, I’m going to count that as a win for me. House rules!`
      wins = 0
      resetMind(self)
      return res
    }
  },
}