// https://umijs.org/config/
import { defineConfig } from 'umi'
import defaultSettings from './defaultSettings'
import proxy from './proxy'

const { REACT_APP_ENV } = process.env

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Zn 大杂烩 - 管理后台',
    locale: true,
    siderWidth: 208,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/login',
      layout: false,
      component: './Login',
    },
    {
      name: 'admin',
      icon: 'UserOutlined',
      path: '/admin',
      component: './Admin/index',
    },
    {
      name: 'category',
      icon: 'BarsOutlined',
      path: '/category',
      component: './Category',
    },
    {
      exact: true,
      path: '/article/create',
      component: './Article/create',
    },
    {
      exact: true,
      path: '/article/:id(\\d+)',
      component: './Article/edit',
    },
    {
      name: 'article',
      icon: 'CodeOutlined',
      path: '/article',
      component: './Article',
    },
    {
      path: '/',
      redirect: '/category',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
})
