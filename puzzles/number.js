const animals = require('../assets/animals.json') 

let tries = 0
let min = 0
let max = 32
module.exports =  {
  before({self}) {
    self.mind = '**Protected by a tinfoil hat**'
  },

  run(answer, {onComplete, self}) {
    if (answer === undefined) {
      return 'I’m thinking of an integer between 0 and 32. Can you guess what it is? I’ll tell you if you’re over or under with each guess, but you’ll only get 5 tries before I change to a new number.'
    }
    if (!Number.isInteger(answer)) {
      return 'That’s not even an integer...'
    }
    tries++
    
    if (min === max) {
      return `Number ${max} is correct! And you got it on your last available guess, that was a close call!`
    }

    if (tries === 5) {
      min = 0
      max = 32
      tries = 0
      return 'That’s incorrect, and you’re out of tries! I’m thinking of a new number now.'
    }

    if (answer < min) {
      return `I've already told you the number is greater than ${min}...` 
    }
    if (answer > max) {
      return `I've already told you the number is less than ${max}...` 
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