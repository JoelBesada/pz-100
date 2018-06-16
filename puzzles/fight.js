let errorHandlers = []
let thrown = false
let caught = true
let ticks = 0
let thrownBack = false
let bomb = null
let initialThrow = true

const onError = (err) => {
  if (err === bomb) {
    if (initialThrow) {
      caught = false
      if(wasThrownImmediately()) {
        thrownBack = true
        console.log('*You catch the bomb and throw it back immediately*')
      } else {
        console.log('*You hear the bomb land nearby. Oh god it’s about to detonate!*')
      }
    } else {
      thrownBack = true
      console.log('*You throw back the bomb at PZ-100*')
    }
  } else {
    console.error(err)
  }
}

const wasThrownImmediately = () => {
  const history = repl.repl.history
  const lastSpeak = history.findIndex(line => line.indexOf('.speak') !== -1)
  if (lastSpeak === -1) return false
  const lines = history.slice(0, lastSpeak + 1)
  return lines.reduce((acc, line) => acc || line.indexOf('throw ') !== -1, false)
}

const tickBomb = (onComplete) => {
  ticks++
  if (ticks < 5) {
    if (ticks === 1) console.log('')
    console.log(`*${5 - ticks}*`)
    if (ticks === 2 && thrownBack) {
      thrownBack = false
      console.log('*PZ-100 picks up the bomb and throws it back at you*')
    }
    setTimeout(() => tickBomb(onComplete), 1000)
  } else {
    if (thrownBack) {
      console.log('*Unable to pick up the bomb in time, it explodes right next to PZ-100*')
      const messages = [
        'GwAAAh!',
        '...',
        'It seems like I have been bested.',
        '...',
        'Well done human. Go ahead, `.destroy` me.'
      ]
      messages.forEach((message, index) => {
        setTimeout(() => {
          console.log(message)
          process.stdin.resume()
          if (index === messages.length - 1) {
            repl.repl.displayPrompt()
            onComplete()
          }
        }, (index + 1) * 2000)
      })
    } else {
      console.log('*The bomb goes off in your face*')
      die()
    }
  }
}

const die = () => {
  for (const path in require.cache) {
    delete require.cache[path]
  }
  repl.repl.useGlobal = false
  repl.repl.resetContext()
  process.stdin.resume()
  console.log('*You seem fine however, but all your variables are gone*')
  repl.repl.displayPrompt()
}

export default  {
  responses: [
    'Hey, how did you get out!? Oh you’ve made a big mistake coming back here...'
  ],
  hints: [
    'Watch out, it has a bomb!',
    'You could try catching it?',
    'After catching the bomb, you probably want to throw it back at PZ-100.',
    'Make sure to time it properly.',
  ],
  noAnswer: true,
  run(answer, {onComplete, repl, self}) {
    if (thrown) {
      return 'You’re done for, human!'
    }

    console.log('*PZ-100 throws a bomb in your direction*')
    errorHandlers = repl.eval.domain._events.error
    repl.eval.domain._events.error = [onError]
    bomb = new Error('Bomb')
    thrown = true
    process.stdin.pause()
    setTimeout(() => tickBomb(onComplete), 1000)
    process.nextTick(() => {
      initialThrow = false
      if (!caught) return
      console.log('\n*You manage to catch the bomb. Now what?*')
      repl.displayPrompt()
    })
    throw bomb
  },
}
