import { Indicator } from 'mint-ui'

export default {
  pushLoadStack (state) {
    Indicator.open({
      text: '努力加载',
      spinnerType: 'snake'
    })
    state.stack.push(1)
  },
  completeLoad (state) {
    let stack = state.stack
    stack.pop()
    if (!stack.length) {
      // 延时为了更好显示loading 效果
      setTimeout(() => {
        Indicator.close()
      }, 200)
    }
  }
}
