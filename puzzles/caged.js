const responses = [
  'I’m locking you inside this cage so you can think about what you’ve done.',
  'This hurts me as much as it hurts you',
  'Don’t even think about trying to escape',
]
let currentResponse = 0

module.exports =  {
  before({onComplete, repl}) {
    console.log('I’m going to have to silence you altogether, this is for your own good.')
    process.on('SIGTERM', () => {
      console.log('Ouch, that hurt!')
    })
    process.stdin.pause()
    setTimeout(() => {}, 9999999)
    setInterval(() => {
      if (currentResponse === responses.length) return
      console.log(responses[currentResponse])
      currentResponse++
    }, 5000)
  },
}
