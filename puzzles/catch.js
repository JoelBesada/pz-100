const onError = (err) => {
  if (err.killProcess) process.exit()
}

let thrown = false

module.exports =  {
  before({repl}) {
    repl.eval.domain.addListener('error', onError)
  },

  after({repl}) {
    repl.eval.domain.removeListener('error', onError)
  },

  run(answer, {onComplete, repl}) {
    if (thrown) {
      onComplete()
      return 'Wow, you’ve got some impressive reflexes there!'
    }

    const error = new Error('Process-killing Ball')
    error.killProcess = true
    console.log('Hey, catch this!')
    thrown = true
    throw error
  },
}
