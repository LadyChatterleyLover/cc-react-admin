import { menuData } from '../../config'
import CcMenus from '../menus'
import { useSelector } from 'react-redux'

const NavSider = () => {
  const sideTheme = useSelector((state: any) => state.base.sideTheme)
  const navMode = useSelector((state: any) => state.base.navMode)

  return (
    <CcMenus
      data={menuData}
      theme={sideTheme}
      mode={navMode === 'top' ? 'horizontal' : 'inline'}
    ></CcMenus>
  )
}

export default NavSider
