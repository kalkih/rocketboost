import { THEME_MAP } from '@/utils/constants'

export default {
  computed: {
    theme() {
      return `--theme-${THEME_MAP[this.launch.lsp.abbrev] || 'default'}`
    },
  },
}
