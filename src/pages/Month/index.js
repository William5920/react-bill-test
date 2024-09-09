import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import DailyBill from './components/DailyBill'
import {useState} from 'react'
import classNames from 'classnames'

const Month = () => {
  // 日期组件显隐
  const [dateVisible, setDateVisible] = useState(false)

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
              2023 | 3月账单
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
            onConfirm={() => setDateVisible(false)}
          />
        </div>
        {/* 单日列表统计 */}
        <DailyBill />
      </div>
    </div >
  )
}

export default Month
