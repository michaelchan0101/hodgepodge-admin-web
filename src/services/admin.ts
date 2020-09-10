import request from '@/utils/request'

export const login = async (data: ADMIN.LoginRequest) =>
  request.post<ADMIN.LoginResponse>('/api/admin/v1.0/login', { data })

export const createAdmin = async (data: ADMIN.CreateRequest) =>
  request.post<ADMIN.Response>('/api/admin/v1.0/admins', { data })

export const updateAdminPassword = async (
  id: number,
  data: ADMIN.UpdatePasswordRequest,
) => request.patch<ADMIN.Response>(`/api/admin/v1.0/admins/${id}/password`, { data })

export const listAdmins = async () => {
  const { admins } = await request.get<ADMIN.ListResponse>('/api/admin/v1.0/admins')
  return {
    data: admins,
    total: admins.length,
    success: true,
  }
}

export const deleteAdmin = async (id: number) =>
  request.delete<ADMIN.Response>(`/api/admin/v1.0/admins/${id}`)
