const startYear = new Date().getFullYear()

const responses = [
  'You’ve done very well so far! Well, I’m out of ideas now. Let’s just sit here and enjoy each other’s company for a while.'
]
export default  {
  responses,
  hints: [
    'Just sitting around here sure is boring. Is there something else you could do?',
    'It’s always a good idea to check what other ways of interaction with PZ-100 are available, other than speaking to it.'
  ],
  before({self, onComplete}) {
    const punch = () => {
      onComplete()
      return 'Ouch, what did you do that for?! :('
    }
    self.punch = () => punch()
  },
  noAnswer: true,
  run(answer, {onComplete}) {
    return responses[0]
  },
}
