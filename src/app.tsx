import React from 'react'
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout'
import { history } from 'umi'
import { local } from 'webstorage-utils'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import defaultSettings from '../config/defaultSettings'

export async function getInitialState(): Promise<{
  admin?: ADMIN.Response
  settings?: LayoutSettings
}> {
  // 如果是登录页面，不执行
  let admin
  if (history.location.pathname !== '/login') {
    admin = local.get('admin')
    if (!admin) {
      history.push('/login')
    }
  }
  return {
    admin,
    settings: defaultSettings,
  }
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings }
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  }
}
