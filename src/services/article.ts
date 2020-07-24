import request from '@/utils/request'

export async function listArticles(page = 1, limit = 20) {
  const { articles } = await request<Article.ListResponse>('/api/admin/v1.0/articles', {
    method: 'GET',
    params: { offset: (page - 1) * 20, limit },
  })
  return {
    data: articles,
    success: true,
  }
}
