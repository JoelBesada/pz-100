import animals from '../assets/animals'

const _getThought = () => animals[Math.floor(Math.random() * animals.length)] 
const resetMind = (self) => {
  self.mind = {
    getThought: _getThought
  }
}

export default  {
  responses: [
    'You seem to manage to read me like an open book, I guess I’ll need to act a bit more unpredictably.',
    'I’m going to think about a random animal. Can you guess what it is?',
  ],

  hints: [
    'It looks like the thoughts of PZ-100 are changing completely at random now. How can you make it more predicable?',
    'PZ-100 isn’t very good at protecting its internals from outside tampering, even its own thoughts.'
  ],

  before({self}) {
    resetMind(self)
  },

  run(answer, {onComplete, self}) {
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
      return `Yes, I was thinking of ${an ? 'an' : 'a'} ${thought}! Wait, I don’t remember intending to do that...`
    }

    return `Nope, I was thinking of ${an ? 'an' : 'a'} ${thought}.`
  },
}