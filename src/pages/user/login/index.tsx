import { message } from 'antd'
import React, { useState } from 'react'
import { Link, SelectLang } from 'umi'
import { local } from 'webstorage-utils'
import { getPageQuery } from '@/utils/utils'
import logo from '@/assets/logo.svg'
import { LoginParamsType, fakeAccountLogin } from '@/services/login'
import Footer from '@/components/Footer'
import LoginFrom from './components/Login'
import styles from './style.less'

const { Username, Password, Submit } = LoginFrom

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  const urlParams = new URL(window.location.href)
  const params = getPageQuery()
  let { redirect } = params as { redirect: string }
  if (redirect) {
    const redirectUrlParams = new URL(redirect)
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length)
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1)
      }
    } else {
      window.location.href = '/'
      return
    }
  }
  window.location.href = redirect || '/'
}

const Login: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true)
    const { token, admin } = await fakeAccountLogin({ ...values })
    local.set('token', token).set('admin', admin)
    message.success('登录成功！')
    replaceGoto()
    setSubmitting(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>大杂烩管理后台</span>
            </Link>
          </div>
          <div className={styles.desc}>什么都搞</div>
        </div>

        <div className={styles.main}>
          <LoginFrom onSubmit={handleSubmit}>
            <Username
              name="username"
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <Submit loading={submitting}>登录</Submit>
          </LoginFrom>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
