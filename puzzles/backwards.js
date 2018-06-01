
module.exports =  {
  run(answer, {onComplete}) {
    if (answer === 'pineapple') {
      onComplete()
      return 'Correct!'
    } else if (answer) {
      return 'That is not a correct answer. Try again!'
    } else {
      return ',thgirlA rof siht tsrif level I lliw tsuj og daeha dna evig uoy eht rewsna thgiarts .daeha tI si ."elppaenip" llaC siht noitcnuf niaga htiw eht rewsna ot ...eunitnoc tiaW yhw era lla ym sdrow gnimoc tuo ?sdrawkcab'
    }
  },
}