import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import DailyBill from './components/DailyBill'
import {useState, useMemo, useEffect} from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import {useSelector} from 'react-redux'
import _ from 'lodash'

const Month = () => {
  /****************************数据**********************/
  // 日期组件显隐
  const [dateVisible, setDateVisible] = useState(false)

  // 显示日期
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })

  // 按月分组的数据
  const billList = useSelector(state => state.bill.billList)
  // useMemo是react中的固定hook，类似于vue中的computed
  const monthGroup = useMemo(() => {
    // return出去计算后的值
    return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  console.log('monthGroup', monthGroup)

  // 当前月的数据
  const [currentMonthList, setCurrentMonthList] = useState([])
  // 当前月的统计数据
  const monthResult = useMemo(() => {
    const pay = currentMonthList
    .filter(item => item.type === 'pay')
    .reduce((prev, curr) => prev + curr.money, 0)
    const income = currentMonthList
    .filter(item => item.type === 'income')
    .reduce((prev, curr) => prev + curr.money, 0)

    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentMonthList])

  // 当前月按照日分组的数据
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupData)
      // return出去计算后的值
      return {
      groupData,
      keys
      }
  }, [currentMonthList])
  console.log('dayGroup', dayGroup)

  /****************************方法**********************/
  // 日期组件确认
  const onDateConfirm = (date) => {
    let formatDate = dayjs(date).format('YYYY-MM')
    setCurrentMonthList(monthGroup[formatDate] || [])
    setCurrentDate(formatDate)
    setDateVisible(false)
  }
  /****************************hook**********************/
  // 初始化时把当前月的统计数据显示出来
  useEffect(() => {
    const nowDate = dayjs().format('YYYY-MM')
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate])
    }
  }, [monthGroup])


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
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
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
        {dayGroup.keys.map(key => {
          return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />
        })}
        
      </div>
    </div >
  )
}

export default Month
