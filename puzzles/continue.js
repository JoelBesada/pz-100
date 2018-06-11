export default  {
  responses: [
    'Okay let’s continue.'
  ],
  hints: [
    'PZ-100 seems to be missing its `continue` method, but maybe it’s somewhere nearby.',
    'Everyone makes a typo from time to time, even the PZ-100 developers',
  ],
  before({self, onComplete, repl}) {
    const _continue = () => {
      onComplete()
      return 'Just a typo, huh. I swear, my developers are getting more sloppy for each passing day.'
    }
    const fn = () => _continue()
    self.contineu = fn

    const poll = () => {
      if (self.continue === fn) {
        repl.clearBufferedCommand()
        console.log('\nAh, you fixed it!')
        repl.displayPrompt()
      } else {
        setTimeout(poll, 25)
      }
    }
    poll()
  },
  noAnswer: true,
  run(answer, {self, repl, onComplete}) {
    let res
    try {
      res = this.continue()
    } catch (err) {
      console.error(err)
      return '... Or not. What happened to my `continue` method?'
    }

    return res
  },
}