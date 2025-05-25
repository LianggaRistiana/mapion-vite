import apiClient from '@/lib/apiClient'

type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  meta: {
    code: number
    message: string
    token?: string
    'token-expired'?: number
  }
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await apiClient.post<LoginResponse>('/login', data, {
    headers: {
      Authorization: '',
    },
  })
  return res.data
}
