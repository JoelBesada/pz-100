import fs from 'fs'
import path from 'path'
import animals from './assets/animals'

import levelBackwards from './puzzles/backwards'
import levelContinue from './puzzles/continue'
import levelRPS from './puzzles/rps'
import levelAnimal from './puzzles/animal'
import levelMindControl from './puzzles/mindcontrol'
import levelNumber from './puzzles/number'
import levelCatch from './puzzles/catch'
import levelHidden from './puzzles/hidden'
import levelCode from './puzzles/code'
import levelEarly from './puzzles/early'
import levelPunch from './puzzles/punch'
import levelSilence from './puzzles/silence'
import levelPunchAgain from './puzzles/punchagain'
import levelCaged from './puzzles/caged'
import levelFight from './puzzles/fight'

const levels = [
  levelBackwards,
  levelContinue,
  levelRPS,
  levelAnimal,
  levelMindControl,
  levelNumber,
  levelCatch,
  levelHidden,
  levelCode,
  levelEarly,
  levelPunch,
  levelSilence,
  levelPunchAgain,
  levelCaged,
  levelFight,
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
  fs.writeFileSync(path.join(__dirname, 'progress.sav'), data, 'utf-8')
}

const load = (level) => {
  try {
    return decodeSave(fs.readFileSync(path.join(__dirname, 'progress.sav'), 'utf-8'))
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
      const readAllResponses = currentResponse === level.responses.length
      if (!readAllResponses) {
        console.log(`No hints currently available, speak to PZ-100 first.`)
      } else {
        console.log(`Hint ${currentHint + 1}/${level.hints.length}: ${hint}`)
        currentHint = (currentHint + 1) % level.hints.length
      }
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
    console.log('Please import this module directly from a Node REPL, e.g. \nrun `node` in your terminal and type `const puzzle = require(\'pz-100\')`')
    process.exit()
  } else {
    setupCommands()
    if (currentLevel === levels.length) {
      console.log('Hey, how did you get out!? Oh you’ve made a big mistake coming back here...')
    } else {
    console.log(`
Hello there ${userName}! I’m PZ-100, an NPM module built to evaluate 
human prospects through a set of puzzling challenges. Whenever you 
feel ready, speak to me by calling my \`speak()\` method.

If you ever get stuck you can use the terminal command \`.hint\` 
to receive a small hint. And don’t worry, if you need to go do 
something else you can always come back later, your progress is 
automatically saved.`)
    }
  }
}

const rollCredits = () => {
  console.log(`
####################################################

  You have destroyed PZ-100. Well done!

  This experience was designed and built by
  Joel Besada, who would love it if you followed 
  him on Twitter: https://twitter.com/JoelBesada.

####################################################
`)
  process.exit()
}


let currentLevel = load()
let currentResponse = 0
let currentHint = 0
start()

const _speak = (self, answer) => {
  const level = levels[currentLevel - 1]
  if (!level) return 'Just `.destroy` me already.'
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
        const _destroy = () => rollCredits()
        self.destroy = () => _destroy()
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

const exp = {}
Object.defineProperty(exp, 'speak', {
  value(answer) {
    return _speak(this, answer)
  },
  writable: false,
  enumerable: true,
})

module.exports = exp