const onError = (err) => {
  if (err.killProcess) process.exit()
}

let thrown = false

module.exports =  {
  responses: [],
  hints: [
    'You should try catch that. Pun intended.'
  ],
  
  after({repl}) {
    repl.eval.domain.removeListener('error', onError)
  },
  
  noAnswer: true,
  run(answer, {onComplete, repl}) {
    if (thrown) {
      onComplete()
      return 'Wow, you’ve got some impressive reflexes there!'
    }
    repl.eval.domain.addListener('error', onError)
    const error = new Error('Process-killing Ball')
    error.killProcess = true
    console.log('Well aren’t you clever... Think fast!')
    thrown = true
    throw error
  },
}
