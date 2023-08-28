import {AxiosResponse} from 'axios'
import {$api} from '../http'
import {IAuthResponse, ILogin, ISighnInWithGoogle, ISubmitRegistration} from '../models/IAuth'
import {api} from "./api";

export default class AuthService {
  
  static async restorePassword(email: string) {
    return $api.post(
      'restore_password',
      { email },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async updatePassword(email: string, code: number, password: string) {
    return $api.post(
      'update_password',
      { email, code, password },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }
  static async checkEmail(email:string):Promise<AxiosResponse<{ success: boolean }>>{
    return $api.get(`customers/check-email?email=${email}`)
  }

  static async deleteCustomerAccount() {
    return $api.delete(`customers?token=${localStorage.getItem('token')}`)
  }
}




export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<ISubmitRegistration, Partial<ISubmitRegistration>>({
      query: (initialPost ) => ({
        url: `customers`,
        method: 'POST',
        body: initialPost 
      }),
    }),
    login: builder.mutation<IAuthResponse, Partial<ILogin>>({
      query: (initialPost ) => ({
        url: `login`,
        method: 'POST',
        body: initialPost 
      }),
    }),
    signInWithGoogle: builder.mutation<IAuthResponse, Partial<ISighnInWithGoogle>>({
      query: (initialPost ) => ({
        url: `reg_by_google`,
        method: 'POST',
        body: initialPost 
      }),
    })
  }),
});

// Export hooks for usage in functional components
export const {
useRegistrationMutation,
useLoginMutation,
useSignInWithGoogleMutation
} = authApi;