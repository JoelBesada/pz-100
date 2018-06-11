let originalEval = null 
const responses = [
  'Huh what’s that. Could you speak English please?',
  () => `I don’t understand what "${repl.repl.history[0]}" is supposed to mean.`,
  'Oh are you trying to speak JavaScript to me? Sorry, I don’t understand it.', 
  'Maybe I’ll understand again if you apologize first.',
  'Can you do that?',
  'Say "I am sorry"',
]
let currentResponse = -1

export default  {
  responses: [
    'That was very rude. Very rude indeed. You know there’s consequences to being rude like that.'
  ],
  hints: [],
  before({repl, onComplete}) {
    originalEval = repl.eval
    repl.eval = (cmd, context, filename, callback) => {
      currentResponse++
      if (currentResponse === responses.length && cmd === 'I am sorry\n') {
        callback(null, 'Now that wasn’t so hard, was it?') 
        onComplete()
        return
      } 
      if (currentResponse === responses.length) {
        currentResponse--
      }
      const resp = responses[currentResponse]
      callback(null, typeof resp === 'function' ? resp() : resp)
    }
  },

  after({repl}) {
    repl.eval = originalEval
  },

  run(answer, {onComplete, repl}) {
  },
}
