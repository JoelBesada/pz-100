const responses = [
  '\nI’m locking you in here with me so you can sit and think about what you’ve done.',
  'This hurts me as much as it hurts you.',
  'Don’t even think about trying to escape.',
]
let currentResponse = 0

module.exports =  {
  responses: [
    'That’s it. I’m going to have to silence you altogether now, since removing your scripting abilities didn’t seem like enough of a lesson.'
  ],
  hints: [],
  before({onComplete, repl}) {
    process.on('SIGTERM', () => {
      console.log('Ouch, that hurt!')
    })
    process.stdin.pause()
    setTimeout(() => {}, 9999999)
    const tick = () => {
      console.log(responses[currentResponse])
      currentResponse++
      if (currentResponse < responses.length) {
        setTimeout(tick, 5000)
      } else {
        onComplete()
      }
    }
    setTimeout(tick, 5000)
  },
  run() {

  }
}
