import request from '@/utils/request'

export async function login(params: ADMIN.LoginRequest) {
  return request<ADMIN.LoginResponse>('/api/admin/v1.0/login', {
    method: 'POST',
    data: params,
  })
}

export async function outLogin() {
  return request('/api/login/outLogin')
}
