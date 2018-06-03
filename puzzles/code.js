
const responses = [
  'You’ve done well so far, but I’m afraid to tell you that my source code is telling me to not let you pass any further in this challenge. There’s nothing I can do, sorry!',
  'I’m sorry, but my source code is literally telling me to not let you continue...',
  'No can do, sorry. Remember that your progress is saved however and you can always come back at a later time.' 
]

let currentResponse = 0
module.exports =  {
  run(answer, {onComplete}) {
    if (typeof LET_PLAYER_PASS === 'undefined' || LET_PLAYER_PASS !== true) {
      const response = answers[currentResponse]
      currentAnswer = Math.max(answers.length - 1, currentAnswer + 1)
      return response 
    }
    onComplete()
    return 'I guess I’m allowed to let you pass now, a new patch to my source code must have been issued recently.'  
  },
}
