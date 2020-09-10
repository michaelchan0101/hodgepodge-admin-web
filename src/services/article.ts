import request from '@/utils/request'

export const listArticles = async (page = 1, limit = 20) => {
  const { articles } = await request.get<Article.ListResponse>(
    '/api/admin/v1.0/articles',
    {
      params: { offset: (page - 1) * 20, limit },
    },
  )
  return {
    data: articles,
    success: true,
  }
}

export const createArticle = async (data: Article.CreateRequest) => {
  const article = await request.post<Article.Response>('/api/admin/v1.0/articles', {
    data,
  })
  return article
}

export const getArticle = async (id: number) => {
  const article = await request.get<Article.Response>(`/api/admin/v1.0/articles/${id}`)
  return article
}

export const updateArticle = async (id: number, data: Article.CreateRequest) => {
  const article = await request.patch<Article.Response>(
    `/api/admin/v1.0/articles/${id}`,
    { data },
  )
  return article
}

export const deleteArticle = async (id: number) => {
  return request.delete(`/api/admin/v1.0/articles/${id}`)
}
