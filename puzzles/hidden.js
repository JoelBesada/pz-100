const hiddenString = '<>>>>>>>>><<<<<<<<<<<>><<<<<>><\n<>><<<<<>><<<<<<<<<<<>><<<<<>><\n<>>>>>>>>><<<>>>>><<<>>>>>>>>><\n<>><<<<<>><<<<<<<<<<<<<<<<<<>><\n<>>>>>>>>><<<<<<<<<<<<<<<<<<>><'

module.exports =  {
  run(answer, {onComplete}) {
    if (answer === undefined) {
      console.log('Can you decode and provide an answer to this message?')
      return hiddenString
    }

    if (answer === 4) {
      onComplete()
      return 'Correct!'
    }
    
    return 'No that’s not correct.'
  },
}
