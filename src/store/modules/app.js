import { LANG, TAGS_VIEW } from '@/constant/index'
import { setItem, getItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),

  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },

    setLanguage(state, value) {
      setItem(LANG, value)
      state.language = value
    },

    addTagsViewList(state, value) {
      //找重复，重复返回 true
      const isFind = state.tagsViewList.find((item) => {
        return item.path === value.path
      })
      //处理重复，不重复的加入列表
      if (!isFind) {
        state.tagsViewList.push(value)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },

    //国际化，替换 tagsViewList 里的值
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },

    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, value) {
      if (value.type === 'index') {
        state.tagsViewList.splice(value.index, 1)
        return
      } else if (value.type === 'other') {
        // 删自己右边
        state.tagsViewList.splice(
          value.index + 1,
          state.tagsViewList.length - value.index + 1
        )
        //删自己左边
        state.tagsViewList.splice(0, value.index)
      } else if (value.type === 'right') {
        state.tagsViewList.splice(
          value.index + 1,
          state.tagsViewList.length - value.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
