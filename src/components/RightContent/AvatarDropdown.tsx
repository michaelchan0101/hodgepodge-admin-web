import React, { useCallback } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, Spin } from 'antd'
import { history, useModel } from 'umi'
import { getPageQuery } from '@/utils/utils'
import { local } from 'webstorage-utils'

import { stringify } from 'querystring'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'

export interface GlobalHeaderRightProps {
  menu?: boolean
}

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  const { redirect } = getPageQuery()
  local.del('token').del('admin')
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    window.location.href = `/user/login?search=${stringify({
      redirect: window.location.href,
    })}`
  }
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState')

  const onMenuClick = useCallback((event: any) => {
    const { key } = event
    if (key === 'logout') {
      setInitialState({ settings: initialState?.settings })
      loginOut()
      return
    }
    history.push(`/account/${key}`)
  }, [])

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  )

  if (!initialState) {
    return loading
  }

  const { admin } = initialState

  if (!admin) {
    return loading
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <span className={`${styles.name} anticon`}>{admin.username}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
