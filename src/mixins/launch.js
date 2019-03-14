import { STATUS_MAP } from '../utils/constants.js'

export default {
  computed: {
    probability () {
      return this.launch.probability === -1 ? 0 : this.launch.probability
    },
    status () {
      return STATUS_MAP[this.launch.status] || 0
    },
  },
}
