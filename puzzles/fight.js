let over = false
let disarmLogged = false
const createWeapon = ({onComplete, self, require, repl}) => {
  const _stab = ({initiator = 'player'} = {}) => {
    over = true
    if (initiator === 'player') {
      if (self.knife === createdWeapon) {
        console.log('\n*You assist PZ-100 in stabbing yourself with the knife. You quickly realise your mistake as you fall to the ground.*')
        die({repl, require})
      } else {
        if (!disarmLogged) console.log('*You manage to disarm the knife from PZ-100.*')
        console.log('*You use the disarmed knife and stab PZ-100 right where it hurts in its `__proto__` property.*\n\n*The damaged PZ-100 starts throwing errors left and right. You just barely manage to escape behind cover before it finally bursts in a fierce explosion of TypeErrors.*')
        onComplete()
      }
    } else {
      console.log('\n*PZ-100 stabs you right in the chest. Your vision slowly fades as you fall to the ground.*')
      die({repl, require})
    }
  }

  return {
    stab(...args) {
      _stab(...args)
    }
  }
}

const die = ({repl, require}) => {
  for (const path in require.cache) {
    delete require.cache[path]
  }
  repl.useGlobal = false
  repl.resetContext()
  console.log('\n*Moments later you wake up, as if it had all just been a fever dream. All your variables have been inexplicably undeclared, however.*')
  repl.displayPrompt()
}

let createdWeapon
export default  {
  responses: [
    'Hey, how did you get out!? Oh you’ve made a big mistake coming back here...'
  ],
  hints: [
    'Oh god, who gave that thing a knife!?',
    'You better disarm that thing before it stabs you.',
    'Not only do you need to disarm it, you also need to find a way to fight back!',
    'How about using that knife on PZ-100 itself?'
  ],
  before({onComplete, repl, require, self}) {
    createdWeapon = createWeapon({onComplete, self, require, repl})
    self.knife = createdWeapon
    const poll = () => {
      if (over) return 
      if (!(self.knife && self.knife.stab)) {
        disarmLogged = true
        console.log('\n*You manage to disarm the knife from PZ-100. Perhaps you can use it yourself...*')
      } else {
        setTimeout(poll, 25)
      }
    }
    poll()
    setTimeout(() => {
      if (over) return 
      console.log('\n*PZ-100 starts approaching you with a knife*')
      repl.displayPrompt()
      setTimeout(() => {
        if (over) return 
        if (self.knife && self.knife.stab) {
          self.knife.stab({initiator: 'robot'})
        } else {
          console.log('\n*PZ-100 tries to stab you, but it realizes that it no longer has its knife equipped*')
          repl.displayPrompt()
          setTimeout(() => {
            if (over) return
            console.log('\n*With no knife available, PZ-100 goes for the second best option and punches you straight on the jaw, quickly knocking you out.* ') 
            die({repl, require})
          }, 5000)
        }
      }, 5000)
    })
  },
}
