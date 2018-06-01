const animals = require('../assets/animals.json') 

const _getThought = () => animals[Math.floor(Math.random() * animals.length)] 
const resetMind = (self) => {
  self.mind = {
    getThought: _getThought
  }
}

module.exports =  {
  before(self) {
    resetMind(self)
  },

  run(answer, {onComplete, self}) {
    if (!answer) {
      return '<Guess an animal>'
    }
    if (!self.mind || !self.mind.getThought || typeof self.mind.getThought !== 'function') {
      resetMind(self)
      return 'Wait you caught me off guard! Let’s try again.'
    }
    let thought = self.mind.getThought()
    // Just in case they happened to guess right
    if (self.mind.getThought === _getThought) {
      while (thought === answer) thought = self.mind.getThought()
    }
    
    const an = /^[aeiou]/.test(thought)
    if (answer === thought) {
      onComplete()
      return `Yes, I was thinking of ${an ? 'an' : 'a'} ${thought}! Wait, that doesn’t seem right... Oh well, you pass this test, but I’ll be wearing this tinfoil hat from now on.`
    }

    return `Nope, I was thinking of ${an ? 'an' : 'a'} ${thought}.`
  },
}