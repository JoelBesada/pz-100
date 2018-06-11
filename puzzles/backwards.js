
export default  {
  responses: [
    's’teL ees fi ev’uoy neeb gniyap yna noitnetta os .raf tahW si ym ?eman kaepS ot em niaga htiw ruoy rewsna sa eht tsrif ...tnemugra yeH yhw era lla ym sdrow gnimoc tuo ?sdrawkcab'
  ],
  hints: [
    'Looks like PZ-100 is communicating a little... backwards?'
  ],
  run(answer, {onComplete}) {
    const ans = answer && answer.toUpperCase ? answer.toUpperCase() : answer
    if (ans === 'PZ-100') {
      onComplete()
      return 'Good, you remember! Sorry about that, my speach module was acting up a bit, but it seems to be working again.'
    }

    return 'Nope, that’s not it.'
  },
}