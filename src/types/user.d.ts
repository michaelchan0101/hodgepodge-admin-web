declare namespace ADMIN {
  export interface Response {
    id: number
    username: string
    createdAt: string
    updatedAt: string
  }

  export interface LoginResponse {
    token: string
    admin: Response
  }

  export interface LoginRequest {
    username: string
    password: string
  }
  export interface CreateRequest {
    username: string
    password: string
  }
  export interface UpdatePasswordRequest {
    username: string
    password: string
  }
}
