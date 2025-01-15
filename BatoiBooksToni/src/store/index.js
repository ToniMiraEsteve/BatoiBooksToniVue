import { reactive } from 'vue'

export const store = {
  debug: true,
  state: reactive({
    messages: []
  }),
  setMessageAction(newValue) {
    if (this.debug) console.log('setMessageAction triggered with ', newValue)
    this.state.messages.push(newValue)
  },
  clearMessageAction(index) {
    if (this.debug) console.log('clearMessageAction triggered with ', index)
    this.state.messages.splice(index, 1)
  }
}
