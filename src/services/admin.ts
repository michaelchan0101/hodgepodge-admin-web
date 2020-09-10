import request from '@/utils/request'

export const login = async (data: ADMIN.LoginRequest) =>
  request.post<ADMIN.LoginResponse>('/api/admin/v1.0/login', { data })

export const createAdmin = async (data: ADMIN.CreateRequest) =>
  request.post<ADMIN.Response>('/api/admin/v1.0/admins', { data })

export const updateAdminPassword = async (
  id: number,
  data: ADMIN.UpdatePasswordRequest,
) => request.post<ADMIN.Response>(`/api/admin/v1.0/admins/${id}/password`, { data })
