declare namespace Article {
  export interface Response {
    id: number
    categoryId: number
    title: string
    content?: string
    originalContent: string
    category?: CategoryResponse
    createdAt: string
    updatedAt: string
  }
  export interface CreateRequest {
    categoryId: number
    title: string
    content: string
  }

  export interface ListRequest {
    categoryId?: number
  }

  export interface ListResponse {
    articles: Array<Response>
    limit: number
    offset: number
  }
}
