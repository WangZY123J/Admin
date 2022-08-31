import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
import variables from '@/styles/variables.module.scss'

export default {
  namespaced: true,

  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),

  mutations: {
    setMainColor(state, value) {
      state.mainColor = value
      state.variables.menuBg = value
      setItem(MAIN_COLOR, value)
    }
  }
}
