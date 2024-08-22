import { Outlet } from 'react-router-dom'
import { Button } from 'antd-mobile'

const Layout = () => {
  return (
    <div>
      <Outlet />
      Layout
      <Button color="primary">主题色配置</Button>
    </div>
  )
}

export default Layout