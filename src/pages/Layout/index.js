import { Outlet } from 'react-router-dom'
import { Button } from 'antd-mobile'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { getBillList } from '@/store/modules/billStore'

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])

  return (
    <div>
      <Outlet />
      Layout
      <Button color="primary">主题色配置</Button>
    </div>
  )
}

export default Layout