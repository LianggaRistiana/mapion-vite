import apiClient from '@/lib/apiClient'

type LogoutSuccessResponse = {
  meta: {
    code: number
    message: string
  }
  data: unknown[]
}

type LogoutErrorResponse = {
  code: number
  status: string
  message: string
}

export const logout = async (): Promise<LogoutSuccessResponse> => {
  try {
    const res = await apiClient.post<LogoutSuccessResponse>('/logout')
    return res.data
  } catch (error: any) {
    const errData = error?.response?.data as LogoutErrorResponse
    throw new Error(errData?.message || 'Logout gagal')
  }
}
