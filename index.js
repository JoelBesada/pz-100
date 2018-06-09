const fs = require('fs')
const path = require('path')
const animals = require('./assets/animals.json')

const levels = [
  require('./puzzles/backwards'),
  require('./puzzles/continue'),
  require('./puzzles/rps'),
  require('./puzzles/animal'),
  require('./puzzles/mindcontrol'),
  require('./puzzles/number'),
  require('./puzzles/catch'),
  require('./puzzles/hidden'),
  require('./puzzles/code'),
  require('./puzzles/early'),
  require('./puzzles/punch'),
  require('./puzzles/silence'),
  require('./puzzles/punchagain'),
  require('./puzzles/caged'),
  require('./puzzles/fight'),
]

const encodeSave = level => 
  animals[level * 7].split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) + i * 30 + 200)).join('')

const decodeSave = level => {
  const index = animals.indexOf(level.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) - i * 30 - 200)).join(''))
  if (index === -1) return 1
  return index / 7
}
  

const save = (level) => {
  const data = encodeSave(level)
  fs.writeFileSync(path.relative(__dirname, 'progress.sav'), data, 'utf-8')
}

const load = (level) => {
  try {
    return decodeSave(fs.readFileSync(path.relative(__dirname, 'progress.sav'), 'utf-8'))
  } catch (e) {
    return 1
  }
}

const _userName = process.env.USER || 'stranger'
const userName = `${_userName[0].toUpperCase()}${_userName.slice(1)}`

const clearProperties = (self) => {
  Object.keys(self).forEach(key => {
    if (key === 'speak') return
    delete self[key]
  })
}
 
const setupCommands = () => {
  repl.repl.defineCommand('hint', {
    help: 'Show a hint',
    action() {
      const level = levels[currentLevel - 1]
      const hint = level.hints[currentHint]
      console.log(`Hint ${currentHint + 1}/${level.hints.length}: ${hint}`)
      currentHint = (currentHint + 1) % level.hints.length
      this.clearBufferedCommand()
      this.displayPrompt()
    }
  })
  repl.repl.defineCommand('hitYourself', {
    help: 'Why would you do that?',
    action() {
      console.log('*You punch yourself in the face. Ouch!*')
      this.clearBufferedCommand()
      this.displayPrompt()
    }
  })
}

const start = () => {
  if (typeof repl === 'undefined') {
    console.log('Please import this module directly from a Node REPL, e.g. \nrun `node` in your terminal and type `const puzzle = require(\'a-small-puzzle\')`')
    process.exit()
  } else {
    setupCommands()
    console.log(`
Hello there ${userName}! I’m PZ-100, an advanced artificial 
intelligence built to evaluate human prospects through a set 
of puzzling challenges. Whenever you feel ready, speak to me 
by calling my \`speak()\` method.

If you ever get stuck you can use the terminal command \`.hint\` 
to receive a small hint. And don’t worry, if you need to go do 
something else you can always come back later, your progress is 
automatically saved.`)
  }
}

const rollCredits = () => {
  console.log(`
*You lay down, completely exhausted from the fight. You feel lucky to have made it out alive. You can’t help to wonder however what the point of all of this was...*

###################################################

  THE END

  This experience(?) was built and designed by
  Joel Besada, who would love it if you followed 
  him on Twitter: https://twitter.com/JoelBesada.

###################################################

`)
}

start()

let currentLevel = load()
let currentResponse = 0
let currentHint = 0

const _speak = (self, answer) => {
  const level = levels[currentLevel - 1]
  const readAllResponses = currentResponse === level.responses.length

  const opts = {
    self,
    repl: repl.repl,
    require,
    onComplete() {
      level.after && level.after(opts)
      currentLevel++
      clearProperties(self)
      if (currentLevel > levels.length) {
        rollCredits()
        delete self.speak
        return 
      }
      currentResponse = 0
      currentHint = 0
      save(currentLevel)
    }
  }

  if (!readAllResponses) {
    const response = level.responses[currentResponse]
    currentResponse++
    if (currentResponse === level.responses.length) {
      level.before && level.before(opts)
    }
    return response
  }

  if (answer === undefined && !level.noAnswer) {
    return level.responses[currentResponse - 1]
  }

  return level.run.call(self, answer, opts)
}

module.exports = {
  speak(answer) {
    return _speak(this, answer)
  }
}