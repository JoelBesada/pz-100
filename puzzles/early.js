const startYear = new Date().getFullYear()

module.exports =  {
  run(answer, {onComplete}) {
    if (startYear >= new Date(Date.now()).getFullYear()) {
      return 'Whoah slow down a bit, you’re progressing way too fast! Let’s take a little break shall we, why don’t you speak to me again next year or so?'
    }
    onComplete()
    return 'I must commend you for your patience. You’ve waited for a long time!'
  },
}
