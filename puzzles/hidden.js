const hiddenString = '<>>>>>>>>><<<<<<<<<<<>><<<<<>><\n<>><<<<<>><<<<<<<<<<<>><<<<<>><\n<>>>>>>>>><<<>>>>><<<>>>>>>>>><\n<>><<<<<>><<<<<<<<<<<<<<<<<<>><\n<>>>>>>>>><<<<<<<<<<<<<<<<<<>><'

module.exports =  {
  responses: [
    'I’m sorry, that was uncalled for. Hey I found this strange string, can you figure out what it’s asking for?',
    hiddenString,
  ],
  hints: [
    'It almost looks like ASCII art, but the characters used makes it a bit hard to interpret.',
    'Try replacing one of the characters to something else to create more contrast.' 
  ],
  run(answer, {onComplete}) {
    if (answer === 4) {
      onComplete()
      return 'Ah yeah, that makes sense!'
    }
    
    return 'No that doesn’t seem right.'
  },
}
