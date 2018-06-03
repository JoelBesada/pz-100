const fs = require('fs')
const path = require('path')
const animals = require('./assets/animals.json')

const levels = [
  require('./puzzles/backwards'),
  require('./puzzles/rps'),
  require('./puzzles/animal'),
  require('./puzzles/number'),
  require('./puzzles/hidden'),
  require('./puzzles/code'),
  require('./puzzles/early'),
  require('./puzzles/catch'),
  require('./puzzles/silence'),
  require('./puzzles/caged'),
]

const encodeSave = level => 
  animals[level * 17].split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) + i * 30 + 200)).join('')

const decodeSave = level => {
  const index = animals.indexOf(level.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) - i * 30 - 200)).join(''))
  if (index === -1) return 1
  return index / 17
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

const initLevel = (self, num) => {
  const level = levels[num - 1]
  if (!level) return
  const levelAttr = `level${num}`
  const opts = {
    self,
    repl: repl.repl,
    onComplete() {
      level.after && level.after(opts)
      delete self[levelAttr]
      save(num + 1)
      initLevel(self, num + 1)
    }
  }
  level.before && level.before(opts)
  self[levelAttr] = function(answer) { return levels[num - 1].run(answer, opts) }
}

const _userName = process.env.USER || 'Stranger'
const userName = `${_userName[0].toUpperCase()}${_userName.slice(1)}`

const start = () => {
  if (typeof repl === 'undefined') {
    console.log('Please import this module directly from a Node REPL, e.g. \nrun `node` in your terminal and type `const puzzle = require(\'a-small-puzzle\')`')
    process.exit()
  } else {
    console.log(`Hello there ${userName}!`)
    console.log('To get started, call the start() function of this module.')
  }
}

start()

module.exports = {
  start() {
    console.log('Puzzle initializing...')
    delete this.start
    const level = 10 || load()
    initLevel(this, level)
    console.log('Initialized!')
    return 'Go ahead and start with level1()'
  }
}