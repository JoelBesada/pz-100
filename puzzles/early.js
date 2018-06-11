const startYear = new Date().getFullYear()

export default  {
  responses: [],
  hints: [
    'You could just sit and wait here for the next year, but maybe you have ways of time travelling?',
    'PZ-100 likes to use the global `Date.now` function to check the time.'
  ],
  noAnswer: true,
  run(answer, {onComplete}) {
    if (startYear >= new Date(Date.now()).getFullYear()) {
      const nextYear = new Date(Date.now()).getFullYear() + 1
      return `Whoah slow down a bit, you’re progressing way too fast! Let’s take a little break shall we, why don’t you speak to me again in the year ${nextYear}, or later?`
    }
    onComplete()
    return 'I must commend you for your patience. You’ve waited for a long time!'
  },
}
