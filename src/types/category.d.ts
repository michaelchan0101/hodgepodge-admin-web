declare namespace Category {
  export interface Response {
    id: number
    name: string
    isShowInMenu: boolean
    sort: number
    createdAt: string
    updatedAt: string
  }

  export interface ListResponse {
    categories: Response[]
  }

  export interface CreateRequest {
    name?: string
    isShowInMenu?: boolean
    sort?: number
  }
}
