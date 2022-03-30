export default {
  namespaced: true,
  state: () => {
    return {
      list: []
    }
  },
  mutations: {
    // 加入购物车
    insertCart (state, payload) {
      // 考虑两种情况：
      //  情况1：已经添加过的商品(skuid已存在)，是数量的累加
      //  情况2：没有添加过的就添加到列表前
      const index = state.list.findIndex(item => item.skuId === payload.skuId)
      if (index >= 0) {
        state.list[index].count += payload.count
      } else {
        state.list.unshift(payload)
      }
    }
  },
  actions: {
    insertCart (store, goods) {
      return new Promise((resolve, reject) => {
        if (store.rootState.user.token) {
          // 已登录 TODO

        } else {
          // 未登录
          store.commit('insertCart', goods)
          resolve()
        }
      })
    }
  }
}
