import apiClient from '@/lib/apiClient'

type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type ApiResponse<T> = {
  meta: {
    code: number;
    message: string;
    status?: string; 
  };
  data?: T; 
};

export const register = async (data: RegisterPayload): Promise<ApiResponse<UserData>> => {
  const res = await apiClient.post<ApiResponse<UserData>>('/register', data, {
    headers: {
      Authorization: '',
    },
  })
  return res.data
}
