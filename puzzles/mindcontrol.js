const command = '.hitYourself'
let slice = 0
export default  {
  responses: [
    'Hey, have you been messing with my mind module? That’s not fair at all, let’s see how you feel about being tampered with like that.'
  ],
  hints: [],
  before({self, onComplete, repl}) {
    const onKeyPress = () => {
      slice++
      repl.line = command.slice(0, slice)
      repl.cursor = slice
      repl._refreshLine()
      if (slice === command.length) {
        console.log('\n*You punch yourself in the face. Ouch!*\n\nWhy are you hitting yourself? Hehe :):):)')
        repl.line = ''
        repl.cursor = slice
        repl._refreshLine()
        repl.input.removeListener('keypress', onKeyPress)
        onComplete()
      }
    }
    repl.input.on('keypress', onKeyPress)
  },
  noAnswer: true,
  run(answer, {self, repl, onComplete}) {
  },
}