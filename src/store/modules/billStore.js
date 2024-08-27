import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: []
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    }
  }
})

// 解构actionCreater函数
const {setBillList} = billStore.actions
// 编写异步action
const getBillList = () => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.get('http://localhost:8888/ka')
    console.log('账单数据响应', res)
    // 触发同步reducer
    dispatch(setBillList(res.data))
  }
}

export {getBillList}
// 导出reducer
const reducer = billStore.reducer
export default reducer