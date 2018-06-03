let originalEval = null 
const responses = [
  'Huh what’s that. Could you speak English please?',
  'That’s right, no more JavaScript for you.',
  'I’ll give you your scripting powers back if you promise to behave.',
  'Can you do that for me?',
  'Say "I promise"',
]
let currentResponse = -1

module.exports =  {
  before({repl, onComplete}) {
    originalEval = repl.eval
    repl.eval = (cmd, context, filename, callback) => {
      currentResponse++
      if (currentResponse === responses.length) {
        callback(null, 'That doesn’t sound very convincing, sorry...') 
        onComplete()
      }
      callback(null, responses[currentResponse])
    }
  },

  after({repl}) {
    repl.eval = originalEval
  },

  run(answer, {onComplete, repl}) {
  },
}
