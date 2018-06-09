const startYear = new Date().getFullYear()

const responses = [
  'Okay, where were we. Right, enjoying each other’s company!'
]
module.exports =  {
  responses,
  hints: [
    'Haven’t you already been in this situation?',
    'It’s always a good idea to check what other ways of interaction with PZ-100 are available, other than speaking to it.'
  ],
  before({self, onComplete}) {
    const punchAgain = () => {
      onComplete()
      return 'Ouch, really, AGAIN?!!'
    }
    self.punchAgain = () => punchAgain()
  },
  noAnswer: true,
  run(answer, {onComplete}) {
    return responses[0]
  },
}
