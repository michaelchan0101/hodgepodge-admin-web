import React from 'react'
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout'
import { history } from 'umi'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import { queryCurrent } from './services/user'
import defaultSettings from '../config/defaultSettings'

export async function getInitialState(): Promise<{
  currentUser?: ADMIN.Response
  settings?: LayoutSettings
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    try {
      const currentUser = await queryCurrent()
      return {
        currentUser,
        settings: defaultSettings,
      }
    } catch (error) {
      history.push('/user/login')
    }
  }
  return {
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
