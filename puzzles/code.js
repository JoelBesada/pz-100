
const answers = [
  'I’m sorry, but my source code is literally telling me to not let you continue...',
  `Don’t believe me? Check for yourself at the top line of ${__filename}.`,
  'Remember that your progress is saved however, if you want to quit out and do something else.' 
]

let currentAnswer = 0
export default  {
  responses: [
    'You’ve done well so far, but I’m afraid to tell you that my source code is telling me to not let you pass any further in this challenge. There’s nothing I can do, sorry!',
  ],
  hints: [
    'It’s as PZ-100 says, it’s hardcoded within its source code to not let you pass any further',
    `More specifically, look at the constant on the top line in the file ${__filename}. It’s almost as if it was meant to be changed...`

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
