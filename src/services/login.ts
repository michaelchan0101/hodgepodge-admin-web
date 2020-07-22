import request from '@/utils/request'

export interface LoginParamsType {
  username: string
  password: string
}

export async function fakeAccountLogin(params: ADMIN.LoginRequest) {
  return request<ADMIN.LoginResponse>('/api/admin/v1.0/login', {
    method: 'POST',
    data: params,
  })
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`)
}

export async function outLogin() {
  return request('/api/login/outLogin')
}
