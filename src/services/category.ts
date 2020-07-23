import request from '@/utils/request'

export async function listCategories() {
  const { categories } = await request<Category.ListResponse>(
    '/api/admin/v1.0/categories',
    { method: 'GET' },
  )
  return {
    data: categories,
    total: categories.length,
    success: true,
  }
}

export async function createCategory(data: Category.CreateRequest) {
  return request<Category.Response>('/api/admin/v1.0/categories', {
    method: 'POST',
    data,
  })
}

export async function updateCategory(id: number, data: Category.CreateRequest) {
  return request<Category.Response>(`/api/admin/v1.0/categories/${id}`, {
    method: 'PATCH',
    data,
  })
}
