import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import DailyBill from './components/DailyBill'
import {useState, useMemo} from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import {useSelector} from 'react-redux'
import _ from 'lodash'

const Month = () => {
  // 日期组件显隐
  const [dateVisible, setDateVisible] = useState(false)
  // 显示日期
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })
  // 日期组件确认
  const onDateConfirm = (date) => {
    let formatDate = dayjs(date).format('YYYY-MM')
    setCurrentDate(formatDate)
    setDateVisible(false)
  }
  // 按月分组的数据
  const billList = useSelector(state => state.bill.billList)
  // useMemo是react中的固定hook，类似于vue中的computed
  const monthGroup = useMemo(() => {
    // return出去计算后的值
    return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  console.log('monthGroup', monthGroup)

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backIcon={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentDate}月账单
            </span>
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onCancel={() => setDateVisible(false)}
            onClose={() => setDateVisible(false)}
            onConfirm={onDateConfirm}
          />
        </div>
        {/* 单日列表统计 */}
        <DailyBill />
      </div>
    </div >
  )
}

export default Month
