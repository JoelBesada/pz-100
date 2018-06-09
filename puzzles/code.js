
const answers = [
  'I’m sorry, but my source code is literally telling me to not let you continue...',
  'No can do, sorry. Remember that your progress is saved however and you can always come back at a later time.' 
]

let currentAnswer = 0
module.exports =  {
  responses: [
    'You’ve done well so far, but I’m afraid to tell you that my source code is telling me to not let you pass any further in this challenge. There’s nothing I can do, sorry!',
  ],
  hints: [
    'It is as PZ-100 says, its hardcoded within its source code to not let you pass any further',
    `More specifically, look at the constant on the top line in the file ${__dirname}/${__filename}. It’s almost as if it was meant to be changed...`

  ],
  noAnswer: true,
  run(answer, {onComplete}) {
    if (typeof LET_HUMAN_PASS === 'undefined' || LET_HUMAN_PASS !== true) {
      const response = answers[currentAnswer]
      currentAnswer = Math.min(answers.length - 1, currentAnswer + 1)
      return response 
    }
    onComplete()
    return 'I guess I’m allowed to let you pass now, a new patch to my source code must have been issued recently.'  
  },
}
