import animals from '../assets/animals'

let tries = 0
let min = 0
let max = 32
export default  {
  responses: [
    'Well now you know how that feels.',
    'No more mind tampering, I’ve restricted your access. Let’s see how well you can read my intentions now.',
    'I’m going to think of an integer between 0 and 32. You get five tries to guess what it is, and I’ll let you know if you’re over or under on each guess.',
  ],
  hints: [
    'Perhaps there’s a way to reduce the number of possible integers to only be one after your five tries.',
    'An integer between 0 and 32, and you only get five tries. Maybe it’s not a complete coincidence that 32 can only be halved five times before becoming less than one.',
    'Have you tried guessing in the middle?'
  ],

  before({self}) {
    self.mind = '__Protected__'
  },

  run(answer, {onComplete, self}) {
    if (!Number.isInteger(answer)) {
      return 'That’s not even an integer...'
    }
    tries++
    
    if (min === max) {
      onComplete()
      return `Number ${max} is correct! And you got it on your last available guess, that was a close call!`
    }

    if (tries === 5) {
      const thoughtOf = min + Math.round(Math.random() * (max - min))
      min = 0
      max = 32
      tries = 0
      return `That’s incorrect, and you’re out of tries! I was thinking of the number ${thoughtOf} by the way. Well, let’s start over with a new one.`
    }

    if (answer < min) {
      return `I’ve already told you the number is greater than ${min - 1}...` 
    }
    if (answer > max) {
      return `I’ve already told you the number is less than ${max + 1}...` 
    }
    
    const mid = min + (max - min) / 2
    let dir = answer >= mid ? -1 : 1

    if (Math.floor(mid) === answer || Math.ceil(mid) === answer) {
      dir = Math.random() >= 0.5 ? 1 : -1
    }

    if (dir === 1) {
      min = answer + 1
    } else {
      max = answer - 1
    }

    return `Nope, you’re ${dir === 1 ? 'under' : 'over'} the number I’m thinking of.`
  },
}